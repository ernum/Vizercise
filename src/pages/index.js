import { useState, useEffect } from "react";
import BodySection from "../components/BodySection";
import DetailsList from "../components/DetailsList";
import CirclePacking from "@/src/components/CirclePacking";
import Detail from "../components/ExerciseDetail";

export default function Home() {
  const [exerciseSelected, setExerciseSelected] = useState(null);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [idFromSetId, setnewId] = useState();
  const [isClosed, setBoolValue] = useState();

  function detailPopup() {
    if (isClosed == true)
      return <Detail id={idFromSetId} onSetBoolValue={setBoolValue} />;
    else return "";
  }

  // This seems like a bad solution but for some reason I can't get it to work the same
  // way that onMuscleClicked() works (array is not appended to, only replaces the elem)
  useEffect(() => {
    if (exerciseSelected) {
      if (selectedExercises.includes(exerciseSelected)) {
        removeExercise(exerciseSelected);
      } else {
        setSelectedExercises([exerciseSelected, ...selectedExercises]);
      }
      setExerciseSelected(null);
    }
  }, [exerciseSelected]);

  // Adding and removal of selected muscles
  function onMuscleClicked(muscle) {
    if (selectedMuscles.includes(muscle)) {
      setSelectedMuscles(
        selectedMuscles.filter((muscleName) => muscleName !== muscle)
      );
    } else {
      setSelectedMuscles([...selectedMuscles, muscle]);
    }
  }

  // Removing from list of exercises
  function removeExercise(id) {
    setSelectedExercises(
      selectedExercises.filter((exerciseId) => exerciseId != id)
    );
    setExerciseSelected(null);
  }

  return (
    <div>
      {/*PopUp Box*/}
      <div>{detailPopup()}</div>
      {/* Biggest Box */}
      <div
        className="box-border absolute w-[45%] h-[90%] left-[2%] top-[4%]
                 bg-white border-[1px] border-solid border-[##CAC4C4] rounded-[30px] 
                 shadown-black/25 overflow-hidden"
      >
        <div>
          <BodySection
            onClick={onMuscleClicked}
            selectedMuscles={selectedMuscles}
            selectedExercises={selectedExercises}
          />
        </div>
      </div>

      {/* Second Box */}
      <div
        className="box-border absolute w-[49.3%] h-[52%] left-[48.6%] top-[4%]
        bg-white border-[1px] border-solid border-[##CAC4C4] rounded-[30px] 
        shadown-black/25 overflow-hidden"
      >
        <CirclePacking
          css={"absolute w-[100%] h-[100%] top-[0%]"}
          selectedExercises={selectedExercises}
          selectedMuscles={selectedMuscles}
          onExerciseClick={setExerciseSelected}
        />
      </div>

      {/* Third Box */}
      <div
        className="overflow-auto box-border absolute w-[49.3%] h-[35.1%] left-[48.6%] top-[58.9%]
        bg-white border-[1px] border-solid border-[##CAC4C4] rounded-[30px] 
        shadown-black/25"
      >
        <DetailsList
          selectedExercises={selectedExercises}
          onExerciseRemoval={removeExercise}
          onSetNewId={setnewId}
          onSetBoolValue={setBoolValue}
        />
      </div>
    </div>
  );
}
