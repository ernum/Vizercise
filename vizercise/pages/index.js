import { useState, useEffect } from "react";
import BodyMap from "../components/BodyMap";
import DetailsList from "../components/DetailsList";
import CirclePacking from "@/components/CirclePacking";

export default function Home() {
  const [currentMuscle, setCurrentMuscle] = useState(null);
  const [exerciseSelected, setExerciseSelected] = useState(null);
  const [selectedExercises, setSelectedExercises] = useState([]);

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

  function onMuscleClicked(muscle) {
    setCurrentMuscle(muscle);
  }

  function removeExercise(id) {
    setSelectedExercises(selectedExercises.filter(
      exerciseId => exerciseId != id));
  }

  function ExerciseVisualisation() {
    if (exerciseSelected == null) {
      return (
        <p className="absolute font-montserrat font-normal text-[32px] leading-10 left-[23.6%] top-[41.4%]">
          Please select an exercise
        </p>
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
          />
        </div>
      </div>

      {/* Second Box */}
      <div
        className="box-border absolute w-[49.3%] h-[47.1%] left-[48.6%] top-[4%]
        bg-white border-[1px] border-solid border-[##CAC4C4] rounded-[30px] 
        shadown-black/25"
      >
        <CirclePacking 
          css={"z-0 rounded-[30px] absolute w-[100%] h-[100%] top-[0%] left-[0%]"}
          currentMuscle={currentMuscle}
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
