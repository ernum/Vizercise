import React, { Component } from "react";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function Detail(props) {
  const [showPosts, setShowPosts] = useState();
  const source = "/scraped-data.json";

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(source); //fetch
      const dataRespons = await response.json(); //store respons(the data) object

      let displayData = dataRespons.map(function (exercise) {
        if (exercise.id == props.id)
          return (
<<<<<<< Updated upstream:vizercise/pages/exercise/[exerciseId].js
            <div key={exercise.id} className='flex h-screen'>
              <div
                className=' flex shadow-2xl bg-white rounded-3xl w-1/4
                 m-auto'>
                <div className='pt-20'>
=======
            <div
              key={exercise.id}
              className='absolute inset-0 flex justify-center items-center bg-opacity-50 z-10 bg-slate-400'>
              <div className='flex shadow-2xl bg-white rounded-3xl h-[85vh] w-1/2 m-auto min-w-min z-20'>
                <div className='overflow-auto p-10 '>
>>>>>>> Stashed changes:vizercise/components/ExerciseDetail.js
                  <iframe
                    className='m-auto rounded-xl'
                    src={exercise.video}
                    width='400px'
                    height='225px'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    title='video'></iframe>
                  <div className='p-20'>
                    <h1 className='text-center p-2 text-3xl text-neutral-600 font-medium'>
                      {exercise.name}
                    </h1>
<<<<<<< Updated upstream:vizercise/pages/exercise/[exerciseId].js
                    <p className='py-2 font-bold text-lg font-lato'>
                      Equipment: {exercise.equipment}{" "}
                    </p>
                    <p className='py-2 font-medium'>
                      Difficulty:{" "}
=======
                    <p className='py-2 font-normal'>
                      <b>Equipment:</b> {exercise.equipment}{" "}
                    </p>
                    <p className='py-2 font-normal'>
                      <b>Difficulty:</b>{" "}
>>>>>>> Stashed changes:vizercise/components/ExerciseDetail.js
                      <span className={difficultyColor(exercise.difficulty)}>
                        {exercise.difficulty}
                      </span>
                    </p>
<<<<<<< Updated upstream:vizercise/pages/exercise/[exerciseId].js
                    <p className='py-2 font-medium'>Grips: {exercise.grips}</p>
                    <p className='py-2 font-medium'>
                      Mechanic: {exercise.mechanic}
                    </p>
                    <p className='py-2 font-medium'>Force: {exercise.force}</p>
                    <p className='py-2 font-medium'>
                      Instructions: {exercise.howTo}
                    </p>
=======
                    <p className='py-2 font-normal'>
                      <b>Grips:</b> {exercise.grips}
                    </p>
                    <p className='py-2 font-normal'>
                      <b>Mechanic:</b> {exercise.mechanic}
                    </p>
                    <p className='py-2 font-normal'>
                      <b>Force:</b> {exercise.force}
                    </p>
                    <p className='py-2 font-normal'>
                      <b>Instructions:</b> {exercise.howTo}
                    </p>
                    <hr />
                    <div className='flex flex-col items-center my-5'>
                      <button
                        onClick={() => props.onSetBoolValue(false)}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full items-center'>
                        Close
                      </button>
                    </div>
>>>>>>> Stashed changes:vizercise/components/ExerciseDetail.js
                  </div>
                </div>
              </div>
            </div>
          );
      });
      setShowPosts(displayData);
    }
    fetchData();
  }, [props]);

  return (
    <div>
      <div>{showPosts}</div>
    </div>
  );
}

function difficultyColor(level) {
  if (level == "Beginner")
    return "bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300";
  else if (level == "Intermediate")
    return "bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300";
  return "bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300";
}
