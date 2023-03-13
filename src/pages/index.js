import { useState, useEffect } from "react";
import BodySection from "../components/BodySection";
import DetailsList from "../components/DetailsList";
import CirclePacking from "@/src/components/CirclePacking";
import Detail from "../components/ExerciseDetail";
//import Link from "next/link";

export default function Home() {
  const [exerciseSelected, setExerciseSelected] = useState(null);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [idFromSetId, setnewId] = useState();
  const [isClosed, setBoolValue] = useState();
  const [showPopup, setShowPopup] = useState(false);

  function detailPopup() {
    if (isClosed == true)
      return <Detail id={idFromSetId} onSetBoolValue={setBoolValue} />;
    else return "";
  }

   function closePopup() {
        setShowPopup(false);
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
          {/* Title and Button */}
          <div className="flex justify-between items-center py-0 px-8">
              <h1 className="text-4xl text-[#E2E1EF]" style={{ fontFamily: "Bandar" }}> Vizercise</h1>
              <button className="bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 font-bold py-1 px-3 rounded" /*style={{fontFamily:}}*/ onClick={() => setShowPopup(true)}>
                  About Us
              </button>
          </div>

      {/*PopUp Box*/}
      <div>{detailPopup()}</div>
      {/* Biggest Box */}
      <div
              className="box-border absolute w-[45%] h-[90%] left-[2%] top-[8%]
                 bg-[#E2E1EF] border-[1px] border-solid border-[##CAC4C4] rounded-[30px]
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
        className="box-border absolute w-[49.3%] h-[52%] left-[48.6%] top-[8%]
        bg-white border-[1px] border-solid border-[##CAC4C4] rounded-[30px] 
        shadown-black/25 overflow-hidden"
      >
        <CirclePacking
          css={"absolute w-[100%] h-[100%] top-[0%]"}
          selectedExercises={selectedExercises}
          selectedMuscles={selectedMuscles}
          onExerciseClick={setExerciseSelected}
        />
        <p className="ml-5 mb-1 bottom-0 left-0 text-xs absolute z-10 font-montserrat font-semibold italic text-amber-900 opacity-60 pointer-events-none">
          size of circle = popularity by Google{" "}
          <a
            href="https://searchvolume.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            search volume
          </a>
        </p>
      </div>

      {/* Third Box */}
      <div
        className="overflow-auto box-border absolute w-[49.3%] h-[35.1%] left-[48.6%] top-[62.9%]
        bg-[#E2E1EF] border-[1px] border-solid border-[##CAC4C4] rounded-[30px]
        shadown-black/25"
      >
        <DetailsList
          selectedExercises={selectedExercises}
          onExerciseRemoval={removeExercise}
          onSetNewId={setnewId}
          onSetBoolValue={setBoolValue}
        />
          </div>
          {/*About Us PopUp Bloc*/}
          {showPopup && (
              <div
                  className="hover:cursor-pointer absolute inset-0 flex justify-center items-center bg-opacity-70 z-20 bg-neutral-800"
                  onClick={closePopup}
              >
                  <div className="hover:cursor-default shadow-2xl bg-[#E2E1EF] rounded-3xl h-[85vh] w-1/2 m-auto min-w-min z-20">
                      <h2 className="text-2xl font-bold mb-2" style={{textAlign: "center"}}>About Us</h2>
                      <p className="text-gray-700 text-base">text</p>
                  </div>
              </div>
          )}
    </div>
  );
}
