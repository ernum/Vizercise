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
          css={"absolute w-[90%] h-[86%] top-[13%] left-[5%]"}
          currentMuscle={currentMuscle}
          onClick={onExerciseClicked}
        />
      </div>

      {/* Third Box */}
      <div
        className="box-border absolute w-[49.3%] h-[35.1%] left-[48.6%] top-[55.4%]
        bg-white border-[1px] border-solid border-[##CAC4C4] rounded-[30px] 
        shadown-black/25"
      >
        {ExerciseVisualisation()}
      </div>
    </div>
  );
}
