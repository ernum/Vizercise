import { data } from "autoprefixer";

function GetExercises(currentMuscle) {
  const dataReq = require("../../viz_scraper/json-pop-1676574356.json");
  return currentMuscle == null
    ? dataReq
    : dataReq.filter((exercise) =>
        exercise.primaryMuscles.includes(currentMuscle)
      );
}

function GetExerciseById(id) {
  const dataReq = require("../../viz_scraper/json-pop-1676574356.json");
  return dataReq[id].name;
}

export { GetExercises, GetExerciseById };
