const dataReq = require("../public/scraped-data.json");

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


function GetDataOfc(exercisesArray) {
  const dataByEquipment = {
    "name": "exercises",
    "children": [
      {
        "name": "Band",
        "children": []
      },
      {
        "name": "Barbell",
        "children": []
      },
      {
        "name": "Bodyweight",
        "children": []
      },
      {
        "name": "Cable",
        "children": []
      },
      {
        "name": "Dumbbell",
        "children": []
      },
      {
        "name": "Kettlebell",
        "children": []
      },
      {
        "name": "Machine",
        "children": []
      },
      {
        "name": "Plate",
        "children": []
      },
      {
        "name": "Stretch",
        "children": []
      },
      {
        "name": "TRX",
        "children": []
      },
    ]
  };
  const temp = getGroupedData(exercisesArray, "equipment");
  temp.children[0].Band && temp.children[0].Band.forEach((elem) => dataByEquipment.children[0].children.push(elem));
  temp.children[0].Barbell && temp.children[0].Barbell.forEach((elem) => dataByEquipment.children[1].children.push(elem));
  temp.children[0].Bodyweight && temp.children[0].Bodyweight.forEach((elem) => dataByEquipment.children[2].children.push(elem));
  temp.children[0].Cable && temp.children[0].Cable.forEach((elem) => dataByEquipment.children[3].children.push(elem));
  temp.children[0].Dumbbell && temp.children[0].Dumbbell.forEach((elem) => dataByEquipment.children[4].children.push(elem));
  temp.children[0].Kettlebell && temp.children[0].Kettlebell.forEach((elem) => dataByEquipment.children[5].children.push(elem));
  temp.children[0].Machine && temp.children[0].Machine.forEach((elem) => dataByEquipment.children[6].children.push(elem));
  temp.children[0].Plate && temp.children[0].Plate.forEach((elem) => dataByEquipment.children[7].children.push(elem));
  temp.children[0].Stretch && temp.children[0].Stretch.forEach((elem) => dataByEquipment.children[8].children.push(elem));
  temp.children[0].TRX && temp.children[0].TRX.forEach((elem) => dataByEquipment.children[9].children.push(elem));
  return dataByEquipment;
}

const exerciseDataByEquipment = GetDataOfc(dataReq);

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

export {  GetExercises, GetExerciseById, GetUniqueAttributes, 
          GetDataOfc, GetArrayByAttribute, exerciseDataByEquipment, dataReq };
