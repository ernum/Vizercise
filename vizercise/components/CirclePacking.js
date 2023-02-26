import React, { useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import { exerciseDataByEquipment } from "./Functions";

export default function CirclePacking(props) {
    const svgRef = useRef();
    const width = 500;
    const height = 500;
    const popularityNorm = 4;
    const [exerciseData, setExerciseData] = useState(exerciseDataByEquipment);

    useEffect(() => {
        if (svgRef.current) {
            const svg = d3.select(svgRef.current);
            d3.format(",d");
            drawChart(svg);       
        }   
    }, [svgRef]);

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

    function drawChart() {
        d3.select("#circlePackChart")
            .remove();

        const root = pack(exerciseData)
        let focus = root;
        let view;
        
        const svg = d3.select(svgRef.current)
            .style("background", d3.interpolateOranges(0.1))
            .append("svg")
                .attr("id", "circlePackChart")
                .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
                .style("display", "block")
                .style("margin", "0 -14px")
                .style("cursor", "pointer")
                .on("click", (event) => zoom(event, root));

        const node = svg.append("g")
            .attr("id", "realRoot")
            .selectAll("circle")
            .data(root.descendants().slice(1))
            .join("circle")
                .attr("className", d => d.children ? "node" : "leaf node")
                .attr("fill", d => d.children ? d3.interpolateOranges(0.3) : d3.interpolateOranges(0.5))
                .attr("pointer-events", d => !d.children ? "none" : null)
                .attr("transform", d => `translate(${d.x},${d.y})`)
                .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
                .on("mouseout", function() { d3.select(this).attr("stroke", null); })
                .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

        zoomTo([root.x, root.y, root.r * 2]);

        function zoomTo(v) {
            const k = width / v[2];       
            view = v;   
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
        <svg 
            className={props.css} 
            ref={svgRef}
            width={width+10}
            height={height+10}
        />
    );
}
