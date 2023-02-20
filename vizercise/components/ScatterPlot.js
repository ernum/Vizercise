import * as d3 from "d3";
import { useState, useEffect, useRef } from "react";
import { GetExercises, GetExerciseById } from "./Functions";

export default function Plot({ currentMuscle, onClick }) {
  //fetching
  const source = "/scraped-data.json";
  const [data, setData] = useState();
  const svgRef = useRef();

  function fetchData() {
    const unMappedData = GetExercises(currentMuscle);
    const mappedData = unMappedData.map(function (exerciseDetail) {
      return [exerciseDetail.id, exerciseDetail.popularity];
    });
    setData(mappedData);
  }

  //setup a container
  const containerWidth = 400;
  const containerHeight = 300;
  const svg = d3
    .select(svgRef.current)
    .attr("width", containerWidth)
    .attr("height", containerHeight)
    .style("overflow", "visible")
    .style("margin", "100px");

  //setup scaling
  const xScale = d3.scaleLinear().domain([0, 600]).range([0, containerWidth]);
  const yScale = d3.scaleLinear().domain([0, 100]).range([containerHeight, 0]);

  //setup axis
  const xAxis = d3.axisBottom(xScale).ticks(10);
  const yAxis = d3.axisLeft(yScale).ticks(10);

  function drawScatter() {
    svg
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0,${containerHeight})`);
    svg.append("g").call(yAxis);

    //setup axis labaleing
    svg
      .append("text")
      .attr("x", containerWidth / 2.5)
      .attr("y", containerHeight + 50)
      .text("Exercise Number");
    svg
      .append("text")
      .attr("y", -50)
      .attr("x", -180)
      .text("Popularity")
      .attr("transform", "rotate(-90)");
    svg
      .selectAll()
      .data(data)
      .enter()
      .append("circle")
      .attr("id", (d) => d[0])
      .attr("fill", "green")
      .attr("cx", (d) => xScale(d[0]))
      .attr("cy", (d) => yScale(d[1]))
      .attr("transform", "translate(" + 5 + "," + -5 + ")")
      .attr("r", 7)
      .attr("fill", "#69b3a2")
      .attr("opacity", 0.5)
      .attr("stroke", "white")
      .on("mouseover", mouseOver)
      .on("mouseout", mouseOut)
      .on("click", clickEvent);
  }

  function mouseOver() {
    d3.select(this).append("title").text(GetExerciseById(this.id).name);

    d3.select(this)
      .transition()
      .duration("50")
      .attr("opacity", 1)
      .style("cursor", "pointer");
  }

  function mouseOut() {
    d3.select(this).transition().duration("50").attr("opacity", 0.5);
  }

  function clickEvent() {
    onClick(d3.select(this).attr("id"));
  }

  useEffect(() => {
    svg.selectAll("svg > *").remove();
    fetchData();
  }, [currentMuscle]);

  useEffect(() => {
    drawScatter();
  }, [data]);

  return (
    <div className="flex overflow-auto w-full h-full">
      <div className="relative mx-auto my-auto">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
}
