import { useState } from "react";

export default function Home() {
  let [muscleSelected, setMuscleSelected] = useState(null);
  let [exerciseSelected, setExerciseSelected] = useState(null);

  function FirstVisualisation() {
    return <></>;
  }

  function SecondVisualisation() {
    if (exerciseSelected == null) {
      return (
        <p className="absolute font-montserrat font-normal text-[32px] leading-10 left-[23.6%] top-[41.4%]">
          Please select an exercise
        </p>
      );
    } else {
      // TODO
    }
  }

  return (
    <div>
      {/* Biggest Box */}
      <div
        className="box-border absolute w-[33%] h-[86.5%] left-[12.2%] top-[4%]
                 bg-white border-[1px] border-solid border-[##CAC4C4] rounded-[30px] 
                 shadown-black/25"
      ></div>

      {/* Second Box */}
      <div
        className="box-border absolute w-[49.3%] h-[47.1%] left-[48.6%] top-[4%]
        bg-white border-[1px] border-solid border-[##CAC4C4] rounded-[30px] 
        shadown-black/25"
      ></div>

      {/* Third Box */}
      <div
        className="box-border absolute w-[49.3%] h-[35.1%] left-[48.6%] top-[55.4%]
        bg-white border-[1px] border-solid border-[##CAC4C4] rounded-[30px] 
        shadown-black/25"
      >
        {SecondVisualisation()}
      </div>
    </div>
  );
}
