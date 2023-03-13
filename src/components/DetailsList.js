import { GetExerciseById } from "./Functions";

export default function DetailsList(props) {
  const setId = (id) => {
    props.onSetNewId(id);
    props.onSetBoolValue(true);
  };

  function drawTable(exerciseArray) {
    function drawTableRow(exerciseId) {
      const exercise = GetExerciseById(exerciseId);
      const currentId = GetExerciseById(exerciseId).id;

      function removeClickEvent() {
        props.onExerciseRemoval(currentId);
      }

      return (
        <tr className="border-b" key={currentId}>
          <td className="text-center">
            <button className="text-center" onClick={removeClickEvent}>
              ✖
            </button>{" "}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-sky-600 hover:underline font-medium">
            <button onClick={() => setId(currentId)}>{exercise.name}</button>
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {exercise.equipment}
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {exercise.difficulty}
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {exercise.mechanic}
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {exercise.force}
          </td>
        </tr>
      );
    }

    return (
      <div className="overflow-x-auto flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 font-[NeueHaasDisplay]">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <table className="min-w-full absolute top-0">
              <thead className="border-b bg-[#C0BEDC]">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  ></th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Exercise name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Equipment
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Difficulty
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Mechanic
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Force
                  </th>
                </tr>
              </thead>
              <tbody>{exerciseArray.map(drawTableRow)}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (props.selectedExercises.length === 0) {
    return (
      <div className="h-full flex flex-col text-center items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          opacity="0.4"
          fill="none"
          stroke="#696969"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
          />
        </svg>
        <p className="font-normal text-[20px] w-[50%]">
          Please select an exercise
        </p>
      </div>
    );
  } else {
    return <div>{drawTable(props.selectedExercises)}</div>;
  }
}
