import * as d3 from "d3";
import Script from "next/script";
import BodyButton from "./Buttons";
import { useEffect, useState } from "react";
import { musclesConst, allMuscles, colourPalette } from "@/public/musclesConst";
import { GetExerciseById } from "./Functions";

export default function BodySection(props) {
  const maleString = "Male";
  const femaleString = "Female";
  const mirror = "translate(330, 0) scale(-1, 1)";

  // musclesConst holds all the different muscle svg paths
  const frontMusclesMale = musclesConst[0];
  const backMusclesMale = musclesConst[1];
  const frontMusclesFemale = musclesConst[2];
  const backMusclesFemale = musclesConst[3];

  // the value of body decides what is rendered
  const [isMale, setIsMale] = useState(true);
  const genderString = isMale ? maleString : femaleString;
  const frontMuscles = isMale ? frontMusclesMale : frontMusclesFemale;
  const backMuscles = isMale ? backMusclesMale : backMusclesFemale;

  useEffect(() => {
    props.selectedMuscles.forEach((element) => {
      selectHelper(element)
        .transition()
        .ease(d3.easeLinear)
        .duration(200)
        .style("stroke-width", "3")
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
  }, [props.selectedExercises]);

  function drawFront() {
    return (
      <svg
        className="absolute w-[50%] h-[86%] top[13%] left-[5%]"
            viewBox="0 0 330 860"
      >
        <g
          className="frontBody"
          id="Front"
          stroke="black"
          fill="white"
          fillOpacity="1"
        >
          <path d={frontMuscles.body} />
          <path d={frontMuscles.body} transform={mirror} />
        </g>
        <g
          className="frontHead"
          id="FrontHead"
          stroke="black"
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
          onMouseEnter={() => fillMuscle("g.traps")}
          onMouseLeave={() => unfillMuscle("Traps", "g.traps")}
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
          onMouseEnter={() => fillMuscle("g.pecs")}
          onMouseLeave={() => unfillMuscle("Chest", "g.pecs")}
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
          onMouseEnter={() => fillMuscle("g.shoulder")}
          onMouseLeave={() => unfillMuscle("Shoulders", "g.shoulder")}
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
          onMouseEnter={() => fillMuscle("g.bicep")}
          onMouseLeave={() => unfillMuscle("Biceps", "g.bicep")}
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
          onMouseEnter={() => fillMuscle("g.forearm")}
          onMouseLeave={() => unfillMuscle("Forearms", "g.forearm")}
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
          onMouseEnter={() => fillMuscle("g.obliques")}
          onMouseLeave={() => unfillMuscle("Obliques", "g.obliques")}
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
          onMouseEnter={() => fillMuscle("g.abs")}
          onMouseLeave={() => unfillMuscle("Abdominals", "g.abs")}
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
          onMouseEnter={() => fillMuscle("g.quads")}
          onMouseLeave={() => unfillMuscle("Quads", "g.quads")}
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
          onMouseEnter={() => fillMuscle("g.calves")}
          onMouseLeave={() => unfillMuscle("Calves", "g.calves")}
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
        className="absolute w-[50%] h-[86%] top[13%] left-[45%]"
        viewBox="0 0 330 860"
      >
        <g
          className="backBody"
          id="Back"
          stroke="black"
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
          onMouseEnter={() => fillMuscle("g.traps")}
          onMouseLeave={() => unfillMuscle("Traps", "g.traps")}
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
          onMouseEnter={() => fillMuscle("g.shoulder")}
          onMouseLeave={() => unfillMuscle("Shoulders", "g.shoulder")}
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
          onMouseEnter={() => fillMuscle("g.tricep")}
          onMouseLeave={() => unfillMuscle("Triceps", "g.tricep")}
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
          onMouseEnter={() => fillMuscle("g.mid_back")}
          onMouseLeave={() => unfillMuscle("Traps (mid-back)", "g.mid_back")}
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
          onMouseEnter={() => fillMuscle("g.forearm")}
          onMouseLeave={() => unfillMuscle("Forearms", "g.forearm")}
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
          onMouseEnter={() => fillMuscle("g.lats")}
          onMouseLeave={() => unfillMuscle("Lats", "g.lats")}
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
          onMouseEnter={() => fillMuscle("g.lower_back")}
          onMouseLeave={() => unfillMuscle("Lower back", "g.lower_back")}
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
          onMouseEnter={() => fillMuscle("g.glute")}
          onMouseLeave={() => unfillMuscle("Glutes", "g.glute")}
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
          onMouseEnter={() => fillMuscle("g.hamstrings")}
          onMouseLeave={() => unfillMuscle("Hamstrings", "g.hamstrings")}
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
          onMouseEnter={() => fillMuscle("g.calves")}
          onMouseLeave={() => unfillMuscle("Calves", "g.calves")}
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

  function fillMuscle(inputClass) {
    d3.selectAll(inputClass)
      .transition()
      .ease(d3.easeLinear)
      .duration(200)
      .style("stroke-width", "4")
      .style("cursor", "pointer");
  }

  function unfillMuscle(inputId, inputClass) {
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

  return (
    <div id="body_div">
      <Script src="https://d3js.org/d3.v7.min.js" />
      <div className="relative grid grid-cols-1 top-8 px-60 gap-x-16 pb-16">
        <BodyButton
          menuOrientation="left"
          action={() => {
            setIsMale(!isMale);
          }}
          buttonText={genderString}
          optionText={isMale ? femaleString : maleString}
        />
      </div>
      {drawFront()}
      {drawBack()}
    </div>
  );
}
