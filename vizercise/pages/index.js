import { useState } from "react";
import BodyMap from "../components/BodyMap";
import DetailsList from "../components/DetailsList";
import CirclePacking from "@/components/CirclePacking";

export default function Home() {
  let [currentMuscle, setCurrentMuscle] = useState(null);
  let [exerciseSelected, setExerciseSelected] = useState(null);

  function onExerciseClicked(exerciseId) {
    setExerciseSelected(exerciseId);
  }

  function onMuscleClicked(muscle) {
    setCurrentMuscle(muscle);
  }

  function ExerciseVisualisation() {
    if (exerciseSelected == null) {
      return (
        <p className="absolute font-montserrat font-normal text-[32px] leading-10 left-[23.6%] top-[41.4%]">
          Please select an exercise
        </p>
      );
    } else {
      return <DetailsList exerciseId={exerciseSelected} />;
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
        <CirclePacking css={"absolute w-[90%] h-[86%] top-[13%] left-[5%]"}/>
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
