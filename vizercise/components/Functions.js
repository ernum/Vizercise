import { group } from "d3";

const dataReq = require("../../viz_scraper/json-pop-1676574356.json");

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

function getGroupedData(attribute) {
  var grouped = groupBy(dataReq, attribute);
  grouped = {"name": "exercises", "children":[grouped]};
  return grouped;
}

const temp = getGroupedData("equipment");

const dataByEquipment = {
  "name": "exercises",
  "children": [
    {
      "name": "Band",
      "children": [temp.children[0].Band]
    },
    {
      "name": "Barbell",
      "children": [temp.children[0].Barbell]
    },
    {
      "name": "Bodyweight",
      "children": [temp.children[0].Bodyweight]
    },
    {
      "name": "Cable",
      "children": [temp.children[0].Cable]
    },
    {
      "name": "Dumbbell",
      "children": [temp.children[0].Dumbbell]
    },
    {
      "name": "Kettlebell",
      "children": [temp.children[0].Kettlebell]
    },
    {
      "name": "Machine",
      "children": [temp.children[0].Machine]
    },
    {
      "name": "Plate",
      "children": [temp.children[0].Plate]
    },
    {
      "name": "Stretch",
      "children": [temp.children[0].Stretch]
    },
    {
      "name": "TRX",
      "children": [temp.children[0].TRX]
    },
  ]
}

function GetUniqueAttributes(attribute) {
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

function GetArrayByAttribute(attribute) {
  const equipmentArray = GetUniqueAttributes(attribute);
  var newArray = [];
  equipmentArray.forEach((elem) => {
    newArray = [...newArray, GetExercisesByEquipment(elem)];
  });
  return newArray;
}

function GetExercisesByEquipment(equipmentArg) {
  return (
    dataReq.filter((exercise) =>
      exercise.equipment === equipmentArg)
  );
}

export {  GetExercises, GetExerciseById, dataByEquipment };
