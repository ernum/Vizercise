import React, { Component } from "react";
import VideoView from "../components/VideoView";
import DetailsList from "../components/DetailsList";
import { useState} from "react";


export default function Presenter(props) {
  const [exerciseOrVideo, setExerciseOrVideo] = useState(true);

  function videoOrExercise(bool) {
    if (bool == true)
      return (
        <>
          <DetailsList
            selectedExercises={props.selectedExercises}
            onExerciseRemoval={props.onExerciseRemoval}
            onSetNewId={props.onSetNewId}
            onSetIsClosed={props.onSetIsClosed}
            onSetExerciseOrVideo={setExerciseOrVideo}
          />
        </>
      );
    return (
      <VideoView
        selectedExercises={props.selectedExercises}
        onSetExerciseOrVideo={setExerciseOrVideo}
      />
    );
  }

  return (
    <div>
      <div>{videoOrExercise(exerciseOrVideo)}</div>
    </div>
  );
}
