import React from 'react'

import './ExerciseList.scoped.scss';

//Components
import Exercise from '../Exercise/Exercise';

const ExerciseList = ({exercises, handleDelete}) => {
    if (exercises.length === 0) return null;
    return (
        <main>
            <table>
                <thead>
                    <th>Exercise Name</th>
                    <th>Sets</th>
                    <th>Reps</th>
                    <th>Rest Timer</th>
                </thead>
                <tbody>
                    {
                        exercises.map((exercise) => {
                            return (
                                <Exercise key={exercise.id} exercise={exercise} handleDelete={handleDelete} />
                            )
                        })
                    }
                </tbody>
            </table>
        </main>
    )
}

export default ExerciseList
