import React, { Component, useEffect } from "react";
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

  useEffect(() => {
    setIndex(0);
  }, [props]);

  if (arrLength !== 0) {
    var videoURL = GetExerciseById(props.selectedExercises[index]).video;
    var exerciseName = GetExerciseById(props.selectedExercises[index]).name;
  }

  function slick() {
    return (
      <div className='flex justify-center items-center'>
        {arr.map((NULL, i) => (
          <div
            key={i}
            className={`${
              index === i
                ? "bg-gray-500 w-2 h-2 m-1 rounded-full p-2"
                : "bg-gray-500 w-2 h-2 m-1 rounded-full"
            }`}></div>
        ))}
      </div>
    );
  }

  function displayVideo() {
    if (arrLength !== 0) {
      return (
        <div className=' relative justify-evenly flex'>
          <button onClick={handleDecrement}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              className='  text-gray-400 text-4xl hover:text-gray-800 transition duration-400'
            />
          </button>
          <div className=' shadow-2xl w-1/2 p-3 rounded-lg'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>
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
            <hr></hr>
            <div>{slick()}</div>
          </div>

          <button onClick={handleIncrement}>
            <FontAwesomeIcon
              icon={faChevronRight}
              className=' text-gray-400 text-4xl hover:text-gray-800 transition duration-400'
            />
          </button>
        </div>
      );
    } else
      return (
        <div className='m-auto items-center justify-center flex flex-col'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            opacity='0.4'
            fill='none'
            stroke='#696969'
            viewBox='0 0 30 30'
            stroke-width='1.5'
            class='w-12 h-12'>
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z'></path>
          </svg>
          <p class=' font-montserrat font-normal text-[20px] '>
            Please select an exercise
          </p>
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
      <div className='flex  '>
        <div className=' absolute mx-6 my-4 z-10'>
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
