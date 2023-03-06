import * as d3 from "d3";
import Script from "next/script";
import BodyButton from "./Buttons";
import { useEffect, useState } from "react";
import { musclesConst, allMuscles, colourPalette } from "@/public/musclesConst";
import { GetExerciseById } from "./Functions";

export default function BodySection(props) {
  const frontMaleEmpty = "/front_male_empty.svg";
  const backMaleEmpty = "/back_male_empty.svg";
  const frontFemaleEmpty = "/front_female_empty.svg";
  const backFemaleEmpty = "/back_female_empty.svg";

  const frontString = "Front";
  const backString = "Back";
  const maleString = "Male";
  const femaleString = "Female";

  const mirror = "translate(330, 0) scale(-1, 1)";

  // musclesConst holds all the different muscle svg paths
  const frontMusclesMale = musclesConst[0];
  const backMusclesMale = musclesConst[1];
  const frontMusclesFemale = musclesConst[2];
  const backMusclesFemale = musclesConst[3];

  // the value of body decides what is rendered
  const [body, setBody] = useState(frontMaleEmpty);
  const isMale =
    body === frontMaleEmpty || body === backMaleEmpty ? true : false;
  const isForwardFacing =
    body === frontMaleEmpty || body === frontFemaleEmpty ? true : false;
  const orientationString = isForwardFacing ? frontString : backString;
  const genderString = isMale ? maleString : femaleString;
  const frontMuscles = isMale ? frontMusclesMale : frontMusclesFemale;
  const backMuscles = isMale ? backMusclesMale : backMusclesFemale;

  useEffect(() => {
    props.selectedMuscles.forEach((element) => {
      fillMuscle(element);
    });
  }, [props.selectedMuscles]);

  // Heat Map
  useEffect(() => {
    let musclesToHighlight = {};

    for (const exercise of props.selectedExercises) {
      const muscles = GetExerciseById(exercise).primaryMuscles;
      for (const muscle of muscles) {
        if (!musclesToHighlight[muscle]) musclesToHighlight[muscle] = 1;
        else if (musclesToHighlight[muscle] < 4) musclesToHighlight[muscle]++;
      }
    }

    for (const muscle of allMuscles) {
      if (musclesToHighlight[muscle]) {
        const colour = musclesToHighlight[muscle];
        selectHelper(muscle)
          .transition()
          .ease(d3.easeLinear)
          .duration(300)
          .attr("fill", colourPalette[colour]);
      } else {
        selectHelper(muscle)
          .transition()
          .ease(d3.easeLinear)
          .duration(300)
          .attr("fill", "white");
      }
    }
  }, [props.selectedExercises]);

  useEffect(() => {
    d3.select("div#body_div").selectAll("g").attr("isselected", "false");
    props.selectedMuscles.forEach((element) => {
      fillMuscleStroke(element, "3");
      (element === "Lower back" &&
        d3.selectAll("g.lower_back").attr("isselected", "true")) ||
        (element === "Traps (mid-back)" &&
          d3.selectAll("g.mid_back").attr("isselected", "true")) ||
        d3.selectAll("g#" + element).attr("isselected", "true");
    });
  }, [body]);

  function drawBody(bodyArg) {
    return isForwardFacing ? drawFront(bodyArg) : drawBack(bodyArg);
  }

  function drawFront(bodyArg) {
    return (
      <svg className={props.css} viewBox="0 0 330 860">
        <image href={bodyArg} width="330" height="860" />
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

  function drawBack(bodyArg) {
    return (
      <svg className={props.css} viewBox="0 0 330 860">
        <image href={bodyArg} width="330" height="860" />
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

  function fillMuscleStroke(inputStr, width) {
    selectHelper(inputStr)
      .attr("stroke-width", width)
      .style("cursor", "pointer");
  }

  function fillMuscle(inputClass) {
    d3.selectAll(inputClass)
      .transition()
      .ease(d3.easeLinear)
      .duration(200)
      .style("stroke-width", "3")
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
        .style("stroke-width", "3");
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

  // handles clicks on orientation (show front/back) button
  function handleOrientationClick() {
    if (isMale) {
      isForwardFacing ? setBody(backMaleEmpty) : setBody(frontMaleEmpty);
    } else {
      isForwardFacing ? setBody(backFemaleEmpty) : setBody(frontFemaleEmpty);
    }
  }

  // handles clicks on gender button
  function handleGenderClick() {
    if (isForwardFacing) {
      isMale ? setBody(frontFemaleEmpty) : setBody(frontMaleEmpty);
    } else {
      isMale ? setBody(backFemaleEmpty) : setBody(backMaleEmpty);
    }
  }

  return (
    <div id="body_div">
      <Script src="https://d3js.org/d3.v7.min.js" />
      <div className="relative grid grid-cols-2 top-8 px-8 gap-x-16">
        <BodyButton
          menuOrientation="right"
          action={handleOrientationClick}
          buttonText={orientationString}
          optionText={isForwardFacing ? backString : frontString}
        />

        <BodyButton
          menuOrientation="left"
          action={handleGenderClick}
          buttonText={genderString}
          optionText={isMale ? femaleString : maleString}
        />
      </div>
      {drawBody(body)}
    </div>
  );
}
