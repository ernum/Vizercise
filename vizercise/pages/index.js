import { useState, useEffect } from "react";
import BodyMap from "../components/BodyMap";
import DetailsList from "../components/DetailsList";
import CirclePacking from "@/components/CirclePacking";

export default function Home() {
  const [exerciseSelected, setExerciseSelected] = useState(null);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedMuscles, setSelectedMuscles] = useState([]);

  // This seems like a bad solution but for some reason I can't get it to work the same
  // way that onMuscleClicked() works (array is not appended to, only replaces the elem)
  useEffect(() => {
    // Could maybe be changed to show some type of "error message" for better user 
    // feedback if user tries to add an exercise that is already in the list instead 
    // of just disallowing it (current implementation).
    exerciseSelected && !(selectedExercises.includes(exerciseSelected)) && 
      setSelectedExercises([exerciseSelected, ...selectedExercises]);
  }, [exerciseSelected]);

  function onExerciseClicked(exerciseId) {
    setExerciseSelected(exerciseId);
  }

  // Adding and removal of selected muscles
  function onMuscleClicked(muscle) {
    if (selectedMuscles.includes(muscle)) {
      setSelectedMuscles(selectedMuscles.filter(
        muscleName => muscleName !== muscle));
    }
    else {
      setSelectedMuscles([... selectedMuscles, muscle]);
    }
  }

  // Removing from list of exercises
  function removeExercise(id) {
    setSelectedExercises(selectedExercises.filter(
      exerciseId => exerciseId != id));
  }

  function ExerciseVisualisation() {
    if (!exerciseSelected) {
      return (
        <div className="h-full flex flex-col text-center items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" opacity="0.4" fill="none" stroke="#696969" viewBox="0 0 24 24" strokeWidth="1.5" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
          </svg>
          <p className="font-montserrat font-normal text-[20px] w-[50%]">
          Please select an exercise
          </p>
        </div>
      );
    } else {
      return (
        <DetailsList 
          selectedExercises={selectedExercises}
          onExerciseRemoval={removeExercise}
        />
      )
    }
  }

  return (
    <div>
      {/* Biggest Box */}
      <div
        className="box-border absolute w-[33%] h-[86.5%] left-[12.2%] top-[4%]
                 bg-white border-[1px] border-solid border-[##CAC4C4] rounded-[30px] 
                 shadown-black/25 overflow-hidden"
      >
        <div>
          <BodyMap
            css={"absolute w-[50%] h-[86%] top-[13%] left-[22%]"}
            onClick={onMuscleClicked}
            selectedMuscles={selectedMuscles}
          />
        </div>
      </div>

      {/* Second Box */}
      <div
        className="box-border absolute w-[49.3%] h-[47.1%] left-[48.6%] top-[4%]
        bg-white border-[1px] border-solid border-[##CAC4C4] rounded-[30px] 
        shadown-black/25 overflow-hidden"
      >
        <CirclePacking   
          css={"z-0 rounded-[30px] absolute w-[100%] h-[100%] top-[0%] left-[0%]"}
          selectedMuscles={selectedMuscles}
          onClick={onExerciseClicked}
        />
        <p className="ml-5 mb-1 bottom-0 left-0 text-xs absolute z-10 font-montserrat font-semibold italic text-amber-900 opacity-60 pointer-events-none">size of circle = popularity by Google <a href='https://searchvolume.io/' target="_blank" rel="noopener noreferrer">search volume</a></p>
      </div>

      {/* Third Box */}
      <div
        className="overflow-auto box-border absolute w-[49.3%] h-[35.1%] left-[48.6%] top-[55.4%]
        bg-white border-[1px] border-solid border-[##CAC4C4] rounded-[30px] 
        shadown-black/25"
      >
        {ExerciseVisualisation()}
      </div>
    </div>
  );
}
