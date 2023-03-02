import * as d3 from "d3";
import Script from "next/script";
import { useEffect, useState } from "react";
import musclesConst from "@/public/musclesConst";

export default function BodySection(props) {
  const frontMaleEmpty = "/front_male_empty.svg";
  const backMaleEmpty = "/back_male_empty.svg";
  const frontFemaleEmpty = "/front_female_empty.svg";
  const backFemaleEmpty = "/back_female_empty.svg";
  const frontString = "Show back";
  const backString = "Show front";
  const maleString = "Show female";
  const femaleString = "Show male";
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
      fillMuscleOpacityTransition(element, "0.5");
    });
  }, [props.selectedMuscles]);

  useEffect(() => {
    d3.select("div#body_div").selectAll("g").attr("fill", "black");
    d3.select("div#body_div").selectAll("g").attr("fill-opacity", "0");
    d3.select("div#body_div").selectAll("g").attr("isselected", "false");
    props.selectedMuscles.forEach((element) => {
      fillMuscleOpacity(element, "0.5");
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
          fill="black"
          fillOpacity="0"
          isselected="false"
          onMouseEnter={() => fillMuscle("Traps", "g.traps")}
          onMouseLeave={() => unfillMuscle("Traps", "g.traps")}
          onClick={() => handleMuscleClick("Traps", "g.traps")}
        >
          <path d={frontMuscles.traps} />
          <path d={frontMuscles.traps} transform={mirror} />
        </g>
        <g
          className="pecs"
          id="Chest"
          stroke="black"
          fill="black"
          fillOpacity="0"
          isselected="false"
          onMouseEnter={() => fillMuscle("Chest", "g.pecs")}
          onMouseLeave={() => unfillMuscle("Chest", "g.pecs")}
          onClick={() => handleMuscleClick("Chest", "g.pecs")}
        >
          <path d={frontMuscles.pecs} />
          <path d={frontMuscles.pecs} transform={mirror} />
        </g>
        <g
          className="shoulder"
          id="Shoulders"
          stroke="black"
          fill="black"
          fillOpacity="0"
          isselected="false"
          onMouseEnter={() => fillMuscle("Shoulders", "g.shoulder")}
          onMouseLeave={() => unfillMuscle("Shoulders", "g.shoulder")}
          onClick={() => handleMuscleClick("Shoulders", "g.shoulder")}
        >
          <path d={frontMuscles.shoulder} />
          <path d={frontMuscles.shoulder} transform={mirror} />
        </g>
        <g
          className="bicep"
          id="Biceps"
          stroke="black"
          fill="black"
          fillOpacity="0"
          isselected="false"
          onMouseEnter={() => fillMuscle("Biceps", "g.bicep")}
          onMouseLeave={() => unfillMuscle("Biceps", "g.bicep")}
          onClick={() => handleMuscleClick("Biceps", "g.bicep")}
        >
          <path d={frontMuscles.bicep} />
          <path d={frontMuscles.bicep} transform={mirror} />
        </g>
        <g
          className="forearm"
          id="Forearms"
          stroke="black"
          fill="black"
          fillOpacity="0"
          isselected="false"
          onMouseEnter={() => fillMuscle("Forearms", "g.forearm")}
          onMouseLeave={() => unfillMuscle("Forearms", "g.forearm")}
          onClick={() => handleMuscleClick("Forearms", "g.forearm")}
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
          fill="black"
          fillOpacity="0"
          isselected="false"
          onMouseEnter={() => fillMuscle("Obliques", "g.obliques")}
          onMouseLeave={() => unfillMuscle("Obliques", "g.obliques")}
          onClick={() => handleMuscleClick("Obliques", "g.obliques")}
        >
          <path d={frontMuscles.obliques} />
          <path d={frontMuscles.obliques} transform={mirror} />
        </g>
        <g
          className="abs"
          id="Abdominals"
          stroke="black"
          fill="black"
          fillOpacity="0"
          isselected="false"
          onMouseEnter={() => fillMuscle("Abdominals", "g.abs")}
          onMouseLeave={() => unfillMuscle("Abdominals", "g.abs")}
          onClick={() => handleMuscleClick("Abdominals", "g.abs")}
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
          fill="black"
          fillOpacity="0"
          isselected="false"
          onMouseEnter={() => fillMuscle("Quads", "g.quads")}
          onMouseLeave={() => unfillMuscle("Quads", "g.quads")}
          onClick={() => handleMuscleClick("Quads", "g.quads")}
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
          fill="black"
          fillOpacity="0"
          isselected="false"
          onMouseEnter={() => fillMuscle("Calves", "g.calves")}
          onMouseLeave={() => unfillMuscle("Calves", "g.calves")}
          onClick={() => handleMuscleClick("Calves", "g.calves")}
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
          fill="black"
          fillOpacity="0"
          isselected="false"
          onMouseEnter={() => fillMuscle("Traps", "g.traps")}
          onMouseLeave={() => unfillMuscle("Traps", "g.traps")}
          onClick={() => handleMuscleClick("Traps", "g.traps")}
        >
          <path d={backMuscles.traps} />
        </g>
        <g
          className="shoulder"
          id="Shoulders"
          stroke="black"
          fill="black"
          fillOpacity="0"
          isselected="false"
          onMouseEnter={() => fillMuscle("Shoulders", "g.shoulder")}
          onMouseLeave={() => unfillMuscle("Shoulders", "g.shoulder")}
          onClick={() => handleMuscleClick("Shoulders", "g.shoulder")}
        >
          <path d={backMuscles.shoulder} />
          <path d={backMuscles.shoulder} transform={mirror} />
        </g>
        <g
          className="tricep"
          id="Triceps"
          stroke="black"
          fill="black"
          fillOpacity="0"
          isselected="false"
          onMouseEnter={() => fillMuscle("Triceps", "g.tricep")}
          onMouseLeave={() => unfillMuscle("Triceps", "g.tricep")}
          onClick={() => handleMuscleClick("Triceps", "g.tricep")}
        >
          <path d={backMuscles.tricep} />
          <path d={backMuscles.tricep} transform={mirror} />
        </g>
        <g
          className="mid_back"
          id="Traps (mid-back)"
          stroke="black"
          fill="black"
          fillOpacity="0"
          isselected="false"
          onMouseEnter={() => fillMuscle("Traps (mid-back)", "g.mid_back")}
          onMouseLeave={() => unfillMuscle("Traps (mid-back)", "g.mid_back")}
          onClick={() => handleMuscleClick("Traps (mid-back)", "g.mid_back")}
        >
          <path d={backMuscles.mid_back} />
        </g>
        <g
          className="forearm"
          id="Forearms"
          stroke="black"
          fill="black"
          fillOpacity="0"
          isselected="false"
          onMouseEnter={() => fillMuscle("Forearms", "g.forearm")}
          onMouseLeave={() => unfillMuscle("Forearms", "g.forearm")}
          onClick={() => handleMuscleClick("Forearms", "g.forearm")}
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
          fill="black"
          fillOpacity="0"
          isselected="false"
          onMouseEnter={() => fillMuscle("Lats", "g.lats")}
          onMouseLeave={() => unfillMuscle("Lats", "g.lats")}
          onClick={() => handleMuscleClick("Lats", "g.lats")}
        >
          <path d={backMuscles.lats} />
          <path d={backMuscles.lats} transform={mirror} />
        </g>
        <g
          className="lower_back"
          id="Lower back"
          stroke="black"
          fill="black"
          fillOpacity="0"
          isselected="false"
          onMouseEnter={() => fillMuscle("Lower back", "g.lower_back")}
          onMouseLeave={() => unfillMuscle("Lower back", "g.lower_back")}
          onClick={() => handleMuscleClick("Lower back", "g.lower_back")}
        >
          <path d={backMuscles.lower_back} />
        </g>
        <g
          className="glute"
          id="Glutes"
          stroke="black"
          fill="black"
          fillOpacity="0"
          isselected="false"
          onMouseEnter={() => fillMuscle("Glutes", "g.glute")}
          onMouseLeave={() => unfillMuscle("Glutes", "g.glute")}
          onClick={() => handleMuscleClick("Glutes", "g.glute")}
        >
          <path d={backMuscles.glute} />
          <path d={backMuscles.glute} transform={mirror} />
        </g>
        <g
          className="hamstrings"
          id="Hamstrings"
          stroke="black"
          fill="black"
          fillOpacity="0"
          isselected="false"
          onMouseEnter={() => fillMuscle("Hamstrings", "g.hamstrings")}
          onMouseLeave={() => unfillMuscle("Hamstrings", "g.hamstrings")}
          onClick={() => handleMuscleClick("Hamstrings", "g.hamstrings")}
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
          fill="black"
          fillOpacity="0"
          isselected="false"
          onMouseEnter={() => fillMuscle("Calves", "g.calves")}
          onMouseLeave={() => unfillMuscle("Calves", "g.calves")}
          onClick={() => handleMuscleClick("Calves", "g.calves")}
        >
          <path d={backMuscles.calves_inner} />
          <path d={backMuscles.calves_inner} transform={mirror} />
          <path d={backMuscles.calves_outer} />
          <path d={backMuscles.calves_outer} transform={mirror} />
        </g>
      </svg>
    );
  }

  function fillMuscle(inputId, inputClass) {
    d3.selectAll(inputClass)
      .transition()
      .ease(d3.easeLinear)
      .duration(300)
      .attr("fill-opacity", "1")
      .style("cursor", "pointer");
  }

  function fillMuscleColor(inputStr, color) {
    selectHelper(inputStr).attr("fill", color).style("cursor", "pointer");
  }

  function fillMuscleOpacity(inputStr, opacity) {
    selectHelper(inputStr)
      .attr("fill-opacity", opacity)
      .style("cursor", "pointer");
  }

  function fillMuscleOpacityTransition(inputStr, opacity) {
    selectHelper(inputStr)
      .transition()
      .ease(d3.easeLinear)
      .duration(400)
      .attr("fill-opacity", opacity)
      .style("cursor", "pointer");
  }

  function unfillMuscle(inputId, inputClass) {
    (!props.selectedMuscles.includes(inputId) &&
      d3
        .selectAll(inputClass)
        .transition()
        .ease(d3.easeLinear)
        .duration(300)
        .attr("fill-opacity", "0")) ||
      d3
        .selectAll(inputClass)
        .transition()
        .ease(d3.easeLinear)
        .duration(300)
        .attr("fill-opacity", "0.5");
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

  // Set to true if currently false or if there is currently no "isselected" attribute
  function switchIsSelected(inputClass) {
    d3.selectAll(inputClass).attr("isselected") === "false" ||
    !d3.selectAll(inputClass).attr("isselected")
      ? d3.selectAll(inputClass).attr("isselected", "true")
      : d3.selectAll(inputClass).attr("isselected", "false");
  }

  function handleMuscleClick(inputId, inputClass) {
    switchIsSelected(inputClass);
    d3.selectAll(inputClass).attr("isselected") === "false" &&
      d3
        .selectAll(inputClass)
        .transition()
        .ease(d3.easeLinear)
        .duration(400)
        .attr("fill-opacity", "0");
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

  /*  Tried this as a feeble attempt at solving first switch lag (to no avail)
  useEffect(() => {
    drawBack(backFemaleEmpty);
    drawBack(backMaleEmpty);
    drawFront(frontFemaleEmpty);
    drawFront(frontMaleEmpty);
  }, [])
  */

  return (
    <div id="body_div">
      <Script src="https://d3js.org/d3.v7.min.js" />
      <div className="relative grid grid-cols-2 top-8 px-8 gap-x-16">
        <button
          className="bg-black text-white"
          onClick={handleOrientationClick}
        >
          {orientationString}
        </button>

        <button className="bg-black text-white" onClick={handleGenderClick}>
          {genderString}
        </button>
      </div>
      {drawBody(body)}
    </div>
  );
}
