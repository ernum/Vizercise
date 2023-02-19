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

export { GetExercises, GetExerciseById };
