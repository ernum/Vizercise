const dataReq = require("../../public/scraped-data.json");

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

function transformElementToObject(elementToTransform) {
  elementToTransform = {
    "name": elementToTransform,
    "children": []
  };
  return elementToTransform;
}

function nestByAttributes(exerciseArray, attributesArr) {
  let nodeArr = [];
  attributesArr.forEach((elem) => {
    nodeArr = 
      [...nodeArr,
        {
          "name": elem,
          "children": GetUniqueValuesByAttribute(elem).map(transformElementToObject)
        }
      ]
    })

  if (attributesArr.length > 1) {
    if (attributesArr.length === 3) {
      nodeArr[1].children.forEach((elem) => {
        elem.children = nodeArr[2].children;
      })
    }
    nodeArr[0].children.forEach((elem) => {
      // Deep copies (stringify -> parse) to allow value changes
      elem.children = JSON.parse(JSON.stringify(nodeArr[1].children));
    })
  }

  return nodeArr;
}

const testAttrArray = ["equipment", "force"];

function getNestedData(exerciseArray, attArray) {

  const nestedStructure = nestByAttributes(exerciseArray, attArray);
  const firstSort = nestedStructure[0];
  //const nestCheck = nestByAttributes(dataReq, testAttrArray);
  const nodeArr = nestByAttributes(exerciseArray, attArray);

  const depth = attArray.length;
  const firstLevel = getArrayByAttribute(attArray[0], exerciseArray);

  if (depth === 2) {
    const secondLevel = firstLevel.map((elem) => getArrayByAttribute(attArray[1], elem));
    console.log(nodeArr[0]);
    for (let i = 0; i < nodeArr[0].children.length; i++) {
      for (let j = 0; j < nodeArr[0].children[i].children.length; j++) {
        nodeArr[0].children[i].children[j].children = secondLevel[i][j];
      }
    }
  }

  firstSort.children.forEach((elem) => {
    elem.children = getExercisesByAttribute(attArray[0], exerciseArray, elem.name);
  })
  return firstSort;
}

const exerciseDataByEquipment = getNestedData(dataReq, ["equipment"]);

function getArrayByAttribute(attributeKey, exerciseArray) {
  return (
    (attributeKey === "equipment" && GetArrayByEquipment(exerciseArray)) ||
    (attributeKey === "force" && GetArrayByForce(exerciseArray)) ||
    (attributeKey === "mechanic" && GetArrayByMechanic(exerciseArray))
  )
}

function getExercisesByAttribute(attributeKey, exerciseArray, attributeVal) {
  return (
    (attributeKey === "equipment" && getExercisesByEquipment(exerciseArray, attributeVal)) ||
    (attributeKey === "force" && getExercisesByForce(exerciseArray, attributeVal)) ||
    (attributeKey === "mechanic" && getExercisesByMechanic(exerciseArray, attributeVal))
  );
}

function GetUniqueValuesByAttribute(attribute) {
  var lookup = {};
  var items = dataReq;
  var result = [];
  for (var item, i = 0; item = items[i++];) {
      var name = item[attribute];
      if (!(name in lookup)) {
          lookup[name] = 1;
          result.push(name);
      }
  }
  return ([... new Set(result.flat())]);
}

function GetArrayByEquipment(exerciseArray) {
  const equipmentArray = GetUniqueValuesByAttribute("equipment");
  var newArray = [];
  /*
  equipmentArray.forEach((elem) => {
    newArray = [...newArray, getExercisesByEquipment(exerciseArray, elem)].filter
      (value => Object.keys(value).length !== 0);
  });
  */
  equipmentArray.forEach((elem) => {
    newArray = [...newArray, getExercisesByEquipment(exerciseArray, elem)]
  });
  return newArray;
}

function GetArrayByMechanic(exerciseArray) {
  const equipmentArray = GetUniqueValuesByAttribute("mechanic");
  var newArray = [];
  equipmentArray.forEach((elem) => {
    newArray = [...newArray, getExercisesByMechanic(exerciseArray, elem)]
  });
  return newArray;
}

function GetArrayByForce(exerciseArray) {
  const equipmentArray = GetUniqueValuesByAttribute("force");
  var newArray = [];
  equipmentArray.forEach((elem) => {
    newArray = [...newArray, getExercisesByForce(exerciseArray, elem)]
  });
  return newArray;
}

function getExercisesByEquipment(exerciseArray, equipmentValue) {
  return (
    exerciseArray.filter((exercise) =>
      exercise.equipment === equipmentValue)
  );
}

function getExercisesByMechanic(exerciseArray, mechanicValue) {
  return (
    exerciseArray.filter((exercise) =>
      exercise.mechanic === mechanicValue)
  );
}

function getExercisesByForce(exerciseArray, forceValue) {
  return (
    exerciseArray.filter((exercise) =>
      exercise.force === forceValue)
  );
}

export {  GetExercises, GetExerciseById, GetUniqueValuesByAttribute, 
          getNestedData, GetArrayByEquipment, exerciseDataByEquipment, dataReq };
