import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { GetExercises, getNestedData, dataReq } from "./Functions";
import { ColorLegend } from './ColorLegend';

export default function CirclePacking(props) {
    const svgRef = useRef();
    const width = 500;
    const height = 500;
    const popularityNorm = 4;   // Somewhat arbitrary popularity normalizer
    const [sortingScheme, setSortingScheme] = useState([]);
    const [exerciseData, setExerciseData] = useState(getNestedData(dataReq, sortingScheme));

    // Redraw chart when svgRef or exerciseData changes
    useEffect(() => {
        if (svgRef.current) {
            drawChart(d3.select(svgRef.current));
        }
    }, [svgRef, exerciseData]);

    // Update the data displayed in CP chart when a muscle or sorting button is clicked
    useEffect(() => {
        props.selectedMuscles.length
            ? setExerciseData(getNestedData([...new Set(props.selectedMuscles.flatMap(GetExercises))], sortingScheme))
            : setExerciseData(getNestedData(dataReq, sortingScheme));
    }, [props.selectedMuscles, sortingScheme]);

   // Update id of leafs if they have been selected and give selected leafs a border outline
    useEffect(() => {
       d3.selectAll("#leaf")
        .attr("id", function() {
            let exerciseId = d3.select(this).attr("className");
            if (props.selectedExercises.includes(exerciseId)) {
                return "selectedleaf";
            }
            return "leaf";
        });
       d3.selectAll("#selectedleaf")
        .attr("id", function() {
            let exerciseId = d3.select(this).attr("className");
            if (!props.selectedExercises.includes(exerciseId)) {
                d3.select(this).attr("stroke", "none");
                return "leaf";
            }
            return "selectedleaf";
        });
        d3.selectAll("#selectedleaf").attr("stroke", "#000");
    }, [props.selectedExercises, exerciseData]);

    // Draw legend only on first render
    useEffect(() => {
        legendSetup();
    }, []);

    // Necessary "preprocessing" of data to be able to use it in CP chart
    function pack(data) {
        return (
            d3.pack()
            .size([width, height])
            .padding(3)
        (d3.hierarchy(data)
            .sum(d => d.hasOwnProperty("popularity") ? d.popularity + popularityNorm : 0)
            .sort((a,b) => b.value - a.value))
        )
    }

  /*
        Draw a Circle Packing chart. Core functionality copied from:
            https://observablehq.com/@d3/zoomable-circle-packing
  */
    function drawChart() {
        removePrevious();
        const root = pack(exerciseData)
        let focus = root;
        let view;

        const svg = d3.select(svgRef.current)
            .style("background", d3.interpolateOranges(0.1))
            .append("svg")
                .attr("id", "circlePackContainer")
                .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
                .attr("class", "absolute h-[100%]")
                .style("display", "block")
                .style("margin", "0 -14px")
                .style("cursor", "pointer");

        d3.select("#outerSvg")
            .on("click", function(event) {
                if (focus === root) { return; }
                (zoom(event, focus.parent), event.stopPropagation());
                }
            )

        const node = nodeSetup();
        const label = labelSetup();
        const toolTip = createTooltip();
        buttonSetup(); 
        zoomTo([root.x, root.y, root.r * 2]);

        function zoomTo(v) {
            const k = width / v[2];       
            view = v;   
            label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
            node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
            node.attr("r", d => d.r * k);
        }

        function zoom(event, d) {
            // Only allow a depth change of 1
            if (Math.abs(d.depth - focus.depth) !== 1) { return; }
            focus = d;

            // Turn on node pointer events if they are the children of current focus
            d3.selectAll("#node")
                .attr("pointer-events", function(d) {
                    if (d.parent === focus) { return null; }
                    return "none";
                })

            // Turn on leaf pointer-events if they are next in line
            d3.selectAll("#leaf")
                .attr("pointer-events", function(d) {
                    if (root.height === focus.depth + 1 && d.parent === focus) { return null; } 
                    return "none";
                })
            d3.selectAll("#selectedleaf")
                .attr("pointer-events", function(d) {
                    if (root.height === focus.depth + 1 && d.parent === focus) { return null; } 
                    return "none";
                })

            // Switch cursor of background to pointer when zoomed in
            d3.select("#outerSvg")
                .style("cursor", function() {
                    if (focus === root) { return "default"; }
                    return "pointer";
                })

            const transition = svg.transition()
                .duration(event.altKey ? 7500 : 750)
                .tween("zoom", d => {
                const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
                return t => zoomTo(i(t));
                });

            label
                .filter(function(d) { 
                    return d.parent === focus || this.style.display === "inline"; })
                .transition(transition)
                  .style("fill-opacity", d => d.parent === focus ? d.descendants().length > 1 ? 1 : 0 : 0)
                  .on("start", function(d) { 
                    if (d.parent === focus) this.style.display = "inline"; })
                  .on("end", function(d) { 
                    if (d.parent !== focus) this.style.display = "none"; });
        }

        function labelSetup() {
            return(
                svg.append("g")
                .style("font", "18px montserrat")
                .style("font-weight", "700")
                .attr("pointer-events", "none")
                .attr("text-anchor", "middle")
            .selectAll("text")
            .data(root.descendants())
            .join("text")
                .style("fill-opacity", d => d.parent === root ? d.descendants().length > 1 ? 1 : 0 : 0)
                .style("display", d => d.parent === root ? "inline" : "none")
                .text(d => d.data.name)
            );
        }
        
        // Create nodes and define behavior in CP chart
        function nodeSetup() {
            const toolTipOffsetX = 40;
            const toolTipOffsetY = 20;
            return (
                svg.append("g")
                .attr("id", "realRoot")
                .selectAll("circle")
                .data(root.descendants().slice(1))
                .join("circle")
                    .attr("className", d => d.children ? "node" : d.data.id)
                    .attr("id", d => d.children ? "node" : "leaf")
                    .attr("fill", d => d.children ? d3.interpolateOranges(0.2 + d.depth / 10) : 
                        d.data.difficulty === "Advanced" ? d3.interpolateReds(0.5) :
                        d.data.difficulty === "Intermediate" ? 'gold' :
                        d.data.difficulty === "Beginner" ? d3.interpolateGreens(0.5) :
                        d3.interpolateOranges(0.5))
                    .attr("pointer-events", d => d.depth === 1 ? null : "none")
                    .attr("transform", d => `translate(${d.x},${d.y})`)
                    .on("mouseover", function(event, d) { 
                        if (d.parent === focus) {
                            d3.select(this).attr("stroke", "#000");
                            (d3.select(this).attr("id") === "leaf" || 
                            d3.select(this).attr("id") === "selectedleaf") && 
                            toolTip.style("visibility", "visible");
                        }
                    })
                    .on("mouseout", function() {
                        d3.select(this).attr("id") !== "selectedleaf" &&
                        d3.select(this).attr("stroke", null);
                        toolTip.style("visibility", "hidden")
                    })
                    .on("mousemove", function(event, d) {
                        const svgRect = d3.select("#outerSvg").node().getBoundingClientRect();
                        toolTip
                            .html(d.data.name)
                            .style("left", (event.clientX - svgRect.left - toolTipOffsetX) + "px") 
                            .style("top", (event.clientY - svgRect.top + toolTipOffsetY) + "px");
                    })
                    .on("click", function(event, d) {
                        d3.select(this).attr("id") === "node"
                            ? (zoom(event, d), event.stopPropagation()) 
                            : props.onExerciseClick(d3.select(this).attr("className")), event.stopPropagation();
                    })
            );
        }
    };

    function createTooltip() {
        return d3
            .select("#toolTipAppender")
            .append("div")
            .attr("class", "tooltip")
            .attr("pointer-events", "none")
            .style("visibility", "hidden")
            .style("background-color", "white")
            .style("position", "absolute")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")
            .style("font", "12px montserrat");
    }

    /*
        Everything related to sortingScheme buttons here
    */
    function buttonSetup() {
        // BUTTON 1
        let button1_offset = 80
        let b1_font_color = "black";
        if (sortingScheme.includes("equipment")) {
            b1_font_color = "white";
        }
        let b1_img_path = "/icons/dumbbell.svg"

        let b1 = createButton("Equipment", button1_offset, b1_font_color, b1_img_path)
            .attr("y", button1_offset)
            .on("click", function() {
                if (sortingScheme.includes("equipment")) {
                    setSortingScheme(sortingScheme.filter(elem => elem !== "equipment"))
                } else {
                    setSortingScheme([...sortingScheme, "equipment"]);
                }
            })

        // BUTTON 2
        let button2_offset = 115
        let b2_font_color = "black";
        if (sortingScheme.includes("force")) {
            b2_font_color = "white";
        }
        let b2_img_path = "/icons/force.svg"

        let b2 = createButton("Force", button2_offset, b2_font_color, b2_img_path)
            .attr("y", button2_offset)
            .on("click", function() {
                if (sortingScheme.includes("force")) {
                    setSortingScheme(sortingScheme.filter(elem => elem !== "force"))
                } else {
                    setSortingScheme([...sortingScheme, "force"]);
                }
            })
        
        // BUTTON 3
        let button3_offset = 150
        let b3_font_color = "black";
        if (sortingScheme.includes("mechanic")) {
            b3_font_color = "white";
        }
        let b3_img_path = "/icons/gear.svg"

        let b3 = createButton("Mechanic", button3_offset, b3_font_color, b3_img_path)
            .attr("y", button3_offset)
            .on("click", function() {
                if (sortingScheme.includes("mechanic")) {
                    setSortingScheme(sortingScheme.filter(elem => elem !== "mechanic"))
                } else {
                    setSortingScheme([...sortingScheme, "mechanic"]);
                }
            })

        // BUTTON 4
        let button4_offset = 185
        let b4_font_color = "black";
        if (sortingScheme.includes("difficulty")) {
            b4_font_color = "white";
        }
        let b4_img_path = "/icons/difficulty.svg"

        let b4 = createButton("Difficulty", button4_offset, b4_font_color, b4_img_path)
            .attr("y", button4_offset)
            .on("click", function() {
                if (sortingScheme.includes("difficulty")) {
                    setSortingScheme(sortingScheme.filter(elem => elem !== "difficulty"))
                } else {
                    setSortingScheme([...sortingScheme, "difficulty"]);
                }
            })

        // END BUTTONS

        function createButton(sortName, yOffset, font_color, icon_path) {
            let buttons_x_offset = 10

            let button_fill = "white";
            if (sortingScheme.includes(sortName.toLowerCase())) {
                button_fill = "DarkSlateGray"
            }

            let button = d3.select("#outerSvg").append('rect')
            .style("cursor", "pointer")
            .attr("class", "sortButton")
            .attr('x', 10)
            .attr('width', 30)
            .attr('height', 30)
            .attr('rx', 10)
            .attr('fill', button_fill)
            .attr("pointer-events", null)
            .attr('opacity', 0.6)
            .on("mouseover", function() {
                // when mouse is over the button, expand its width to 100 
                d3.select(this)
                    .transition()
                    .duration(100)
                    .attr("width", 100)

                d3.select('#outerSvg')
                    .append('text').text(sortName)
                    .style("fill", font_color)
                    .style("font", "10px montserrat")
                    .style("cursor", "default")
                    .attr("class", "sortButtonText")
                    .attr('x', 43)
                    .attr('y', yOffset + 19)
                    .attr("pointer-events", "none")
                    .style("animation", "fadein 0.5s")
            })
            .on("mouseout", function() {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("width", 30)

                d3.select('#outerSvg')
                    .selectAll(".sortButtonText")
                        .remove()
            })

            let button_img = d3.select("#outerSvg")
                .append("image")
                .attr("class", "btn_img")
                .attr("xlink:href", icon_path)
                .attr("x", buttons_x_offset + 5.5)
                .attr("y", yOffset + 5.5)
                .attr('class', 'btn_img')
                .attr('height', '5%')
                .attr('pointer-events', 'none')

            if (sortingScheme.includes(sortName.toLowerCase())) {
                // Append a circle to the top left of the button,
                // showing the order of the filter in the sorting scheme
                let button_order = d3.select('#outerSvg')
                    .append('circle')
                    .attr('class', 'btn_order')
                    .attr('cx', buttons_x_offset + 3)
                    .attr('cy', yOffset + 3)
                    .attr('r', 5)
                    .attr('fill', 'darkSlateBlue')
                    .attr('pointer-events', 'none')
            
                let button_order_text = d3.select('#outerSvg')
                    .append('text').text(sortingScheme.indexOf(sortName.toLowerCase()) + 1)
                    .style('font', 'montserrat')
                    .attr('class', 'btn_order_text')
                    .attr('x', buttons_x_offset + 3)
                    .attr('y', yOffset + 3.5)
                    .attr('text-anchor', 'middle')
                    .attr('dominant-baseline', 'middle')
                    .attr('fill', 'white')
                    .attr('font-size', 8)
                
                button_img.classed("filter-white", true);
            }
            return button;
        }
    }

    function legendSetup() {
        const colorScale = d3.scaleOrdinal()
        .domain(['Beginner', 'Intermediate', 'Advanced'])
        .range(['#75c47c', '#fcd405', '#fa684c']);

        d3.select("#outerSvg").append('rect')
        .style("cursor", "default")
        .attr("class", "legendContainer")
        .attr('x', 10)
        .attr('y', 10)
        .attr('width', 100)
        .attr('height', 60)
        .attr('rx', 10)
        .attr('fill', 'white')
        .attr("pointer-events", "none")
        .attr('opacity', 0.6);

        d3.select("#outerSvg").append('g')
        .style("font", "10px montserrat")
        .style("cursor", "default")
        .attr("class", "legend")
        .attr('transform', `translate(25,25)`)
        .attr("pointer-events", "none")
        .call(ColorLegend, {
        colorScale,
        circleRadius: 4,
        spacing: 14,
        textOffset: 10,
        });
    }

    // Remove all previous CP chart elements before redrawing
    function removePrevious() {
        d3.select("#circlePackContainer")
            .remove();
        d3.select(".tooltip")
            .remove();
        d3.select("#outerSvg")
            .style("background", d3.interpolateOranges(0.1))
            .selectAll(".sortButton")
                .remove();
        d3.select("#outerSvg")
            .selectAll(".btn_img")
                .remove();
        d3.select("#outerSvg")
            .selectAll(".sortButtonText")
                .remove();
        d3.select("#outerSvg")
            .selectAll(".btn_order")
                .remove();
        d3.select("#outerSvg")
            .selectAll(".btn_order_text")
                .remove();
    }

    return (
        <div id="toolTipAppender">
            <svg
                id="outerSvg"
                className={props.css} 
                ref={svgRef}
                width={width+10}
                height={height+10}
            />
        </div>
    );
}
