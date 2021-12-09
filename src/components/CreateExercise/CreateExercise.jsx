import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';

//Styles
import './CreateExercise.scoped.scss';

const CreateExercise = () => {
    const [exercise, setExercise] = useState({
        name: '',
        sets: null,
        reps: null,
        rest: null,
        notes: '',
        muscles: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setExercise({
            ...exercise,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const newExercise = {
            name: exercise.name,
            sets: Number(exercise.sets),
            reps: Number(exercise.reps),
            rest: Number(exercise.rest),
            notes: exercise.notes,
            muscles: exercise.muscles,
            id: uuidv4(),
        };
        let exercises;
        if(localStorage.getItem('exercises') === null) {
            exercises = [];
        } else {
            exercises = JSON.parse(localStorage.getItem('exercises'));
        }
        exercises.push(newExercise)
        window.localStorage.setItem('exercises', JSON.stringify(exercises));
        navigate('/home');
    };

    return (
        <main className="create-page flex flex-jc-c flex-ai-c" id="create-page">
            <form onSubmit={handleSubmit} className="flex flex-col flex-ai-c flex-jc-c">
                <div className="name flex flex-col">
                    <label htmlFor="name" id="name">Exercise Name</label>
                    <input 
                        type="text" 
                        name="name"
                        id="name" 
                        value={exercise.name} 
                        onChange={handleChange}
                        placeholder="e.g. Push Up"
                    />
                </div>
                <div className="sets-reps-rest flex flex-jc-sb">
                    <div className="sets flex flex-col">
                        <label htmlFor="sets" id="sets">Sets</label>
                        <input 
                            type="number" 
                            name="sets"
                            id="sets" 
                            value={exercise.sets} 
                            onChange={handleChange}
                            placeholder="0"
                        />
                    </div>
                    <div className="reps flex flex-col">
                        <label htmlFor="reps" id="reps">Reps</label>
                        <input 
                            type="number" 
                            name="reps"
                            id="reps" 
                            value={exercise.reps} 
                            onChange={handleChange}
                            placeholder="0"
                        />
                    </div>
                    <div className="rest flex flex-col">
                        <label htmlFor="rest" id="rest">Rest</label>
                        <input 
                            type="number" 
                            name="rest"
                            id="rest" 
                            value={exercise.rest} 
                            onChange={handleChange}
                            placeholder="0"
                        />
                    </div>
                </div>
                <div className="muscles flex flex-col">
                    <label htmlFor="muscles" id=" muslces">Muscles worked</label>
                    <input 
                        type="text"
                        name="muscles"
                        id="muscles"
                        value={exercise.muscles}
                        onChange={handleChange}
                        placeholder="e.g. Chest, Triceps"
                    />
                </div>
                <div className="notes flex flex-col">
                    <label htmlFor="notes" id="notes">Notes</label>
                    <textarea 
                        name="notes" 
                        id="notes" 
                        cols="30" 
                        rows="10"
                        value={exercise.notes} 
                        onChange={handleChange}
                        placeholder="e.g. Personal best: 75"
                    ></textarea>
                </div>
                <button>Add Exercise</button>
            </form>
        </main>
    )
}

export default CreateExercise
