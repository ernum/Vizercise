import React, { useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import { exerciseDataByEquipment, GetExercises, GetDataOfc } from "./Functions";

import { colorLegend } from './colorLegend';

export default function CirclePacking(props) {
    const svgRef = useRef();
    const width = 500;
    const height = 500;
    const popularityNorm = 4;   // Somewhat arbitrary popularity normalizer
    const [exerciseData, setExerciseData] = useState(exerciseDataByEquipment);

    // Redraw chart when svgRef or exerciseData changes
    useEffect(() => {
        if (svgRef.current) {
            const svg = d3.select(svgRef.current);
            drawChart(svg);
        }   
    }, [svgRef, exerciseData]);

    // setState whenever a muscle is clicked
    useEffect(() => {
        props.selectedMuscles.length 
            ? setExerciseData(GetDataOfc(props.selectedMuscles.flatMap(GetExercises)))
            : setExerciseData(exerciseDataByEquipment);
    }, [props.selectedMuscles])

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
        Draw a Circle Packing chart. Main functionality copied from:
            https://observablehq.com/@d3/zoomable-circle-packing
    */
    function drawChart() {
        // Remove previous CP chart before redrawing
        d3.select("#circlePackContainer")
            .remove();

        const root = pack(exerciseData)
        let focus = root;
        let view;

        const svg = d3.select(svgRef.current)
            .style("background", d3.interpolateOranges(0.1))
            .append("svg")
                .attr("id", "circlePackContainer")
                .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
                .style("display", "block")
                .style("margin", "0 -14px")
                .style("cursor", "pointer");
        
        d3.select("#outerSvg")
            .on("click", function(event) {
                    if (focus !== root) {
                        (zoom(event, root), event.stopPropagation());
                        switchOffPointerEvents("#leaf");
                        switchOnPointerEvents("#node");
                    }
                }
            )

        d3.select(".tooltip")
            .remove();

        const toolTip = createTooltip();
        const toolTipOffsetX = 80;
        const toolTipOffsetY = 20;

        // className and id should be switched but I can't figure out how to use 
        // className with d3 selection so this is a temporary solution...
        const node = svg.append("g")
            .attr("id", "realRoot")
            .selectAll("circle")
            .data(root.descendants().slice(1))
            .join("circle")
                .attr("className", d => d.children ? "node" : d.data.id)
                .attr("id", d => d.children ? "node" : "leaf")
                .attr("fill", d => d.children ? d3.interpolateOranges(0.3) : 
                    d.data.difficulty === "Advanced" ? d3.interpolateReds(0.5) :
                    d.data.difficulty === "Intermediate" ? 'gold' :
                    d.data.difficulty === "Beginner" ? d3.interpolateGreens(0.5) :
                    d3.interpolateOranges(0.5))
                .attr("pointer-events", null)
                .attr("transform", d => `translate(${d.x},${d.y})`)
                .on("mouseover", function() { 
                    if (focus === root) {
                        switchOffPointerEvents("#leaf");
                        d3.select(this).attr("id") === "node" &&  
                            d3.select(this).attr("stroke", "#000");
                    }
                    else {
                        switchOnPointerEvents("#leaf");
                        d3.select(this).attr("id") === "leaf" && 
                            d3.select(this).attr("stroke", "#000");
                        
                    }
                    // Could also be moved into the else scope above if we don't want tooltips for outer circles
                    toolTip
                        .style("visibility", "visible")
                })
                .on("mouseout", function() { 
                    switchOnPointerEvents("#leaf");
                    d3.select(this).attr("stroke", null);
                    toolTip
                        .style("visibility", "hidden")
                })
                .on("mousemove", function(event, d) {
                    const svgRect = d3.select("#outerSvg").node().getBoundingClientRect();
                    toolTip
                        .html(d.data.name)
                        .style("left", (event.clientX - svgRect.left - toolTipOffsetX) + "px") 
                        .style("top", (event.clientY - svgRect.top + toolTipOffsetY) + "px");
                });

        const label = svg.append("g")
            .style("font", "18px montserrat")
            .style("font-weight", "700")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
        .selectAll("text")
        .data(root.descendants())
        .join("text")
            .style("fill-opacity", d => d.parent === root ? d.descendants().length > 1 ? 1 : 0 : 0)
            .style("display", d => d.parent === root ? "inline" : "none")
            .text(d => d.data.name);
            
        d3.selectAll("#node")
            .on("click", function(event, d) {
                (zoom(event, d), event.stopPropagation())
                switchOffPointerEvents("#node")
            });

        d3.selectAll("#leaf")
            .on("click", function(event, d) {
                    (focus !== root && props.onClick(d3.select(this).attr("className")), event.stopPropagation());
            });

        zoomTo([root.x, root.y, root.r * 2]);

        const colorScale = d3.scaleOrdinal()
        .domain(['Beginner', 'Intermediate', 'Advanced'])
        .range(['#75c47c', '#fcd405', '#fa684c']);

        d3.select("#outerSvg").append('rect')
        .style("cursor", "default")
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
        .attr('transform', `translate(25,25)`)
        .attr("pointer-events", "none")
        .call(colorLegend, {
        colorScale,
        circleRadius: 4,
        spacing: 14,
        textOffset: 10
        });

        function createTooltip() {
            return (
                d3.select("#toolTipAppender")
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
            );
        }

        function switchOffPointerEvents(nodeOrLeaf) {
            d3.selectAll(nodeOrLeaf)
                .attr("pointer-events", "none");
        }

        function switchOnPointerEvents(nodeOrLeaf) {
            d3.selectAll(nodeOrLeaf)
                .attr("pointer-events", null);
        }

        function zoomTo(v) {
            const k = width / v[2];       
            view = v;   
            label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
            node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
            node.attr("r", d => d.r * k);
        }   

        function zoom(event, d) {
            focus = d;
            const transition = svg.transition()
                .duration(event.altKey ? 7500 : 750)
                .tween("zoom", d => {
                const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
                return t => zoomTo(i(t));
                });
        }
    };

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
