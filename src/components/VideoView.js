import React, { Component } from "react";
import { TableButton } from "./Buttons";
import { GetExerciseById } from "./Functions";
import { useState, useEffect } from "react";

export default function VideoView(props) {
  const arrLength = props.selectedExercises.length;
  var [index, setIndex] = useState(0);

  var videoURL = GetExerciseById(props.selectedExercises[index]).video;
  var exerciseName = GetExerciseById(props.selectedExercises[index]).name;

  function displayVideo() {
    return (
      <div>
        <h1 className='text-center p-2 text-3xl text-neutral-600 font-medium'>
          {exerciseName}
        </h1>
        <iframe
          className='m-auto rounded-xl'
          src={videoURL}
          width='355px'
          height='200px'
          allow='autoplay; encrypted-media'
          allowFullScreen
          title='video'></iframe>
      </div>
    );
  }

  function handleIncrement() {
    if (index !== arrLength - 1) {
      setIndex((previousState) => previousState + 1);
    }
  }

  function handleDecrement() {
    if (index !== 0) {
      setIndex((previousState) => previousState - 1);
    }
  }

  return (
    <div>
      <div className='  m-5'>
        <TableButton
          onSetExerciseOrVideo={props.onSetExerciseOrVideo}
          bool={false}
        />
      </div>

      <div className=' flex flex-row mx-40 justify-center '>
        <button
          onClick={handleDecrement}
          className=' hover:bg-gray-100 text-gray-800 font-bold text-4xl border-gray-400 rounded transition '>
          ⪻
        </button>
        <div className='hover:cursor-default flex shadow-2xl rounded-xl w-1/2 m-auto min-w-min '>
          <div className='relative overflow-auto p-5 '>
            <div>{displayVideo()}</div>
          </div>
        </div>
        <button
          onClick={handleIncrement}
          className=' hover:bg-gray-100 text-gray-800 font-bold text-4xl border-gray-400 rounded transition'>
          ⪼
        </button>
      </div>
    </div>
  );
}
