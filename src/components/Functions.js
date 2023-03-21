import * as d3 from "d3";

const dataReq = require("../../public/scraped-data.json");

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function GetExercises(currentMuscle) {
  return currentMuscle == null
    ? dataReq
    : dataReq.filter((exercise) =>
        exercise.primaryMuscles.includes(currentMuscle)
      );
}

function getIntersectionExercises(currentMuscle) {
  return currentMuscle == null
    ? dataReq
    : dataReq.filter(
        (exercise) =>
          exercise.primaryMuscles.includes(currentMuscle) ||
          (exercise.secondaryMuscles &&
            exercise.secondaryMuscles.includes(currentMuscle)) ||
          (exercise.tertiaryMuscles &&
            exercise.tertiaryMuscles.includes(currentMuscle))
      );
}

function GetExerciseById(id) {
  return dataReq[id];
}

function transformElementToObject(elementToTransform) {
  elementToTransform = {
    name: elementToTransform,
    children: [],
  };
  return elementToTransform;
}

function nestByAttributes(attributeArray) {
  let nodeArray = [];
  attributeArray.forEach((elem) => {
    nodeArray = [
      ...nodeArray,
      {
        name: elem,
        children: GetUniqueValuesByAttribute(elem).map(
          transformElementToObject
        ),
      },
    ];
  });
  if (attributeArray.length > 3) {
    nodeArray[2].children.forEach((elem) => {
      elem.children = JSON.parse(JSON.stringify(nodeArray[3].children));
    });
  }
  if (attributeArray.length > 2) {
    nodeArray[1].children.forEach((elem) => {
      elem.children = JSON.parse(JSON.stringify(nodeArray[2].children));
    });
  }
  if (attributeArray.length > 1) {
    nodeArray[0].children.forEach((elem) => {
      // Deep copies (stringify -> parse) to allow value changes
      elem.children = JSON.parse(JSON.stringify(nodeArray[1].children));
    });
  }
  return nodeArray;
}

/*  
  Gets the data nested according to order of elements in attributeArray so that
  attributeArray[0] = root and attributeArray[length-1] = leaf.
  Returns the root object. Maximum depth is 4 with current implementation
*/
function getNestedData(exerciseArray, attributeArray) {
  if (attributeArray.length === 0) {
    const rootObject = {
      name: "root",
      children: exerciseArray,
    };
    return rootObject;
  }
  const rootObject = nestByAttributes(attributeArray)[0];
  const depth = attributeArray.length;
  const firstLevel = getArrayByAttribute(attributeArray[0], exerciseArray);

  if (depth > 1) {
    const secondLevel = firstLevel.map((elem) =>
      getArrayByAttribute(attributeArray[1], elem)
    );

    if (depth === 2) {
      for (let i = 0; i < rootObject.children.length; i++) {
        for (let j = 0; j < rootObject.children[i].children.length; j++) {
          rootObject.children[i].children[j].children = secondLevel[i][j];
        }
      }
    } else if (depth === 3) {
      for (let i = 0; i < rootObject.children.length; i++) {
        for (let j = 0; j < rootObject.children[i].children.length; j++) {
          let exercises = getArrayByAttribute(
            attributeArray[2],
            secondLevel[i][j]
          );
          for (
            let k = 0;
            k < rootObject.children[i].children[j].children.length;
            k++
          ) {
            rootObject.children[i].children[j].children[k].children =
              exercises[k];
          }
        }
      }
    } else if (depth === 4) {
      const thirdLevel = secondLevel.map((outerElem) =>
        outerElem.map((innerElem) =>
          getArrayByAttribute(attributeArray[2], innerElem)
        )
      );
      for (let i = 0; i < rootObject.children.length; i++) {
        for (let j = 0; j < rootObject.children[i].children.length; j++) {
          for (
            let k = 0;
            k < rootObject.children[i].children[j].children.length;
            k++
          ) {
            let exercises = getArrayByAttribute(
              attributeArray[3],
              thirdLevel[i][j][k]
            );
            for (
              let l = 0;
              l <
              rootObject.children[i].children[j].children[k].children.length;
              l++
            ) {
              rootObject.children[i].children[j].children[k].children[
                l
              ].children = exercises[l];
            }
          }
        }
      }
    }
  } else {
    rootObject.children.forEach((elem) => {
      elem.children = getExercisesByAttribute(
        attributeArray[0],
        exerciseArray,
        elem.name
      );
    });
  }
  /*  
    Something like this could be used if we want to filter out empty nested categories:
    .filter(value => Object.keys(value).length !== 0);
  */
  return rootObject;
}

const exerciseDataByEquipment = getNestedData(dataReq, ["equipment"]);

function getArrayByAttribute(attributeKey, exerciseArray) {
  return (
    (attributeKey === "equipment" && getArrayByEquipment(exerciseArray)) ||
    (attributeKey === "force" && getArrayByForce(exerciseArray)) ||
    (attributeKey === "mechanic" && getArrayByMechanic(exerciseArray)) ||
    (attributeKey === "difficulty" && getArrayByDifficulty(exerciseArray))
  );
}

function getExercisesByAttribute(attributeKey, exerciseArray, attributeVal) {
  return (
    (attributeKey === "equipment" &&
      getExercisesByEquipment(exerciseArray, attributeVal)) ||
    (attributeKey === "force" &&
      getExercisesByForce(exerciseArray, attributeVal)) ||
    (attributeKey === "mechanic" &&
      getExercisesByMechanic(exerciseArray, attributeVal)) ||
    (attributeKey === "difficulty" &&
      getExercisesByDifficulty(exerciseArray, attributeVal))
  );
}

function GetUniqueValuesByAttribute(attribute) {
  var lookup = {};
  var items = dataReq;
  var result = [];
  for (var item, i = 0; (item = items[i++]); ) {
    var name = item[attribute];
    if (!(name in lookup)) {
      lookup[name] = 1;
      result.push(name);
    }
  }
  return [...new Set(result.flat())];
}

function getArrayByEquipment(exerciseArray) {
  const equipmentArray = GetUniqueValuesByAttribute("equipment");
  var newArray = [];
  equipmentArray.forEach((elem) => {
    newArray = [...newArray, getExercisesByEquipment(exerciseArray, elem)];
  });
  return newArray;
}

function getArrayByMechanic(exerciseArray) {
  const mechanicArray = GetUniqueValuesByAttribute("mechanic");
  var newArray = [];
  mechanicArray.forEach((elem) => {
    newArray = [...newArray, getExercisesByMechanic(exerciseArray, elem)];
  });
  return newArray;
}

function getArrayByForce(exerciseArray) {
  const forceArray = GetUniqueValuesByAttribute("force");
  var newArray = [];
  forceArray.forEach((elem) => {
    newArray = [...newArray, getExercisesByForce(exerciseArray, elem)];
  });
  return newArray;
}

function getArrayByDifficulty(exerciseArray) {
  const difficultyArray = GetUniqueValuesByAttribute("difficulty");
  var newArray = [];
  difficultyArray.forEach((elem) => {
    newArray = [...newArray, getExercisesByDifficulty(exerciseArray, elem)];
  });
  return newArray;
}

function getExercisesByEquipment(exerciseArray, equipmentValue) {
  return exerciseArray.filter(
    (exercise) => exercise.equipment === equipmentValue
  );
}

function getExercisesByMechanic(exerciseArray, mechanicValue) {
  return exerciseArray.filter(
    (exercise) => exercise.mechanic === mechanicValue
  );
}

function getExercisesByForce(exerciseArray, forceValue) {
  return exerciseArray.filter((exercise) => exercise.force === forceValue);
}

function getExercisesByDifficulty(exerciseArray, difficultyValue) {
  return exerciseArray.filter(
    (exercise) => exercise.difficulty === difficultyValue
  );
}

function calculateMusclesInvolved(exercise) {
  let sum = 0;
  const muscles = [
    exercise.primaryMuscles,
    exercise.secondaryMuscles,
    exercise.tertiaryMuscles,
  ];

  for (const muscle of muscles) if (muscle) sum += muscle.length;
  return sum;
}

function createExplainText(
  elemToAppendTo,
  textToCreate,
  xOffset,
  yOffset,
  fontSize
) {
  d3.select(elemToAppendTo)
    .append("text")
    .text(textToCreate)
    .style("font", "NeueHaasDisplay")
    .attr("class", "explainText")
    .attr("x", xOffset)
    .attr("y", yOffset)
    .attr("text-anchor", "left")
    .attr("fill", "black")
    .attr("font-size", fontSize)
    .attr("font-weight", "bold")
    .attr("font-variant", "small-caps")
    .attr("pointer-events", "none");
}

function createExplainTextNoD3(
  svgW,
  svgH,
  textToCreate,
  xOffset,
  yOffset,
  fontSize,
  anchor
) {
  return (
    <svg width={svgW} height={svgH}>
      <text
        className="explainText"
        fontStyle={"NeueHaasDisplay"}
        textAnchor={anchor}
        x={xOffset}
        y={yOffset}
        fill={"black"}
        fontSize={fontSize}
        fontWeight={"bold"}
        fontVariant={"small-caps"}
        pointerEvents={"none"}
      >
        {textToCreate}
      </text>
    </svg>
  );
}

function createButtonNoD3(
  id,
  x,
  y,
  width,
  height,
  fillColor,
  clickHandler,
  pointerEvents,
  cursorType,
  mouseEnterHandler,
  mouseLeaveHandler
) {
  return (
    <rect
      className="buttonRect"
      id={id}
      cursor={cursorType}
      x={x}
      y={y}
      rx={10}
      width={width}
      height={height}
      fill={fillColor}
      pointerEvents={pointerEvents}
      opacity={0.6}
      onClick={clickHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    />
  );
}

function createButtonImage(id, x, y, imgPath, height, opacity) {
  return (
    <image
      className={id === "unionImage" ? "button_img filter-white" : "button_img"}
      id={id}
      xlinkHref={imgPath}
      x={x}
      y={y}
      height={height}
      pointerEvents={"none"}
      opacity={opacity}
    />
  );
}

function createMouseOverText(textToShow, expandWidth, fontColor) {
  return (
    <text
      className="expandText"
      fill={fontColor}
      fontStyle={"10px NeueHaasDisplay"}
      cursor={"default"}
      pointerEvents={"none"}
    >
      {textToShow}
    </text>
  );
}

export {
  classNames,
  GetExercises,
  GetExerciseById,
  GetUniqueValuesByAttribute,
  getNestedData,
  exerciseDataByEquipment,
  calculateMusclesInvolved,
  dataReq,
  createExplainText,
  createExplainTextNoD3,
  createButtonNoD3,
  createButtonImage,
  createMouseOverText,
  getIntersectionExercises,
};
