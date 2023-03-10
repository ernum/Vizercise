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

function GetExerciseById(id) {
  return dataReq[id];
}

/* -- Currently not being used but keeping them here in case need arises later --
function groupBy(objectArray, attribute) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[attribute];
    const curGroup = acc[key] ?? [];
    return { ...acc, [key]: [...curGroup, obj], };
  }, {});
}

function getGroupedData(exercisesArray, attribute) {
  var grouped = groupBy(exercisesArray, attribute);
  grouped = {"name": "exercises", "children":[grouped]};
  return grouped;
}
*/

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
  if (attributeArray.length > 1) {
    if (attributeArray.length === 3) {
      nodeArray[1].children.forEach((elem) => {
        elem.children = JSON.parse(JSON.stringify(nodeArray[2].children));
      });
    }
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
  Returns the root object.
  Maximum depth is 3 with current implementation but can be modified if we would
  like to allow for a bigger depth.
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

function calculateMusclesInvolved(id) {
  let sum = 0;
  const exercise = GetExerciseById(id);
  const muscles = [
    exercise.primaryMuscles,
    exercise.secondaryMuscles,
    exercise.tertiaryMuscles,
  ];

  for (const muscle of muscles) if (muscle) sum += muscle.length;
  return sum;
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
};
