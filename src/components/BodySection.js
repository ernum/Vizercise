import * as d3 from "d3";
import Script from "next/script";
import BodyButton from "./Buttons";
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import {
  GetExerciseById,
  createExplainTextNoD3,
  createButtonNoD3,
  createButtonImage,
} from "./Functions";
import { musclesConst, allMuscles, colourPalette } from "@/public/musclesConst";

export default function BodySection(props) {
  const maleString = "Male";
  const femaleString = "Female";
  const mirror = "translate(330, 0) scale(-1, 1)";

  // musclesConst holds all the different muscle svg paths
  const frontMusclesMale = musclesConst[0];
  const backMusclesMale = musclesConst[1];
  const frontMusclesFemale = musclesConst[2];
  const backMusclesFemale = musclesConst[3];

  const [isMale, setIsMale] = useState(true);

  const [toolTipBack, setToolTipBack] = useState();
  const [toolTipFront, setToolTipFront] = useState();
  const [toolTipMuscle, setToolTipMuscle] = useState();
  const [toolTipExercises, setToolTipExercises] = useState();
  const [musclesHighlighted, setMusclesHighlighted] = useState();

  const genderString = isMale ? maleString : femaleString;
  const frontMuscles = isMale ? frontMusclesMale : frontMusclesFemale;
  const backMuscles = isMale ? backMusclesMale : backMusclesFemale;

  useEffect(() => {
    setToolTipFront(createTooltip("#toolTipFront"));
    setToolTipBack(createTooltip("#toolTipBack"));
  }, []);

  useEffect(() => {
    allMuscles.forEach((muscle) => {
      selectHelper(muscle)
        .transition()
        .ease(d3.easeLinear)
        .duration(200)
        .style(
          "stroke-width",
          props.selectedMuscles.includes(muscle) ? "4" : "1"
        )
        .style("cursor", "pointer");
    });
  }, [props.selectedMuscles]);

  // Heat Map
  useEffect(() => {
    let musclesToHighlight = {};

    for (let exercise of props.selectedExercises) {
      exercise = GetExerciseById(exercise);
      const incValues = [2, 1, 0.5];
      const muscles = [
        exercise.primaryMuscles,
        exercise.secondaryMuscles,
        exercise.tertiaryMuscles,
      ];

      for (let i = 0; i < 3; i++) {
        if (muscles[i]) {
          for (const muscle of muscles[i]) {
            if (!musclesToHighlight[muscle])
              musclesToHighlight[muscle] = incValues[i];
            else if (musclesToHighlight[muscle] < 9)
              musclesToHighlight[muscle] += incValues[i];
          }
        }
      }
    }

    for (const muscle of allMuscles) {
      const sum = musclesToHighlight[muscle] ? musclesToHighlight[muscle] : -1;
      const colour = sum == -1 ? "white" : colourPalette[Math.floor(sum)];

      selectHelper(muscle)
        .classed("pulsing", sum >= 9 ? true : false)
        .transition()
        .ease(d3.easeLinear)
        .duration(300)
        .style("fill", colour);
    }
    // Refresh tooltip
    setToolTipMuscle(null);
    setMusclesHighlighted(musclesToHighlight);
  }, [props.selectedExercises]);

  function drawFront() {
    return (
      <svg
        className="absolute w-[50%] h-[86%] top[13%] left-[5%] bottom-[1%]"
        viewBox="0 0 330 860"
      >
        <g
          className="frontBody"
          id="Front"
          stroke="black"
          strokeWidth={2}
          fill="white"
          fillOpacity="1"
        >
          <path d={frontMuscles.body} />
          <path d={frontMuscles.body} transform={mirror} />
        </g>
        <g
          className="frontFace"
          id="FrontFace"
          stroke="black"
          strokeWidth={2}
          fill="white"
          fillOpacity="1"
        >
          <path d={frontMuscles.face} />
        </g>
        <g
          className="frontHead"
          id="FrontHead"
          stroke="black"
          strokeWidth={2}
          fill="white"
          fillOpacity="1"
        >
          <path d={frontMuscles.head} />
        </g>
        <g
          className="traps"
          id="Traps"
          stroke="black"
          fill="white"
          fillOpacity="1"
          isselected="false"
          onMouseEnter={() => fillMuscle(true, "g.traps")}
          onMouseLeave={() => unfillMuscle(true, "Traps", "g.traps")}
          onMouseMove={(event) => muscleToolTip(true, "Traps", event)}
          onClick={() => handleMuscleClick("Traps")}
        >
          <path d={frontMuscles.traps} />
          <path d={frontMuscles.traps} transform={mirror} />
        </g>
        <g
          className="pecs"
          id="Chest"
          stroke="black"
          fill="white"
          fillOpacity="1"
          isselected="false"
          onMouseEnter={() => fillMuscle(true, "g.pecs")}
          onMouseLeave={() => unfillMuscle(true, "Chest", "g.pecs")}
          onMouseMove={(event) => muscleToolTip(true, "Chest", event)}
          onClick={() => handleMuscleClick("Chest")}
        >
          <path d={frontMuscles.pecs} />
          <path d={frontMuscles.pecs} transform={mirror} />
        </g>
        <g
          className="shoulder"
          id="Shoulders"
          stroke="black"
          fill="white"
          fillOpacity="1"
          isselected="false"
          onMouseEnter={() => fillMuscle(true, "g.shoulder")}
          onMouseLeave={() => unfillMuscle(true, "Shoulders", "g.shoulder")}
          onMouseMove={(event) => muscleToolTip(true, "Shoulders", event)}
          onClick={() => handleMuscleClick("Shoulders")}
        >
          <path d={frontMuscles.shoulder} />
          <path d={frontMuscles.shoulder} transform={mirror} />
        </g>
        <g
          className="bicep"
          id="Biceps"
          stroke="black"
          fill="white"
          fillOpacity="1"
          isselected="false"
          onMouseEnter={() => fillMuscle(true, "g.bicep")}
          onMouseLeave={() => unfillMuscle(true, "Biceps", "g.bicep")}
          onMouseMove={(event) => muscleToolTip(true, "Biceps", event)}
          onClick={() => handleMuscleClick("Biceps")}
        >
          <path d={frontMuscles.bicep} />
          <path d={frontMuscles.bicep} transform={mirror} />
        </g>
        <g
          className="forearm"
          id="Forearms"
          stroke="black"
          fill="white"
          fillOpacity="1"
          isselected="false"
          onMouseEnter={() => fillMuscle(true, "g.forearm")}
          onMouseLeave={() => unfillMuscle(true, "Forearms", "g.forearm")}
          onMouseMove={(event) => muscleToolTip(true, "Forearms", event)}
          onClick={() => handleMuscleClick("Forearms")}
        >
          <path d={frontMuscles.forearm_outer} />
          <path d={frontMuscles.forearm_outer} transform={mirror} />
          <path d={frontMuscles.forearm_inner} />
          <path d={frontMuscles.forearm_inner} transform={mirror} />
          <path d={frontMuscles.forearm_mid} />
          <path d={frontMuscles.forearm_mid} transform={mirror} />
        </g>
        <g
          className="obliques"
          id="Obliques"
          stroke="black"
          fill="white"
          fillOpacity="1"
          isselected="false"
          onMouseEnter={() => fillMuscle(true, "g.obliques")}
          onMouseLeave={() => unfillMuscle(true, "Obliques", "g.obliques")}
          onMouseMove={(event) => muscleToolTip(true, "Obliques", event)}
          onClick={() => handleMuscleClick("Obliques")}
        >
          <path d={frontMuscles.obliques} />
          <path d={frontMuscles.obliques} transform={mirror} />
        </g>
        <g
          className="abs"
          id="Abdominals"
          stroke="black"
          fill="white"
          fillOpacity="1"
          isselected="false"
          onMouseEnter={() => fillMuscle(true, "g.abs")}
          onMouseLeave={() => unfillMuscle(true, "Abdominals", "g.abs")}
          onMouseMove={(event) => muscleToolTip(true, "Abdominals", event)}
          onClick={() => handleMuscleClick("Abdominals")}
        >
          <path d={frontMuscles.abs_1} />
          <path d={frontMuscles.abs_1} transform={mirror} />
          <path d={frontMuscles.abs_2} />
          <path d={frontMuscles.abs_2} transform={mirror} />
          <path d={frontMuscles.abs_3} />
          <path d={frontMuscles.abs_3} transform={mirror} />
          <path d={frontMuscles.abs_4} />
          <path d={frontMuscles.abs_4} transform={mirror} />
        </g>
        <g
          className="quads"
          id="Quads"
          stroke="black"
          fill="white"
          fillOpacity="1"
          isselected="false"
          onMouseEnter={() => fillMuscle(true, "g.quads")}
          onMouseLeave={() => unfillMuscle(true, "Quads", "g.quads")}
          onMouseMove={(event) => muscleToolTip(true, "Quads", event)}
          onClick={() => handleMuscleClick("Quads")}
        >
          <path d={frontMuscles.quad_mid} />
          <path d={frontMuscles.quad_mid} transform={mirror} />
          <path d={frontMuscles.quad_outer} />
          <path d={frontMuscles.quad_outer} transform={mirror} />
          <path d={frontMuscles.quad_inner} />
          <path d={frontMuscles.quad_inner} transform={mirror} />
        </g>
        <g
          className="calves"
          id="Calves"
          stroke="black"
          fill="white"
          fillOpacity="1"
          isselected="false"
          onMouseEnter={() => fillMuscle(true, "g.calves")}
          onMouseLeave={() => unfillMuscle(true, "Calves", "g.calves")}
          onMouseMove={(event) => muscleToolTip(true, "Calves", event)}
          onClick={() => handleMuscleClick("Calves")}
        >
          <path d={frontMuscles.calves_outer} />
          <path d={frontMuscles.calves_outer} transform={mirror} />
          <path d={frontMuscles.calves_inner} />
          <path d={frontMuscles.calves_inner} transform={mirror} />
        </g>
      </svg>
    );
  }

  function drawBack() {
    return (
      <svg
        className="absolute w-[50%] h-[86%] top[13%] left-[45%] bottom-[1%]"
        viewBox="0 0 330 860"
      >
        <g
          className="backBody"
          id="Back"
          stroke="black"
          strokeWidth={2}
          fill="white"
          fillOpacity="1"
        >
          <path d={backMuscles.body} />
          <path d={backMuscles.body} transform={mirror} />
        </g>
        <g
          className="backHead"
          id="BackHead"
          stroke="black"
          strokeWidth={2}
          fill="white"
          fillOpacity="1"
        >
          <path d={backMuscles.head} />
        </g>
        <g
          className="traps"
          id="Traps"
          stroke="black"
          fill="white"
          fillOpacity="1"
          isselected="false"
          onMouseEnter={() => fillMuscle(false, "g.traps")}
          onMouseLeave={() => unfillMuscle(false, "Traps", "g.traps")}
          onMouseMove={(event) => muscleToolTip(false, "Traps", event)}
          onClick={() => handleMuscleClick("Traps")}
        >
          <path d={backMuscles.traps} />
        </g>
        <g
          className="shoulder"
          id="Shoulders"
          stroke="black"
          fill="white"
          fillOpacity="1"
          isselected="false"
          onMouseEnter={() => fillMuscle(false, "g.shoulder")}
          onMouseLeave={() => unfillMuscle(false, "Shoulders", "g.shoulder")}
          onMouseMove={(event) => muscleToolTip(false, "Shoulders", event)}
          onClick={() => handleMuscleClick("Shoulders")}
        >
          <path d={backMuscles.shoulder} />
          <path d={backMuscles.shoulder} transform={mirror} />
        </g>
        <g
          className="tricep"
          id="Triceps"
          stroke="black"
          fill="white"
          fillOpacity="1"
          isselected="false"
          onMouseEnter={() => fillMuscle(false, "g.tricep")}
          onMouseLeave={() => unfillMuscle(false, "Triceps", "g.tricep")}
          onMouseMove={(event) => muscleToolTip(false, "Triceps", event)}
          onClick={() => handleMuscleClick("Triceps")}
        >
          <path d={backMuscles.tricep} />
          <path d={backMuscles.tricep} transform={mirror} />
        </g>
        <g
          className="mid_back"
          id="Traps (mid-back)"
          stroke="black"
          fill="white"
          fillOpacity="1"
          isselected="false"
          onMouseEnter={() => fillMuscle(false, "g.mid_back")}
          onMouseLeave={() =>
            unfillMuscle(false, "Traps (mid-back)", "g.mid_back")
          }
          onMouseMove={(event) =>
            muscleToolTip(false, "Traps (mid-back)", event)
          }
          onClick={() => handleMuscleClick("Traps (mid-back)")}
        >
          <path d={backMuscles.mid_back} />
        </g>
        <g
          className="forearm"
          id="Forearms"
          stroke="black"
          fill="white"
          fillOpacity="1"
          isselected="false"
          onMouseEnter={() => fillMuscle(false, "g.forearm")}
          onMouseLeave={() => unfillMuscle(false, "Forearms", "g.forearm")}
          onMouseMove={(event) => muscleToolTip(false, "Forearms", event)}
          onClick={() => handleMuscleClick("Forearms")}
        >
          <path d={backMuscles.forearm_inner} />
          <path d={backMuscles.forearm_inner} transform={mirror} />
          <path d={backMuscles.forearm_outer} />
          <path d={backMuscles.forearm_outer} transform={mirror} />
          <path d={backMuscles.forearm_mid} />
          <path d={backMuscles.forearm_mid} transform={mirror} />
        </g>
        <g
          className="lats"
          id="Lats"
          stroke="black"
          fill="white"
          fillOpacity="1"
          isselected="false"
          onMouseEnter={() => fillMuscle(false, "g.lats")}
          onMouseLeave={() => unfillMuscle(false, "Lats", "g.lats")}
          onMouseMove={(event) => muscleToolTip(false, "Lats", event)}
          onClick={() => handleMuscleClick("Lats")}
        >
          <path d={backMuscles.lats} />
          <path d={backMuscles.lats} transform={mirror} />
        </g>
        <g
          className="lower_back"
          id="Lower back"
          stroke="black"
          fill="white"
          fillOpacity="1"
          isselected="false"
          onMouseEnter={() => fillMuscle(false, "g.lower_back")}
          onMouseLeave={() => unfillMuscle(false, "Lower back", "g.lower_back")}
          onMouseMove={(event) => muscleToolTip(false, "Lower back", event)}
          onClick={() => handleMuscleClick("Lower back")}
        >
          <path d={backMuscles.lower_back} />
        </g>
        <g
          className="glute"
          id="Glutes"
          stroke="black"
          fill="white"
          fillOpacity="1"
          isselected="false"
          onMouseEnter={() => fillMuscle(false, "g.glute")}
          onMouseLeave={() => unfillMuscle(false, "Glutes", "g.glute")}
          onMouseMove={(event) => muscleToolTip(false, "Glutes", event)}
          onClick={() => handleMuscleClick("Glutes")}
        >
          <path d={backMuscles.glute} />
          <path d={backMuscles.glute} transform={mirror} />
        </g>
        <g
          className="hamstrings"
          id="Hamstrings"
          stroke="black"
          fill="white"
          fillOpacity="1"
          isselected="false"
          onMouseEnter={() => fillMuscle(false, "g.hamstrings")}
          onMouseLeave={() => unfillMuscle(false, "Hamstrings", "g.hamstrings")}
          onMouseMove={(event) => muscleToolTip(false, "Hamstrings", event)}
          onClick={() => handleMuscleClick("Hamstrings")}
        >
          <path d={backMuscles.hamstrings_inner} />
          <path d={backMuscles.hamstrings_inner} transform={mirror} />
          <path d={backMuscles.hamstrings_outer} />
          <path d={backMuscles.hamstrings_outer} transform={mirror} />
        </g>
        <g
          className="calves"
          id="Calves"
          stroke="black"
          fill="white"
          fillOpacity="1"
          isselected="false"
          onMouseEnter={() => fillMuscle(false, "g.calves")}
          onMouseLeave={() => unfillMuscle(false, "Calves", "g.calves")}
          onMouseMove={(event) => muscleToolTip(false, "Calves", event)}
          onClick={() => handleMuscleClick("Calves")}
        >
          <path d={backMuscles.calves_inner} />
          <path d={backMuscles.calves_inner} transform={mirror} />
          <path d={backMuscles.calves_outer} />
          <path d={backMuscles.calves_outer} transform={mirror} />
        </g>
      </svg>
    );
  }

  function fillMuscle(isFront, inputClass) {
    d3.selectAll(inputClass)
      .transition()
      .ease(d3.easeLinear)
      .duration(200)
      .style("stroke-width", "4")
      .style("cursor", "pointer");

    const toolTip = isFront ? toolTipFront : toolTipBack;
    if (toolTip) toolTip.style("visibility", "visible");
  }

  function unfillMuscle(isFront, inputId, inputClass) {
    (!props.selectedMuscles.includes(inputId) &&
      d3
        .selectAll(inputClass)
        .transition()
        .ease(d3.easeLinear)
        .duration(200)
        .style("stroke-width", "1")) ||
      d3
        .selectAll(inputClass)
        .transition()
        .ease(d3.easeLinear)
        .duration(200)
        .style("stroke-width", "4");

    const toolTip = isFront ? toolTipFront : toolTipBack;
    if (toolTip) toolTip.style("visibility", "hidden");
  }

  function muscleToolTip(isFront, inputId, event) {
    function createToolTipList() {
      if (toolTipMuscle != inputId) {
        const sum = musclesHighlighted[inputId]
          ? musclesHighlighted[inputId]
          : -1;
        const listItems = props.selectedExercises
          .map((id) => GetExerciseById(id))
          .filter((exercise) => {
            const muscles = [
              exercise.primaryMuscles,
              exercise.secondaryMuscles,
              exercise.tertiaryMuscles,
            ];

            for (let i = 0; i < 3; i++)
              if (muscles[i])
                for (const muscle of muscles[i])
                  if (muscle == inputId) return true;
            return false;
          })
          .map((exercise) => (
            <li className="ml-6" key={exercise.id}>
              {exercise.name}
            </li>
          ));

        const JSX = (
          <div>
            <p className="font-bold">{inputId}</p>
            <ol className="list-decimal">{listItems}</ol>
            {(sum >= 0.5 && sum < 3 && (
              <p className="font-bold">Status: Low Strain</p>
            )) ||
              (sum >= 3 && sum < 6 && (
                <p className="font-bold">Status: Medium Strain</p>
              )) ||
              (sum >= 6 && sum < 9 && (
                <p className="font-bold">Status: High Strain</p>
              )) ||
              (sum >= 9 && (
                <p className="font-bold">Status: At Risk of Overtraining</p>
              ))}
          </div>
        );

        setToolTipMuscle(inputId);
        setToolTipExercises(ReactDOMServer.renderToStaticMarkup(JSX));
      }
      return toolTipExercises;
    }

    const toolTipOffsetX = 25;
    const toolTipOffsetY = 255;
    const toolTip = isFront ? toolTipFront : toolTipBack;
    const toolTipID = isFront ? "#toolTipFront" : "#toolTipBack";
    const svgRect = d3.select(toolTipID).node().getBoundingClientRect();

    if (toolTip)
      toolTip
        .html(createToolTipList)
        .style("left", event.clientX - svgRect.left - toolTipOffsetX + "px")
        .style("top", event.clientY - svgRect.top + toolTipOffsetY + "px");
  }

  // If's due to d3 selections not too keen on whitespace
  function selectHelper(gMuscleId) {
    let selectString;
    if (gMuscleId === "Lower back") {
      selectString = d3.selectAll("g.lower_back");
    } else if (gMuscleId === "Traps (mid-back)") {
      selectString = d3.selectAll("g.mid_back");
    } else {
      selectString = d3.selectAll("g#" + gMuscleId);
    }
    return selectString;
  }

  function handleMuscleClick(inputId) {
    props.onClick(inputId);
  }

  function createTooltip(id) {
    return d3
      .select(id)
      .append("div")
      .style("class", "tooltip")
      .style("pointer-events", "none")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("position", "absolute")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("font", "12px NeueHaasDisplay")
      .style("z-index", 2);
  }

  // Switch font, fill & image colors on click
  function selectionButtonClickHandler(e) {
    if (
      e.target.id === "unionButton" &&
      props.selectionScheme === "Intersection"
    ) {
      props.onSelectionSchemeButtonClick();
      d3.select("#unionText").style("fill", "white");
      d3.select("#intersectionText").style("fill", "black");
      d3.select("#unionButton")
        .attr("cursor", "default")
        .attr("fill", "DarkSlateGray");
      d3.select("#intersectionButton")
        .attr("cursor", "pointer")
        .attr("fill", "white");
      d3.select("#unionImage").classed("filter-white", true);
      d3.select("#intersectionImage").classed("filter-white", false);
    } else if (
      e.target.id === "intersectionButton" &&
      props.selectionScheme === "Union"
    ) {
      props.onSelectionSchemeButtonClick();
      d3.select("#intersectionText").style("fill", "white");
      d3.select("#unionText").style("fill", "black");
      d3.select("#intersectionButton")
        .attr("cursor", "default")
        .attr("fill", "DarkSlateGray");
      d3.select("#unionButton").attr("cursor", "pointer").attr("fill", "white");
      d3.select("#intersectionImage").classed("filter-white", true);
      d3.select("#unionImage").classed("filter-white", false);
    } else if (
      e.target.id === "muscleSelectionButton" &&
      props.selectOrDeselect === "Deselect"
    ) {
      props.onMuscleSelectionButtonClick();
      d3.select("#muscleSelectionText").text("Select All Muscles");
    } else if (
      e.target.id === "muscleSelectionButton" &&
      props.selectOrDeselect === "Select"
    ) {
      props.onMuscleSelectionButtonClick();
      d3.select("#muscleSelectionText").text("Deselect Muscles");
    }
  }

  // Get expanding text on mouse enter
  function mouseEnterHandler(e) {
    let expandWidth, textToAppend, button, font_color, y, id;
    if (e.target.id === "intersectionButton") {
      expandWidth = 100;
      textToAppend = "Intersection";
      button = d3.select("#intersectionButton");
      font_color = props.selectionScheme === "Intersection" ? "white" : "black";
      y = 73;
      id = "intersectionText";
    } else if (e.target.id === "unionButton") {
      expandWidth = 75;
      textToAppend = "Union";
      button = d3.select("#unionButton");
      font_color = props.selectionScheme === "Union" ? "white" : "black";
      y = 38;
      id = "unionText";
    } else if (e.target.id === "muscleSelectionButton") {
      expandWidth = 130;
      textToAppend =
        props.selectOrDeselect === "Select"
          ? "Select All Muscles"
          : "Deselect Muscles";
      button = d3.select("#unionButton");
      font_color = "black";
      y = 132;
      id = "muscleSelectionText";
    }

    d3.select(e.target).transition().duration(100).attr("width", expandWidth);

    d3.select("#selectionButtonContainer")
      .append("text")
      .text(textToAppend)
      .style("fill", font_color)
      .style("font", "10px NeueHaasDisplay")
      .attr("id", id)
      .attr("class", "selectionButtonText")
      .attr("x", 45)
      .attr("y", y)
      .attr("pointer-events", "none")
      .style("animation", "fadein 0.5s");
  }

  function mouseLeaveHandler(e) {
    d3.select(e.target).transition().duration(200).attr("width", 30);
    d3.select("#selectionButtonContainer")
      .selectAll(".selectionButtonText")
      .remove();
  }

  return (
    <div id="body_div">
      <Script src="https://d3js.org/d3.v7.min.js" />
      <div className="mt-10 flex justify-center">
        <BodyButton
          menuOrientation="left"
          action={() => {
            setIsMale(!isMale);
          }}
          buttonText={genderString}
          optionText={isMale ? femaleString : maleString}
        />
      </div>
      <svg
        className="-translate-y-16"
        id="selectionButtonContainer"
        width={150}
        height={200}
      >
        {createExplainTextNoD3(121, 16, "Get Exercises As", 12, 12, 12, "left")}
        {createButtonNoD3(
          "unionButton",
          12,
          20,
          30,
          30,
          "DarkSlateGray",
          selectionButtonClickHandler,
          null,
          "default",
          mouseEnterHandler,
          mouseLeaveHandler
        )}
        {createButtonImage("unionImage", 16, 24, "/icons/union.svg", 22, 1)}
        {createButtonNoD3(
          "intersectionButton",
          12,
          55,
          30,
          30,
          "white",
          selectionButtonClickHandler,
          null,
          "pointer",
          mouseEnterHandler,
          mouseLeaveHandler
        )}
        {createButtonImage(
          "intersectionImage",
          16,
          59,
          "/icons/intersection.svg",
          22,
          1
        )}
        {createExplainTextNoD3(
          125,
          106,
          "Muscle Selection",
          12,
          106,
          12,
          "left"
        )}
        {createButtonNoD3(
          "muscleSelectionButton",
          12,
          115,
          30,
          30,
          "white",
          selectionButtonClickHandler,
          null,
          "pointer",
          mouseEnterHandler,
          mouseLeaveHandler
        )}
        {createButtonImage(
          "muscleSelectionImage",
          16,
          119,
          "/icons/select.svg",
          22,
          1
        )}
      </svg>
      <div id="toolTipFront">{drawFront()}</div>
      <div id="toolTipBack">{drawBack()}</div>
    </div>
  );
}
