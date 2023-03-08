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
            <div
              key={exercise.id}
              onClick={() => props.onSetBoolValue(false)}
              className='hover:cursor-pointer absolute inset-0 flex justify-center items-center bg-opacity-70 z-20 bg-neutral-800'>
              <div className='hover:cursor-default flex shadow-2xl bg-white rounded-3xl h-[85vh] w-1/2 m-auto min-w-min z-20'>
                <div className='relative overflow-auto p-20 '>
                  <div className=' absolute right-5 top-0 my-5'>
                    <button
                      onClick={() => props.onSetBoolValue(false)}
                      className='transition hover:bg-gray-300 font-bold py-2 px-3 rounded-full'>
                      ✖
                    </button>
                  </div>
                  <iframe
                    className='m-auto rounded-xl'
                    src={exercise.video}
                    width='400px'
                    height='225px'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    title='video'></iframe>
                  <div className='p-10'>
                    <h1 className='text-center p-2 text-3xl text-neutral-600 font-medium'>
                      {exercise.name}
                    </h1>
                    <p className='py-2 font-normal'>
                      <b>Equipment:</b> {exercise.equipment}
                    </p>
                    <p className='py-2 font-normal'>
                      <b>Difficulty: </b>
                      <span className={difficultyColor(exercise.difficulty)}>
                        {exercise.difficulty}
                      </span>
                    </p>
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
    return "bg-green-100 text-green-800 text-sm font-medium mr-2 px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-300";
  else if (level == "Intermediate")
    return "bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300";
  return "bg-red-100 text-red-800 text-sm font-medium mr-2 px-2 py-0.5 rounded dark:bg-red-900 dark:text-red-300";
}
