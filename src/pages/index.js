import { useState, useEffect } from "react";
import BodySection from "../components/BodySection";
import DetailsList from "../components/DetailsList";
import CirclePacking from "@/src/components/CirclePacking";
import Detail from "../components/ExerciseDetail";
import About from "./about"
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

      <div className="font-[NeueHaasDisplay] tracking-wider">
          {/* Title and Button */}
          <div className="flex justify-between items-center py-0 px-8 w-full absolute w-[100%] h-[4%] left-[0%] top-[1%]">
              <div className="flex-grow-0">
                  <h1 className="text-4xl sm:text-2xl md:text-3xl lg:text-4xl text-[#E2E1EF]" style={{ fontFamily: "Bandar" }}>
                      Vizercise
                  </h1>
              </div>
              <div className="flex-grow-0">
                  <button className="bg-gray-100 hover:bg-gray-200 text-sm sm:text-xs md:text-sm lg:text-base text-gray-700 font-bold py-1 px-3 rounded" onClick={() => setShowPopup(true)}>
                      About Us
                  </button>
              </div>
          </div>

      {/*PopUp Box*/}
      <div>{detailPopup()}</div>
      {/* Biggest Box */}
      <div
              className="box-border absolute w-[45%] h-[90%] left-[2%] top-[7%]
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
        className="box-border absolute w-[49.3%] h-[52%] left-[48.6%] top-[7%]
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

        className="overflow-auto box-border absolute w-[49.3%] h-[35.1%] left-[48.6%] top-[61.9%]

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
                  <div className="hover:cursor-default shadow-2xl bg-[#E2E1EF] rounded-3xl h-[85vh] w-1/2 m-auto min-w-min z-20 overflow-y-scroll" style={{ direction: 'rtl'}}
                  >
                      <style>
                          {`::-webkit-scrollbar { direction: rtl; background: transparent; width: 0px }`}
                      </style>
                      <About/>
                  </div>
              </div>
          )}
    </div>
  );
}
