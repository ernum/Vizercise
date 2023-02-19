import { useEffect } from "react";
import { GetExerciseById } from "./Functions";

export default function DetailsList(props) {
    useEffect(() => {
        drawTable(props.exerciseId)
    }, [props]);

    function drawTable(exerciseId) {
        return (
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Exercise name</th>
                        <th>Equipment</th>
                        <th>Difficulty</th>
                        <th>Mechanic</th>
                        <th>Force</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{GetExerciseById(exerciseId).name}</td>
                        <td>{GetExerciseById(exerciseId).equipment}</td>
                        <td>{GetExerciseById(exerciseId).difficulty}</td>
                        <td>{GetExerciseById(exerciseId).mechanic}</td>
                        <td>{GetExerciseById(exerciseId).force}</td>
                    </tr>
                </tbody>
            </table>
        )
    }

    return (
        <div>
            { drawTable(props.exerciseId) }
        </div>
    )
}