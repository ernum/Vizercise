import { useEffect } from "react";
import { GetExerciseById } from "./Functions";
import Link from "next/link";
import { useState } from "react";
import Home from "@/pages";

export default function DetailsList(props) {
<<<<<<< Updated upstream
  useEffect(() => {
    drawTable(props.exerciseId);
  }, [props]);

  function drawTable(exerciseId) {
=======
  const setId = (id) => {
    props.onSetNewId(id);
    props.onSetBoolValue(true);
  };

  function drawTable(exerciseArray) {
    function drawTableRow(exerciseId) {
      const currentId = GetExerciseById(exerciseId).id;

      function removeClickEvent() {
        props.onExerciseRemoval(currentId);
      }

      return (
        <tr className='border-b' key={currentId}>
          <td className='text-center'>
            <button className='text-center' onClick={removeClickEvent}>
              ✖
            </button>{" "}
          </td>
          <td className='px-6 py-4 whitespace-nowrap text-sm text-sky-600 hover:underline font-medium'>
            <button onClick={() => setId(currentId)}>
              {GetExerciseById(exerciseId).name}
            </button>
          </td>
          <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
            {GetExerciseById(exerciseId).equipment}
          </td>
          <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
            {GetExerciseById(exerciseId).difficulty}
          </td>
          <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
            {GetExerciseById(exerciseId).mechanic}
          </td>
          <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
            {GetExerciseById(exerciseId).force}
          </td>
        </tr>
      );
    }

>>>>>>> Stashed changes
    return (
      <div className='flex flex-col'>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
<<<<<<< Updated upstream
            <div className='overflow-hidden'>
              <table className='min-w-full'>
                <thead className='border-b'>
                  <tr>
                    <th
                      scope='col'
                      className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Exercise name
                    </th>
                    <th
                      scope='col'
                      className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Equipment
                    </th>
                    <th
                      scope='col'
                      className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Difficulty
                    </th>
                    <th
                      scope='col'
                      className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Mechanic
                    </th>
                    <th
                      scope='col'
                      className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Force
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='border-b'>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                      <Link
                        href={`/exercise/${GetExerciseById(exerciseId).id}`}>
                        <button>{GetExerciseById(exerciseId).name}</button>
                      </Link>
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                      {GetExerciseById(exerciseId).equipment}
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                      {GetExerciseById(exerciseId).difficulty}
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                      {GetExerciseById(exerciseId).mechanic}
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                      {GetExerciseById(exerciseId).force}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
=======
            <table className='min-w-full'>
              <thead className='border-b'>
                <tr>
                  <th
                    scope='col'
                    className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                    Remove
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                    Exercise name
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                    Equipment
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                    Difficulty
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                    Mechanic
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                    Force
                  </th>
                </tr>
              </thead>
              <tbody>{exerciseArray.map(drawTableRow)}</tbody>
            </table>
>>>>>>> Stashed changes
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>{drawTable(props.exerciseId)}</div>
    </div>
  );
}
