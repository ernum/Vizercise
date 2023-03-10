import React, { Component } from "react";
import { TableButton } from "./Buttons";
import { GetExerciseById } from "./Functions";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

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
          width='500px'
          height='282px'
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
          view={"video"}
          onSetExerciseOrVideo={props.onSetExerciseOrVideo}
          bool={false}
        />
      </div>

      <div className=' flex flex-row mx-40 justify-center '>
        <button onClick={handleDecrement}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className=' text-gray-400 text-4xl hover:text-gray-800 transition'
          />
        </button>
        <div className='shadow-2xl rounded-xl m-auto min-w-min p-3'>
          <div>{displayVideo()}</div>
        </div>
        <button onClick={handleIncrement}>
          <FontAwesomeIcon
            icon={faChevronRight}
            className=' text-gray-400 text-4xl hover:text-gray-800 transition'
          />
        </button>
      </div>
    </div>
  );
}
