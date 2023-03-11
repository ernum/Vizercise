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
    const [removedElemIndex, setRemovedElemIndex] = useState(null);
    const [exerciseData, setExerciseData] = useState(getNestedData(dataReq, sortingScheme));
    const [lastFocus, setLastFocus] = useState();
    const [didInit, setDidInit] = useState(false);

    // Redraw chart when svgRef or exerciseData changes
    useEffect(() => {
        if (svgRef.current) {
            drawChart(d3.select(svgRef.current));
            // if (didInit) {}      Might want to use something like this
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
        !didInit && legendSetup();
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
            .style("background", d3.interpolatePurples(0.2))
            .append("svg")
                .attr("id", "circlePackContainer")
                .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
                .attr("class", "absolute h-[100%]")
                .style("display", "block")
                .style("margin", "0 -14px")
                .style("cursor", "pointer")

        d3.select("#outerSvg")
            .on("click", function(event) {
                if (focus === root) {
                    setLastFocus(focus);
                    return; 
                }
                zoom(event, focus.parent), event.stopPropagation();
            });
                
        const node = nodeSetup();
        const label = labelSetup();
        const toolTip = createTooltip();
        buttonSetup(); 
        lastFocus && adjustZoomFocus(lastFocus);
        zoomTo([focus.x, focus.y, focus.r * 2]);
        labelTransition(zoomInitTransition);

        /*          
                Might need this
        if (!didInit) {
            zoomTo([focus.x, focus.y, focus.r * 2]);
        } else {
            
        } */
        
        setDidInit(true);

        /*
            Adjusts the focus of newly drawn CP chart by finding the element that 
            was === focus before CP chart was redrawn by iterating over all ancestors
            of the previous focus until finding the element that corresponds to
            previous focus in the new hierarchy (i.e. until finding itself).
            First part handles removals of sorting filters, 
            second part handles additions of sorting filter.
        */ 
        function adjustZoomFocus(oldFocus) {
            // Helper to find children and improve readability
            function findChild(ancestor, childToFind) {
                for (let idx = 0; idx < ancestor.length; idx++) {
                    if (ancestor[idx].data.name === childToFind.data.name) {
                        focus = ancestor[idx];
                        setLastFocus(focus);
                        switchPointerEvents();
                        return;
                    }
                }
            }
            // Family matters
            function findGrandChild(ancestor, childToFind, grandChildToFind) {
                for (let idx = 0; idx < ancestor.length; idx++) {
                    if (ancestor[idx].data.name === childToFind.data.name) {
                        for (let jdx = 0; jdx < ancestor[idx].children.length; jdx++) {
                            if (ancestor[idx].children[jdx].data.name === grandChildToFind.data.name) {
                                focus = ancestor[idx].children[jdx];
                                setLastFocus(focus);
                                switchPointerEvents();
                                return;
                            }
                        }
                    }
                }
            }
            /*
                If an element (a nesting filter) has been REMOVED from the CP chart
            */
            if (removedElemIndex !== null) {
                // If oldFocus was previous root or current root is not nested
                if (oldFocus.depth === 0 || root.height === 1) { 
                    // Update lastFocus to current focus (root in this case)
                    setLastFocus(root);
                    return;
                }
                // sortingScheme element was removed and we are currently nested
                else if (oldFocus.depth + oldFocus.height > root.height) {
                    if (oldFocus.depth === 1) {
                        // If we removed an element above current focus, do nothing
                        if (oldFocus.depth > removedElemIndex) { return; }
                        // If we removed an element below current focus...
                        else { // ... Find self in newly rendered CP chart 
                            findChild(root.children, oldFocus);
                        }
                    }
                    else if (oldFocus.depth === 2) {
                        // If we removed an element above current focus...
                        if (oldFocus.depth > removedElemIndex) {
                            // ... Find self in newly rendered CP chart
                            findChild(root.children, oldFocus);
                            // If we didn't find self, self was removed
                            findChild(root.children, oldFocus.parent);
                        }
                        else { // If we removed an element below current focus
                            findGrandChild(root.children, oldFocus.parent, oldFocus);
                        }
                    }
                    else if (oldFocus.depth === 3) {
                        if (removedElemIndex === 0) { // Grandparent was removed
                            findGrandChild(root.children, oldFocus.parent, oldFocus);
                        } 
                        else if (removedElemIndex === 1) { // Parent was removed
                            findGrandChild(root.children, oldFocus.parent.parent, oldFocus);
                        }
                        else if (removedElemIndex === 2) { // Self was removed
                            findGrandChild(root.children, oldFocus.parent.parent, oldFocus.parent);
                        }
                        else { // Child of self was removed
                            for (let i = 0; i < root.children.length; i++) {
                                if (root.children[i].data.name === oldFocus.parent.parent.data.name) {
                                    findGrandChild(root.children[i].children, oldFocus.parent, oldFocus);
                                } 
                            }
                        }
                    } 
                    else { // Always some ancestor or self was removed if we get here
                        if (removedElemIndex === 0) { // Great-grandparent was removed
                            for (let i = 0; i < root.children.length; i++) {
                                if (root.children[i].data.name === oldFocus.parent.parent.data.name) {
                                    findGrandChild(root.children[i].children, oldFocus.parent, oldFocus);
                                }
                            }
                        }
                        else if (removedElemIndex === 1) { // Grandparent was removed
                            for (let i = 0; i < root.children.length; i++) {
                                if (root.children[i].data.name === oldFocus.parent.parent.parent.data.name) {
                                    findGrandChild(root.children[i].children, oldFocus.parent, oldFocus);
                                }
                            }
                        }
                        else if (removedElemIndex === 2) { // Parent was removed
                            for (let i = 0; i < root.children.length; i++) {
                                if (root.children[i].data.name === oldFocus.parent.parent.parent.data.name) {
                                    findGrandChild(root.children[i].children, oldFocus.parent.parent, oldFocus);
                                }
                            }
                        }
                        else { // Self was removed
                            for (let i = 0; i < root.children.length; i++) {
                                if (root.children[i].data.name === oldFocus.parent.parent.parent.data.name) {
                                    findGrandChild(root.children[i].children, oldFocus.parent.parent, oldFocus.parent);
                                }
                            }
                        }
                    }
                }
            }       
            /* 
                If an element (a nesting filter) has been ADDED to the CP chart.
                To find the correct element we start at the new root and traverse 
                downwards in the hierarchy. At every level, we match the name of
                the current hierarchy level to that of the corresponding ancestor
                of oldFocus until the elem with the same ancestors as oldFocus is found.
            */   
            else {
                if (oldFocus.depth === 1) {
                    let found = false;
                    let i = 0;
                    while (!found && i < root.children.length) {
                        if (root.children[i].data.name === oldFocus.data.name) {
                            focus = root.children[i];
                            setLastFocus(focus);
                            switchPointerEvents();
                            found = true;
                        }
                        i++;
                    }
                } else if (oldFocus.depth === 2) {
                    let foundParent = false;
                    let parent;
                    let i = 0;
                    while (!foundParent && i < root.children.length) {
                        if (root.children[i].data.name === oldFocus.parent.data.name) {
                            parent = root.children[i];
                            foundParent = true;
                        }
                        i++;
                    }
                    if (foundParent) {
                        let found = false;
                        i = 0;
                        while (!found && i < parent.children.length) {
                            if (parent.children[i].data.name === oldFocus.data.name) {
                                focus = parent.children[i];
                                setLastFocus(focus);
                                switchPointerEvents();
                                found = true;
                            }
                            i++;
                        }
                    }
                } else if (oldFocus.depth === 3) {
                    let foundGrandParent = false;
                    let grandParent;
                    let i = 0;
                    while (!foundGrandParent && i < root.children.length) {
                        if (root.children[i].data.name === oldFocus.parent.parent.data.name) {
                            grandParent = root.children[i];
                            foundGrandParent = true;
                        }
                        i++;
                    }
                    if (foundGrandParent) {
                        let foundParent = false;
                        let parent;
                        i = 0;
                        while (!foundParent && i < grandParent.children.length) {
                            if (grandParent.children[i].data.name === oldFocus.parent.data.name) {
                                parent = grandParent.children[i];
                                foundParent = true;
                            }
                            i++;
                        }
                        if (foundParent) {
                            let found = false;
                            i = 0;
                            while (!found && i < parent.children.length) {
                                if (parent.children[i].data.name === oldFocus.data.name) {
                                    focus = parent.children[i];
                                    setLastFocus(focus);
                                    switchPointerEvents();
                                    found = true;
                                    console.log(focus);
                                }
                                i++;
                            }
                        }
                    }
                }
            }
        } 

        function zoomTo(v) {
            const k = width / v[2];
            view = v;
            label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
            node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
            node.attr("r", d => d.r * k);
        }

        function zoom(event, d) {
            let depthChange = Math.abs(d.depth - focus.depth);
            // Only allow a depth change of 1
            if (depthChange !== 0 && depthChange !== 1) { return; }
            setLastFocus(focus);
            focus = d; 
            // If not node or outerSvg, event.target === sortButton
            if (event.target.id !== "node" && event.target.id !== "outerSvg") 
                { return; }
            switchPointerEvents();
            const transition = zoomTransition(event);
            labelTransition(transition);     
        }

        function zoomInitTransition() {
            return (
                svg.transition()
                    .duration(0)
                    .tween("zoom", d => {
                    const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
                    return t => zoomTo(i(t));
                    })
            );
        }

        // Moved outside of zoom() for later re-use
        function zoomTransition(e) {
            return (
                svg.transition()
                    .duration(e.altKey ? 7500 : 750)
                    .tween("zoom", d => {
                    const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
                    return t => zoomTo(i(t));
                    })
            );
        }

        // Moved outside of zoom() for later re-use
        function labelTransition(transitionArg) {
            label
                .filter(function(d) { 
                    return d.parent === focus || this.style.display === "inline"; })
                .transition(transitionArg)
                  .style("fill-opacity", d => d.parent === focus ? 1 : 0)
                  .on("start", function(d) { 
                    if (d.parent === focus) this.style.display = "inline"; })
                  .on("end", function(d) { 
                    if (d.parent !== focus) this.style.display = "none"; });
        }

        function switchPointerEvents() {
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
        }

        function labelSetup() {
            function filterOutLeaf(node) {
                if (node.height > 0) { return true; }
                return false;
            }
            return(
                svg.append("g")
                    .style("font", "18px montserrat")
                .style("font-weight", "700")
                .attr("pointer-events", "none")
                .attr("text-anchor", "middle")
            .selectAll("text")
            .data(root.descendants().filter(filterOutLeaf))
            .join("text")
                .style("fill-opacity", d => d.parent === focus ? 1 : 0)
                .style("display", "none") // Changes on init and on zoom
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
                    .attr("fill", d => d.children ? d3.interpolatePurples(0.6 - d.depth / 15) : //interpolatesPurples(0.3 + d.depth/10)
                        d.data.difficulty === "Advanced" ? d3.interpolateReds(0.5) :
                            d.data.difficulty === "Intermediate" ? 'gold' : //background - color: #FBF4EF;
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

    //
    //      Everything related to sortingScheme buttons start here
    //
    
    function handleSortButtonClick(attributeKey) {
        if (sortingScheme.includes(attributeKey)) {
            setRemovedElemIndex(sortingScheme.findIndex(elem => elem === attributeKey));
            setSortingScheme(sortingScheme.filter(elem => elem !== attributeKey))
        } else {
            setRemovedElemIndex(null);
            setSortingScheme([...sortingScheme, attributeKey]);
        }
    }

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
                handleSortButtonClick("equipment");
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
                handleSortButtonClick("force");
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
                handleSortButtonClick("mechanic");
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
                handleSortButtonClick("difficulty");
            })

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
    } //         End of everything button related   

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
