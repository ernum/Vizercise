import React, { Component } from "react";
import VideoView from "../components/VideoView";
import DetailsList from "../components/DetailsList";
import { useState } from "react";

export default function Presenter(props) {
  const [exerciseOrVideo, setExerciseOrVideo] = useState(true);

  function videoOrExercise(bool) {
    if (bool == true) {
      return (
        <DetailsList
          selectedExercises={props.selectedExercises}
          onExerciseRemoval={props.onExerciseRemoval}
          onSetNewId={props.onSetNewId}
          onSetIsClosed={props.onSetIsClosed}
          onSetExerciseOrVideo={setExerciseOrVideo}
        />
      );
    } else {
      return (
        <VideoView
          selectedExercises={props.selectedExercises}
          onSetExerciseOrVideo={setExerciseOrVideo}
        />
      );
    }
  }

  return <div className="h-full">{videoOrExercise(exerciseOrVideo)}</div>;
}
