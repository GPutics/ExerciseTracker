import React, {useState} from 'react'
import { Link } from 'react-router-dom';

//Styles
import './Home.scoped.scss';

//Components
import ExerciseList from '../ExerciseList/ExerciseList'

const Home = () => {
    const [exercises, setExercises] = useState(JSON.parse(localStorage.getItem('exercises')));
    //Handle Delete function -> to be passed down to the Exercise component
    const handleDelete = (id) => {
        const newExercises = exercises.filter((exercise) => exercise.id !== id);
        setExercises(newExercises);
        window.localStorage.setItem('exercises', JSON.stringify(newExercises));
    };

    return (
        <div>
            {exercises === null || exercises.length === 0
                ? <div className="home-text flex flex-col flex-jc-c flex-ai-c">
                    Looks like you haven't added any exercises yet.
                    <Link to='/create-exercise'><button className="mt-xxl">Add Exercise</button></Link>
                </div> 
                : <ExerciseList exercises={exercises} handleDelete={handleDelete} />}
        </div>
    )
}

export default Home;
