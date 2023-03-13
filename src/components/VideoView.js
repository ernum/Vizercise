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
  const arr = props.selectedExercises;
  const arrLength = props.selectedExercises.length;
  var [index, setIndex] = useState(0);

  var videoURL = GetExerciseById(props.selectedExercises[index]).video;
  var exerciseName = GetExerciseById(props.selectedExercises[index]).name;
  function slick() {
    return (
      <div className='flex justify-center items-center'>
        {arr.map((NULL, i) => (
          <div
            className={`bg-gray-300 w-2 h-2 m-1 rounded-full
    ${index === i ? "p-2" : ""}`}></div>
        ))}
      </div>
    );
  }

  function displayVideo() {
    return (
      <div className='flex justify-center gap-10 '>
        <button onClick={handleDecrement}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className='  text-gray-400 text-4xl hover:text-gray-800 transition duration-400'
          />
        </button>
        <div className=' shadow-2xl top-0 left-1/4 w-1/2 p-3 rounded-lg'>
          <h1 className='text-center text-2xl text-neutral-600 font-medium'>
            {exerciseName}
          </h1>
          <div className='relative overflow-hidden pt-[56.60%]'>
            <iframe
              className=' absolute top-0 left-0 w-[100%] h-[100%] rounded-xl'
              src={videoURL}
              allow='autoplay; encrypted-media'
              allowFullScreen
              title='video'></iframe>
          </div>

          <div className=' items-end text-center'>{slick()}</div>
        </div>

        <button onClick={handleIncrement}>
          <FontAwesomeIcon
            icon={faChevronRight}
            className=' text-gray-400 text-4xl hover:text-gray-800 transition duration-400'
          />
        </button>
      </div>
    );
  }

  function handleIncrement() {
    if (index !== arrLength - 1) {
      setIndex((previousState) => previousState + 1);
    } else return setIndex(0);
  }

  function handleDecrement() {
    if (index !== 0) {
      setIndex((previousState) => previousState - 1);
    }
  }

  return (
    <>
      <div className=' overflow-auto flex mx-6 my-4 '>
        <div>
          <TableButton
            view={"video"}
            onSetExerciseOrVideo={props.onSetExerciseOrVideo}
            bool={false}
          />
        </div>

        <div className=' flex-auto '>{displayVideo()}</div>
      </div>
    </>
  );
}
