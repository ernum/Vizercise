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
  };
  return elementToTransform;
}

function nestByAttributes(attributesArr) {
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
  for (let i = attributesArr.length; i > 0 ; i--) {
    nodeArr[i-1].children.forEach((elem) => {
      elem.children = (i !== attributesArr.length) ? nodeArr[i] : [];
    })
  }
  return nodeArr[0];
}

const attributeTestArr = ["equipment"];

// Nice little helper to find the object depth
const objectDepth = (o) =>
  Object (o) === o ? 1 + Math.max(-1, ...Object.values(o).map(objectDepth)) : 0

function getNestedData(exerciseArray) {
  const nestedStructure = nestByAttributes(["equipment"]);
  const depth = objectDepth(nestedStructure) / 3;

  if (depth === 1) {
    nestedStructure.children.forEach((elem) => {
      const exercises = getExercisesByEquipment(exerciseArray, elem.name);
      elem.children = exercises;
    })
  }
  /*
  else if (depth === 2) {
    nestedStructure.children.forEach((elem) => {
      for (let i = 0; i < elem.children["children"].length; i++) {

      }
    })  
  }
  */
  
  return nestedStructure;
}

const exerciseDataByEquipment = getNestedData(dataReq);

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
  equipmentArray.forEach((elem) => {
    newArray = [...newArray, getExercisesByEquipment(exerciseArray, elem)];
  });
  return newArray;
}

function GetArrayByMechanic(exerciseArray) {
  const equipmentArray = GetUniqueValuesByAttribute("mechanic");
  var newArray = [];
  equipmentArray.forEach((elem) => {
    newArray = [...newArray, getExercisesByMechanic(exerciseArray, elem)];
  });
  return newArray;
}

function GetArrayByForce(exerciseArray) {
  const equipmentArray = GetUniqueValuesByAttribute("force");
  var newArray = [];
  equipmentArray.forEach((elem) => {
    newArray = [...newArray, getExercisesByForce(exerciseArray, elem)];
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
          getNestedData, GetArrayByEquipment, exerciseDataByEquipment };
