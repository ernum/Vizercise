import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { GetExercises, getNestedData, dataReq,
  calculateMusclesInvolved, createExplainText, getIntersectionExercises } from "./Functions";
import { ColorLegend } from './ColorLegend';

export default function CirclePacking(props) {
  const svgRef = useRef();
  const width = 500;
  const height = 500;
  const popularityNorm = 4;   // Somewhat arbitrary popularity normalizer
  const force = ["Push", "Pull", "Hold"];
  const difficulty = ["Beginner", "Intermediate", "Advanced"];
  const equipment = 
    ["Stretch", "Plate", "Machine", "Kettlebell", "Cable",
    "Bodyweight", "TRX", "Dumbbell", "Barbell", "Band"];
  const mechanic = ["Compound", "Isolation"];

  const [sortingScheme, setSortingScheme] = useState([]);
  const [sizingScheme, setSizingScheme] = useState("popularity");
  const [removedElemIndex, setRemovedElemIndex] = useState(null);
  const [exerciseData, setExerciseData] = useState(getNestedData(dataReq, sortingScheme));
  const [currentFocus, setCurrentFocus] = useState();
  const [prevSelectedMuscles, setPrevSelectedMuscles] = useState(props.selectedMuscles);
  const [prevSelectionScheme, setPrevSelectionScheme] = useState(props.selectionScheme);

  // Redraw chart when svgRef or exerciseData changes
  useEffect(() => {
    if (svgRef.current) {
      drawChart(d3.select(svgRef.current));
    }
  }, [svgRef, exerciseData]);

  // Update the data displayed in CP chart when a muscle or sorting button is clicked
  useEffect(() => {
    // If selectedMuscles is not empty
    if (props.selectedMuscles.length) {
      // Boolean || selection
      if (props.selectionScheme === "Union") {
        setExerciseData(getNestedData([...new Set(props.selectedMuscles.flatMap(GetExercises))], sortingScheme))
      } 
      // Boolean && selection
      else {
        let intersectionArray = getIntersectionExercises(props.selectedMuscles[0]);
        // Loop over selected muscles and only include exercises that intersect
        for (let i = 1; i < props.selectedMuscles.length; i++) {
          let tempArr = getIntersectionExercises(props.selectedMuscles[i])
          intersectionArray = intersectionArray.filter(elem => tempArr.includes(elem));
        }
        setExerciseData(getNestedData([...new Set(intersectionArray)], sortingScheme))
      }
    } else {
      setExerciseData(getNestedData(dataReq, sortingScheme));
    }
  }, [props.selectedMuscles, sortingScheme, sizingScheme, props.selectionScheme]);

  // Update id of leafs if they have been selected and give selected leafs a border outline
  useEffect(() => {
    d3.selectAll("#leaf")
      .attr("id", function () {
        let exerciseId = d3.select(this).attr("className");
        if (props.selectedExercises.includes(exerciseId)) {
          return "selectedleaf";
        }
        return "leaf";
      });
    d3.selectAll("#selectedleaf")
      .attr("id", function () {
        let exerciseId = d3.select(this).attr("className");
        if (!props.selectedExercises.includes(exerciseId)) {
          d3.select(this).attr("stroke", "none");
          return "leaf";
        }
        return "selectedleaf";
      });
    d3.selectAll("#selectedleaf").attr("stroke", "#000");
  }, [props.selectedExercises, exerciseData]);

  // Necessary "preprocessing" of data to be able to use it in CP chart
  function packByPopularity(data) {
    return (
      d3.pack()
        .size([width, height])
        .padding(3)
        (d3.hierarchy(data)
          .sum(d => d.hasOwnProperty("popularity") ? d.popularity + popularityNorm : 0)
          .sort((a, b) => b.value - a.value))
    )
  }
  function packByMusclesInvolved(data) {
    return (
      d3.pack()
        .size([width, height])
        .padding(3)
        (d3.hierarchy(data)
          .sum(d => calculateMusclesInvolved(d))
          .sort((a, b) => b.value - a.value))
    )
  }

  /*
        Draw a Circle Packing chart. Core functionality copied from:
            https://observablehq.com/@d3/zoomable-circle-packing
  */
  function drawChart() {
    removePrevious();
    const root = sizingScheme === "popularity"
      ? packByPopularity(exerciseData)
      : packByMusclesInvolved(exerciseData);
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
    .on("click", function (event) {
      if (focus === root) {
        setCurrentFocus(focus);
        return;
      }
      zoom(event, focus.parent), event.stopPropagation();
    });

    const node = nodeSetup();
    const label = labelSetup();
    const toolTip = createTooltip();
    legendSetup();
    buttonSetup();
    if (prevSelectedMuscles !== props.selectedMuscles) {
      setPrevSelectedMuscles(props.selectedMuscles);
    } else if (prevSelectionScheme !== props.selectionScheme) {
      setPrevSelectionScheme(props.selectionScheme);
    }
    currentFocus && adjustZoomFocus(currentFocus);
    zoomTo([focus.x, focus.y, focus.r * 2]);
    labelTransition(zoomInitTransition);
    // Put the hierarchy display in front of CPC
    d3.selectAll("#hierarchyContainer").raise();

    /*
        Adjusts the focus of newly drawn CP chart by finding the element that
        was === focus before CP chart was redrawn by iterating over all ancestors
        of the previous focus until finding the element that corresponds to
        previous focus in the new hierarchy (i.e. until finding itself).
        First part handles removals of sorting filters, second part additions.
    */
    function adjustZoomFocus(oldFocus) {
      function setFocus(focusToSet) {
        focus = focusToSet;
        setCurrentFocus(focus);
        setRemovedElemIndex(null);
        switchPointerEvents();
      }
      // BFS helper
      function findChild(parent, childToFind) {
        for (let i = 0; i < parent.children.length; i++) {
          if (parent.children[i].data.name === childToFind.data.name) {
            return parent.children[i];
          }
        }
        return null;
      }

      let child;
      
      if (removedElemIndex !== null) {
        // If oldFocus was previous root or current root is not nested
        if (oldFocus.depth === 0 || root.height === 1) { // Do nothing
        } else if (oldFocus.depth === 1) {
          // If we removed an element above current focus
          if (removedElemIndex === 0) { // Do nothing
          } else { // Else find self in newly rendered CP chart
            child = findChild(root, oldFocus);
          }
        } else if (oldFocus.depth === 2) {
          // If we removed an element above current focus...
          if (removedElemIndex === 0) {
            // ... Find self in newly rendered CP chart
            child = findChild(root, oldFocus);
          } else if (removedElemIndex === 1) {
            // If we didn't find self, self was removed
            child = findChild(root, oldFocus.parent);
          } else { // If we removed an element below current focus
            child = findChild(root, oldFocus.parent);
            child = child ? findChild(child, oldFocus) : null;
          }
        } else if (oldFocus.depth === 3) {
          if (removedElemIndex === 0) { // Grandparent was removed
            child = findChild(root, oldFocus.parent);
            child = child ? findChild(child, oldFocus) : null;
          } else if (removedElemIndex === 1) { // Parent was removed
            child = findChild(root, oldFocus.parent.parent);
            child = child ? findChild(child, oldFocus) : null;
          } else if (removedElemIndex === 2) { // Self was removed
            child = findChild(root, oldFocus.parent.parent);
            child = child ? findChild(child, oldFocus.parent) : null;
          } else { // Child of self was removed
            child = findChild(root, oldFocus.parent.parent);
            child = child ? findChild(child, oldFocus.parent) : null;
            child = child ? findChild(child, oldFocus) : null;
          }
        } else { // Always some ancestor or self was removed if we get here
          if (removedElemIndex === 0) { // Great-grandparent was removed
            child = findChild(root, oldFocus.parent.parent);
            child = child ? findChild(child, oldFocus.parent) : null;
            child = child ? findChild(child, oldFocus) : null;
          } else if (removedElemIndex === 1) { // Grandparent was removed
            child = findChild(root, oldFocus.parent.parent.parent);
            child = child ? findChild(child, oldFocus.parent) : null;
            child = child ? findChild(child, oldFocus) : null;
          } else if (removedElemIndex === 2) { // Parent was removed
            child = findChild(root, oldFocus.parent.parent.parent);
            child = child ? findChild(child, oldFocus.parent.parent) : null;
            child = child ? findChild(child, oldFocus) : null;
          } else { // Self was removed
            child = findChild(root, oldFocus.parent.parent.parent);
            child = child ? findChild(child, oldFocus.parent.parent) : null;
            child = child ? findChild(child, oldFocus.parent) : null;
          }
        }
      }
      /*
          If a sorting filter has been ADDED to the CP chart OR if a muscle has
          been selected or deselected in the body map.
          To find the correct element we start at the new root and traverse
          downwards in the hierarchy (BFS). At every level, we match the name of
          the current hierarchy level to that of the corresponding ancestor
          of oldFocus until the elem with the same ancestors as oldFocus is found.
      */
      else {
        if (oldFocus.depth === 1) {
          child = findChild(root, oldFocus);
        } else if (oldFocus.depth === 2) {
          child = findChild(root, oldFocus.parent);
          child = child ? findChild(child, oldFocus) : null;
        } else if (oldFocus.depth === 3) {
          child = findChild(root, oldFocus.parent.parent);
          child = child ? findChild(child, oldFocus.parent) : null;
          child = child ? findChild(child, oldFocus) : null;
        } else if (oldFocus.depth === 4) {
          child = findChild(root, oldFocus.parent.parent.parent);
          child = child ? findChild(child, oldFocus.parent.parent) : null;
          child = child ? findChild(child, oldFocus.parent) : null;
          child = child ? findChild(child, oldFocus) : null;
        }
      }
      (child && setFocus(child)) || setFocus(focus);
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

      updateHierarchyFocus(d, focus);
      focus = d;
      setCurrentFocus(focus);
      // If not node or outerSvg, event.target === sortButton
      if (event.target.id !== "node" && event.target.id !== "outerSvg") { return; }
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
        .filter(function (d) {
          return d.parent === focus || this.style.display === "inline";
        })
        .transition(transitionArg)
        .style("fill-opacity", function (d) {
          if (d.parent !== focus) { return 0; }
          return d.value === 0 ? 0.5 : 1;
        })
        .on("start", function (d) {
          if (d.parent === focus) this.style.display = "inline";
        })
        .on("end", function (d) {
          if (d.parent !== focus) this.style.display = "none";
        });
    }

    function switchPointerEvents() {
      // Turn on node pointer events if they are the children of current focus
      d3.selectAll("#node")
        .attr("pointer-events", function (d) {
          if (d.parent === focus) { return null; }
          return "none";
        })
      // Turn on leaf pointer-events if they are next in line
      d3.selectAll("#leaf")
        .attr("pointer-events", function (d) {
          if (root.height === focus.depth + 1 && d.parent === focus) { return null; }
          return "none";
        })
      d3.selectAll("#selectedleaf")
        .attr("pointer-events", function (d) {
          if (root.height === focus.depth + 1 && d.parent === focus) { return null; }
          return "none";
        })
      // Switch cursor of background to pointer when zoomed in
      d3.select("#outerSvg")
        .style("cursor", function () {
          if (focus === root) { return "default"; }
          return "pointer";
        })
    }

    function labelSetup() {
      function filterOutLeaf(node) { return node.height > 0 }
      return (
        svg.append("g")
          .attr("pointer-events", "none")
          .attr("text-anchor", "middle")
          .selectAll("text")
          .data(root.descendants().filter(filterOutLeaf))
          .join("text")
          .style("fill-opacity", function (d) {
            if (d.parent !== focus) { return 0; }
            return d.value === 0 ? 0.25 : 1;
          })
          .style("display", "none") // Changes on init and on zoom
          .style("font", d => d.value === 0
            ? "8px NeueHaasDisplay" : "18px NeueHaasDisplay")
          .style("font-weight", "700")
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
          .attr("fill", d => d.children ?
            d3.interpolatePurples(0.6 - d.depth / 15) : //interpolatesPurples(0.3 + d.depth/10)
            d.data.difficulty === "Advanced" ? d3.interpolateReds(0.5) :
            d.data.difficulty === "Intermediate" ? 'gold' : //background - color: #FBF4EF;
            d.data.difficulty === "Beginner" ? d3.interpolateGreens(0.5) : "black")
          .attr("fill-opacity", d => d.value === 0 ? 0.3 : 1)
          .attr("pointer-events", d => d.depth === 1 ? null : "none")
          .attr("transform", d => `translate(${d.x},${d.y})`)
          .on("mouseover", function (event, d) {
            if (d.parent === focus) {
              d3.select(this).attr("stroke", "#000");
              (d3.select(this).attr("id") === "leaf" ||
                d3.select(this).attr("id") === "selectedleaf") &&
                toolTip.style("visibility", "visible");
            }
          })
          .on("mouseout", function () {
            d3.select(this).attr("id") !== "selectedleaf" &&
              d3.select(this).attr("stroke", null);
            toolTip.style("visibility", "hidden")
          })
          .on("mousemove", function (event, d) {
            const svgRect = d3.select("#outerSvg").node().getBoundingClientRect();
            toolTip
              .html(d.data.name)
              .style("left", (event.clientX - svgRect.left - toolTipOffsetX) + "px")
              .style("top", (event.clientY - svgRect.top + toolTipOffsetY) + "px");
          })
          .on("click", function (event, d) {
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
      .style("font", "12px NeueHaasDisplay");
  }

  //
  //      Everything related to sortingScheme buttons start here
  //

  function handleSortButtonClick(attributeKey, capitalizedKey) {
    if (sortingScheme.includes(attributeKey)) {
      let removedIndex = sortingScheme.findIndex(elem => elem === attributeKey);
      updateHierarchyDisplayOnRemove(removedIndex, attributeKey);
      setRemovedElemIndex(removedIndex);
      setSortingScheme(sortingScheme.filter(elem => elem !== attributeKey))
    } else {
      updateHierarchyDisplayOnAdd(capitalizedKey);
      setRemovedElemIndex(null);
      setSortingScheme([...sortingScheme, attributeKey]);
    }
  }

  function buttonSetup() {
    createExplainText("#outerSvg" ,"Sorting Filters", 12, 90, 12);
    createExplainText("#outerSvg", "Circle Size", 12, 265, 12);
    createExplainText("#outerSvg", "Hierarchy", 12, 335, 12);
    // BUTTON 1
    let b1_font_color = "black";
    if (sortingScheme.includes("equipment")) {
      b1_font_color = "white";
    }
    let b1_img_path = "/icons/dumbbell.svg"
    createButton("Equipment", 80, b1_font_color, b1_img_path, "sortButton", 100);

    // BUTTON 2
    let b2_font_color = "black";
    if (sortingScheme.includes("force")) {
      b2_font_color = "white";
    }
    let b2_img_path = "/icons/force.svg"
    createButton("Force", 115, b2_font_color, b2_img_path, "sortButton", 100);

    // BUTTON 3
    let b3_font_color = "black";
    if (sortingScheme.includes("mechanic")) {
      b3_font_color = "white";
    }
    let b3_img_path = "/icons/gear.svg"
    createButton("Mechanic", 150, b3_font_color, b3_img_path, "sortButton", 100);

    // BUTTON 4
    let b4_font_color = "black";
    if (sortingScheme.includes("difficulty")) {
      b4_font_color = "white";
    }
    let b4_img_path = "/icons/difficulty.svg"
    createButton("Difficulty", 185, b4_font_color, b4_img_path, "sortButton", 100);

    // sizingScheme button
    createButton("Google search volume", 255, "black",
      "/icons/circleSize.svg", "sizeButton", 160);

    function createButton(sortName, yOffset, font_color, icon_path, buttonClass, expandWidth) {
      let yOffsetGlobal = 20;
      let buttons_x_offset = 14;
      let button_fill = sortingScheme.includes(sortName.toLowerCase())
        ? "DarkSlateGray"
        : "white";
      let button = d3.select("#outerSvg").append('rect')
        .style("cursor", "pointer")
        .attr("class", buttonClass)
        .attr("id", sortName)
        .attr('x', 10)
        .attr('y', yOffset + yOffsetGlobal)
        .attr('width', 30)
        .attr('height', 30)
        .attr('rx', 10)
        .attr('fill', button_fill)
        .attr("pointer-events", null)
        .attr('opacity', 0.6)
        .on("click", function (event) {
          if (d3.select(this).attr("class") === "sortButton") {
            handleSortButtonClick(sortName.toLowerCase(), sortName, event.stopPropagation());
          } else {
            sizingScheme === "popularity"
              ? setSizingScheme("muscleSum")
              : setSizingScheme("popularity");
          }
        })
        .on("mouseover", function () {
          // when mouse is over the button, expand its width to expandWidth
          d3.select(this)
            .transition()
            .duration(100)
            .attr("width", expandWidth)

          let textToAppend;
          if (d3.select(this).attr("class") === "sizeButton") {
            textToAppend = sizingScheme === "popularity"
              ? "Google search volume"
              : "Nr of muscles activated";
          } else {
            textToAppend = sortName;
          }

          d3.select('#outerSvg')
            .append('text').text(textToAppend)
            .style("fill", font_color)
            .style("font", "10px NeueHaasDisplay")
            .style("cursor", "default")
            .attr("class", "sortButtonText")
            .attr('x', 43)
            .attr('y', yOffset + 19 + yOffsetGlobal)
            .attr("pointer-events", "none")
            .style("animation", "fadein 0.5s")
        })
        .on("mouseout", function () {
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
        .attr("x", buttons_x_offset)
        .attr("y", yOffset + 4 + yOffsetGlobal)
        .attr('height', 22)
        .attr('pointer-events', 'none')

      if (sortingScheme.includes(sortName.toLowerCase())) {
        // Append a circle to the top left of the button,
        // showing the order of the filter in the sorting scheme
        d3.select('#outerSvg')
          .append('circle')
          .attr('class', 'btn_order')
          .attr('cx', buttons_x_offset - 1)
          .attr('cy', yOffset + 3 + yOffsetGlobal)
          .attr('r', 5)
          .attr('fill', 'darkSlateBlue')
          .attr('pointer-events', 'none');

        d3.select('#outerSvg')
          .append('text').text(sortingScheme.indexOf(sortName.toLowerCase()) + 1)
          .style('font', 'NeueHaasDisplay')
          .attr('class', 'btn_order_text')
          .attr('x', buttons_x_offset - 1)
          .attr('y', yOffset + 3.5 + yOffsetGlobal)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('fill', 'white')
          .attr('font-size', 8);

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
      .style("font", "10px NeueHaasDisplay")
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
  
  function createHierarchyDisplay() {
    function createHierarchyLevel(id, x, y, w, h, fill_color) {
      return (
        <rect
          className="hierarchyRect"
          id={id}
          x={x}
          y={y}
          width={w}
          height={h}
          rx={10}
          opacity={0.6}
          visibility="hidden"
          fill={fill_color}
        >
        </rect>
      )
    }
    return (
      <g id="hierarchyContainer">
        {createHierarchyLevel("levelOne", 10, 340, 100, 18, "white")}
        {createHierarchyLevel("levelTwo", 15, 360, 90, 18, "white")}
        {createHierarchyLevel("levelThree", 20, 380, 80, 18, "white")}
        {createHierarchyLevel("levelFour", 25, 400, 70, 18, "white")}
      </g>
    )
  }

  function createHierarchyText(id, x, y, textToAppend, font_color) {
    d3.select("#hierarchyContainer")
      .append('text').text(textToAppend)
      .style("fill", font_color)
      .style("font", "10px NeueHaasDisplay")
      .attr("text-align", "center")
      .attr("id", id)
      .attr("class", "hierarchyText")
      .attr('x', x)
      .attr('y', y)
      .attr("pointer-events", "none")
      .attr("alignment-baseline", "middle")
      .attr("text-anchor", "middle")
  }

  // Updates hierarchy display when sorting filters have been added
  function updateHierarchyDisplayOnAdd(capitalizedKey) {
    if (sortingScheme.length === 0) {
      d3.select("#levelOne")
        .style("visibility", "visible");
      createHierarchyText("levelOneText", 60, 352, capitalizedKey, "black");
    } else if (sortingScheme.length === 1) {
      d3.select("#levelTwo")
        .style("visibility", "visible")
      createHierarchyText("levelTwoText", 60, 372, capitalizedKey, "black");
    } else if (sortingScheme.length === 2) {
      d3.select("#levelThree")
        .style("visibility", "visible")
      createHierarchyText("levelThreeText", 60, 392, capitalizedKey, "black");
    } else {
      d3.select("#levelFour")
        .style("visibility", "visible")
      createHierarchyText("levelFourText", 60, 412, capitalizedKey, "black");
    }
  }

  // Updates hierarchy display when sorting filters have been removed
  function updateHierarchyDisplayOnRemove(removedIndex) {
    // If 4 filters were selected before removal
    if (sortingScheme.length === 4) {
      // If first sorting filter was removed
      if (removedIndex === 0) {
        // Previous focus depth === 1 --> new focus depth === 0
        if (d3.select("#levelOne").attr("fill") === "DarkSlateGray") {
          d3.selectAll(".hierarchyRect").attr("fill", "white");
          d3.selectAll(".hierarchyText").style("fill", "black");
        } 
        // Previous focus depth === 2 --> new focus depth === 1
        else if (d3.select("#levelTwo").attr("fill") === "DarkSlateGray") {
          d3.selectAll(".hierarchyRect").attr("fill", function () {
            if (d3.select(this).attr("id") === "levelOne") 
              return "DarkSlateGray";
            return "white";
          });
          d3.selectAll(".hierarchyText").style("fill", function () {
            if (d3.select(this).attr("id") === "levelOneText")
              return "white";
            return "black"; 
          });
        } 
        // Previous focus depth === 3 --> new focus depth === 2
        else if (d3.select("#levelThree").attr("fill") === "DarkSlateGray") {
          d3.selectAll(".hierarchyRect").attr("fill", function () {
            if (d3.select(this).attr("id") === "levelTwo") 
              return "DarkSlateGray";
            return "white";
          });
          d3.selectAll(".hierarchyText").style("fill", function () {
            if (d3.select(this).attr("id") === "levelTwoText")
              return "white";
            return "black"; 
          });
        }
        // Previous focus depth === 4 --> new focus depth === 3
        else if (d3.select("#levelFour").attr("fill") === "DarkSlateGray") {
          d3.selectAll(".hierarchyRect").attr("fill", function () {
            if (d3.select(this).attr("id") === "levelThree") 
              return "DarkSlateGray";
            return "white";
          });
          d3.selectAll(".hierarchyText").style("fill", function () {
            if (d3.select(this).attr("id") === "levelThreeText")
              return "white";
            return "black"; 
          });
        }
        d3.select("#levelOneText").text(d3.select("#levelTwoText").text())
        d3.select("#levelTwoText").text(d3.select("#levelThreeText").text())
        d3.select("#levelThreeText").text(d3.select("#levelFourText").text())
      } 
      // If second sorting filter was removed
      else if (removedIndex === 1) {
        // Previous focus depth === 2 --> new focus depth === 1
        if (d3.select("#levelTwo").attr("fill") === "DarkSlateGray") {
          d3.selectAll(".hierarchyRect").attr("fill", function () {
            if (d3.select(this).attr("id") === "levelOne") 
              return "DarkSlateGray";
            return "white";
          });
          d3.selectAll(".hierarchyText").style("fill", function () {
            if (d3.select(this).attr("id") === "levelOneText")
              return "white";
            return "black"; 
          });
        }
        // Previous focus depth === 3 --> new focus depth === 2
        else if (d3.select("#levelThree").attr("fill") === "DarkSlateGray") {
          d3.selectAll(".hierarchyRect").attr("fill", function () {
            if (d3.select(this).attr("id") === "levelTwo") 
              return "DarkSlateGray";
            return "white";
          });
          d3.selectAll(".hierarchyText").style("fill", function () {
            if (d3.select(this).attr("id") === "levelTwoText")
              return "white";
            return "black"; 
          });
        }
        // Previous focus depth === 4 --> new focus depth === 3
        else if (d3.select("#levelFour").attr("fill") === "DarkSlateGray") {
          d3.selectAll(".hierarchyRect").attr("fill", function () {
            if (d3.select(this).attr("id") === "levelThree") 
              return "DarkSlateGray";
            return "white";
          });
          d3.selectAll(".hierarchyText").style("fill", function () {
            if (d3.select(this).attr("id") === "levelThreeText")
              return "white";
            return "black"; 
          });
        }
        d3.select("#levelTwoText").text(d3.select("#levelThreeText").text())
        d3.select("#levelThreeText").text(d3.select("#levelFourText").text())
      } 
      // If third sorting filter was removed
      else if (removedIndex === 2) {
        // Previous focus depth === 3 --> new focus depth === 2
        if (d3.select("#levelThree").attr("fill") === "DarkSlateGray") {
          d3.selectAll(".hierarchyRect").attr("fill", function () {
            if (d3.select(this).attr("id") === "levelTwo") 
              return "DarkSlateGray";
            return "white";
          });
          d3.selectAll(".hierarchyText").style("fill", function () {
            if (d3.select(this).attr("id") === "levelTwoText")
              return "white";
            return "black"; 
          });
        }
        // Previous focus depth === 4 --> new focus depth === 3
        else if (d3.select("#levelFour").attr("fill") === "DarkSlateGray") {
          d3.selectAll(".hierarchyRect").attr("fill", function () {
            if (d3.select(this).attr("id") === "levelThree") 
              return "DarkSlateGray";
            return "white";
          });
          d3.selectAll(".hierarchyText").style("fill", function () {
            if (d3.select(this).attr("id") === "levelThreeText")
              return "white";
            return "black"; 
          });
        }
        d3.select("#levelThreeText").text(d3.select("#levelFourText").text())
      } 
      // If fourth sorting filter was removed
      else {
        // Previous focus depth === 4 --> new focus depth === 3
        if (d3.select("#levelFour").attr("fill") === "DarkSlateGray") {
          d3.selectAll(".hierarchyRect").attr("fill", function () {
            if (d3.select(this).attr("id") === "levelThree") 
              return "DarkSlateGray";
            return "white";
          });
          d3.selectAll(".hierarchyText").style("fill", function () {
            if (d3.select(this).attr("id") === "levelThreeText")
              return "white";
            return "black"; 
          });
        }
      }
      d3.select("#levelFour")
        .style("visibility", "hidden")
        .attr("fill", "white");
      d3.select("#levelFourText")
        .remove();
    }
    // If 3 filters were selected before removal
    else if (sortingScheme.length === 3) {
      // If first sorting filter was removed
      if (removedIndex === 0) {
        // Previous focus depth === 1 --> new focus depth === 0
        if (d3.select("#levelOne").attr("fill") === "DarkSlateGray") {
          d3.selectAll(".hierarchyRect").attr("fill", "white");
          d3.selectAll(".hierarchyText").style("fill", "black");
        } 
        // Previous focus depth === 2 --> new focus depth === 1
        else if (d3.select("#levelTwo").attr("fill") === "DarkSlateGray") {
          d3.selectAll(".hierarchyRect").attr("fill", function () {
            if (d3.select(this).attr("id") === "levelOne") 
              return "DarkSlateGray";
            return "white";
          });
          d3.selectAll(".hierarchyText").style("fill", function () {
            if (d3.select(this).attr("id") === "levelOneText")
              return "white";
            return "black"; 
          });
        } 
        // Previous focus depth === 3 --> new focus depth === 2
        else if (d3.select("#levelThree").attr("fill") === "DarkSlateGray") {
          d3.selectAll(".hierarchyRect").attr("fill", function () {
            if (d3.select(this).attr("id") === "levelTwo") 
              return "DarkSlateGray";
            return "white";
          });
          d3.selectAll(".hierarchyText").style("fill", function () {
            if (d3.select(this).attr("id") === "levelTwoText")
              return "white";
            return "black"; 
          });
        }
        d3.select("#levelOneText").text(d3.select("#levelTwoText").text())
        d3.select("#levelTwoText").text(d3.select("#levelThreeText").text())
      } 
      // If second sorting filter was removed
      else if (removedIndex === 1) {
        // Previous focus depth === 2 --> new focus depth === 1
        if (d3.select("#levelTwo").attr("fill") === "DarkSlateGray") {
          d3.selectAll(".hierarchyRect").attr("fill", function () {
            if (d3.select(this).attr("id") === "levelOne") 
              return "DarkSlateGray";
            return "white";
          });
          d3.selectAll(".hierarchyText").style("fill", function () {
            if (d3.select(this).attr("id") === "levelOneText")
              return "white";
            return "black"; 
          });
        }
        // Previous focus depth === 3 --> new focus depth === 2
        else if (d3.select("#levelThree").attr("fill") === "DarkSlateGray") {
          d3.selectAll(".hierarchyRect").attr("fill", function () {
            if (d3.select(this).attr("id") === "levelTwo") 
              return "DarkSlateGray";
            return "white";
          });
          d3.selectAll(".hierarchyText").style("fill", function () {
            if (d3.select(this).attr("id") === "levelTwoText")
              return "white";
            return "black"; 
          });
        }
        d3.select("#levelTwoText").text(d3.select("#levelThreeText").text())
      } 
      // If third sorting filter was removed
      else {
        // Previous focus depth === 3 --> new focus depth === 2
        if (d3.select("#levelThree").attr("fill") === "DarkSlateGray") {
          d3.selectAll(".hierarchyRect").attr("fill", function () {
            if (d3.select(this).attr("id") === "levelTwo") 
              return "DarkSlateGray";
            return "white";
          });
          d3.selectAll(".hierarchyText").style("fill", function () {
            if (d3.select(this).attr("id") === "levelTwoText")
              return "white";
            return "black"; 
          });
        }
      }
      d3.select("#levelThree")
        .style("visibility", "hidden")
        .attr("fill", "white");
      d3.select("#levelThreeText")
        .remove();
    }
    // If 2 filters were selected before removal
    else if (sortingScheme.length === 2) {
      // If first sorting filter was removed
      if (removedIndex === 0) {
        // Previous focus depth === 1 --> new focus depth === 0
        if (d3.select("#levelOne").attr("fill") === "DarkSlateGray") {
          d3.selectAll(".hierarchyRect").attr("fill", "white");
          d3.selectAll(".hierarchyText").style("fill", "black");
        } 
        // Previous focus depth === 2 --> new focus depth === 1
        else {
          d3.selectAll(".hierarchyRect").attr("fill", function () {
            if (d3.select(this).attr("id") === "levelOne") 
              return "DarkSlateGray";
            return "white";
          });
          d3.selectAll(".hierarchyText").style("fill", function () {
            if (d3.select(this).attr("id") === "levelOneText")
              return "white";
            return "black"; 
          });
        }
        d3.select("#levelOneText").text(d3.select("#levelTwoText").text());
      }
      // If second sorting filter was removed
      else {
        d3.selectAll(".hierarchyRect").attr("fill", function () {
          if (d3.select(this).attr("id") === "levelOne") 
            return "DarkSlateGray";
          return "white";
        });
        d3.selectAll(".hierarchyText").style("fill", function () {
          if (d3.select(this).attr("id") === "levelOneText")
            return "white";
          return "black"; 
        });
      }
      d3.select("#levelTwo")
        .style("visibility", "hidden")
        .attr("fill", "white");
      d3.select("#levelTwoText")
        .remove();
    }
    // Only one previous filter, new focus depth always === 0
    else {
      d3.select("#levelOne")
        .style("visibility", "hidden")
        .attr("fill", "white");
      d3.select("#levelOneText")
        .remove();
    }
  }

  function updateHierarchyText(selectId, color) {
    let oldText, updatedText;
    if (!d3.select(selectId).empty()) {
      oldText = d3.select(selectId).text();
      if (force.includes(oldText))
        updatedText = "Force";
      else if (equipment.includes(oldText))
        updatedText = "Equipment";
      else if (difficulty.includes(oldText))
        updatedText = "Difficulty";
      else if (mechanic.includes(oldText))
        updatedText = "Mechanic";
      else 
        updatedText = oldText;
      d3.select(selectId).text(updatedText)
        .style("fill", color);
    }
  }

  // Called when zoom() is called
  function updateHierarchyFocus(newFocus, oldFocus) {
    if (newFocus.depth === 0) {
      d3.selectAll(".hierarchyRect")
        .attr("fill", "white");
      d3.selectAll(".hierarchyText")
        .style("fill", "black");
      updateHierarchyText("#levelOneText");
    }
    else if (newFocus.depth === 1) {
      d3.select("#levelOne").attr("fill", "DarkSlateGray");
      d3.select("#levelTwo").attr("fill", "white");
      d3.select("#levelThree").attr("fill", "white");
      d3.select("#levelFour").attr("fill", "white");
      d3.select("#levelOneText").text(newFocus.data.name)
          .style("fill", "white");
      updateHierarchyText("#levelTwoText", "black");
    } 
    else if (newFocus.depth === 2) {
      d3.select("#levelOne").attr("fill", "white");
      d3.select("#levelTwo").attr("fill", "DarkSlateGray");
      d3.select("#levelThree").attr("fill", "white");
      d3.select("#levelFour").attr("fill", "white");
      d3.select("#levelOneText").text(newFocus.parent.data.name)
        .style("fill", "black");
      d3.select("#levelTwoText").text(newFocus.data.name)
        .style("fill", "white");
      updateHierarchyText("#levelThreeText", "black");
    } 
    else if (newFocus.depth === 3) {
      d3.select("#levelOne").attr("fill", "white");
      d3.select("#levelTwo").attr("fill", "white");
      d3.select("#levelThree").attr("fill", "DarkSlateGray");
      d3.select("#levelFour").attr("fill", "white");
      d3.select("#levelOneText").text(newFocus.parent.parent.data.name)
        .style("fill", "black");
      d3.select("#levelTwoText").text(newFocus.parent.data.name)
        .style("fill", "black");
      d3.select("#levelThreeText").text(newFocus.data.name)
        .style("fill", "white");
      updateHierarchyText("#levelFourText", "black");
    } 
    else if (newFocus.depth === 4) {
      d3.select("#levelOne").attr("fill", "white");
      d3.select("#levelTwo").attr("fill", "white");
      d3.select("#levelThree").attr("fill", "white");
      d3.select("#levelFour").attr("fill", "DarkSlateGray");
      d3.select("#levelOneText").text(newFocus.parent.parent.parent.data.name)
        .style("fill", "black");
      d3.select("#levelTwoText").text(newFocus.parent.parent.data.name)
        .style("fill", "black");
      d3.select("#levelThreeText").text(newFocus.parent.data.name)
        .style("fill", "black");
      d3.select("#levelFourText").text(newFocus.data.name)
        .style("fill", "white");
    }
  }

  // Remove all previous CP chart elements before redrawing
  function removePrevious() {
    d3.select("#circlePackContainer")
      .remove();
    d3.select(".tooltip")
      .remove();
    d3.selectAll(".sortButton")
      .remove();
    d3.selectAll(".sizeButton")
      .remove();
    d3.selectAll(".btn_img")
      .remove();
    d3.selectAll(".sortButtonText")
      .remove();
    d3.selectAll(".btn_order")
      .remove();
    d3.selectAll(".btn_order_text")
      .remove();
    d3.selectAll(".legendContainer")
      .remove();
    d3.selectAll(".legend")
      .remove();
    d3.select("#outerSvg")
      .selectAll(".explainText")
        .remove();
}

  return (
    <div id="toolTipAppender">
      <svg
        id="outerSvg"
        className={props.css}
        ref={svgRef}
        width={width + 10}
        height={height + 10}
      >
        {createHierarchyDisplay()}
      </svg>
    </div>
  );
}
