import { useEffect } from "react";
import { GetExerciseById } from "./Functions";

export default function DetailsList(props) {
    useEffect(() => {
        drawTable(props.exerciseId)
    }, [props]);

    function drawTable(exerciseId) {
        return (
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="border-b">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Exercise name
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Equipment
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Difficulty
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Mechanic
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Force
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {GetExerciseById(exerciseId).name}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {GetExerciseById(exerciseId).equipment}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {GetExerciseById(exerciseId).difficulty}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {GetExerciseById(exerciseId).mechanic}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {GetExerciseById(exerciseId).force}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }

    return (
        <div>
            { drawTable(props.exerciseId) }
        </div>
    )
}