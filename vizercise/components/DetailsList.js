import { GetExerciseById } from "./Functions";
import Link from "next/link";

export default function DetailsList(props) {

  function drawTable(exerciseArray) {

    function drawTableRow(exerciseId) {

      const currentId = GetExerciseById(exerciseId).id;

      function removeClickEvent() {
        props.onExerciseRemoval(currentId);
      }

      return (
        <tr className='border-b' key={currentId}>
          <td className='items-center'><button className='items-center' onClick={removeClickEvent}>✖</button> </td>
          <td className='px-6 py-4 whitespace-nowrap text-sm text-sky-600 hover:underline font-medium'>
            <Link
              href={`/exercise/${GetExerciseById(exerciseId).id}`}>
              {GetExerciseById(exerciseId).name}
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
      )
    }

    return (
      <div className='overflow-x-auto flex flex-col'>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='overflow-hidden'>
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
                <tbody>
                  {
                    exerciseArray.map(drawTableRow)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div>{drawTable(props.selectedExercises)}</div>
    </div>
  );
}
