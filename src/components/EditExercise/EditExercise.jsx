import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

//Styles
import './EditExercise.scoped.scss';

const EditExercise = () => {
    const [exercise, setExercise] = useState({
        name: '',
        sets: null,
        reps: null,
        rest: null,
        notes: '',
        muscles: '',
    });
    const navigate = useNavigate();
    //get the id from the params
    const params = useParams();
    const exerciseId = params.id;

    const getExerciseById = (data, id) => {
        const ret = data.filter((item) => {
            return item.id === id;
        });
        return ret[0];
    };

    useEffect(() => {
        const exercises = JSON.parse(localStorage.getItem('exercises'));
        const exercise = getExerciseById(exercises, exerciseId);
        setExercise({
            name: exercise.name,
            sets: exercise.sets,
            reps: exercise.reps,
            rest: exercise.rest,
            notes: exercise.notes,
            muscles: exercise.muscles
        });
    }, [exerciseId]);


    const handleChange = (e) => {
        setExercise({
            ...exercise,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const exercises = JSON.parse(localStorage.getItem('exercises'));
        const exerciseToUpdate = getExerciseById(exercises, exerciseId);
        //Make shallow copies of theM
        let items = [...exercises];
        let item = {...exerciseToUpdate};
        //Set the updated exercise values to the state values
        item.name = exercise.name;
        item.reps = Number(exercise.reps);
        item.sets = Number(exercise.sets);
        item.rest = Number(exercise.rest);
        item.notes = exercise.notes;
        item.muscles = exercise.muscles;
        //Put the updated exercise back to the array at the correct index
        items[items.findIndex(i => i.id === exerciseId)] = item;
        //Set updated localstorage
        window.localStorage.setItem('exercises', JSON.stringify(items));
        navigate('/home');
    };

    return (
        <main className="create-page flex flex-ai-c flex-jc-c" id="create-page">
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
                <button>Update Exercise</button>
            </form>
        </main>
    )
}

export default EditExercise
