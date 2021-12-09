import React, {useState, useEffect ,useRef} from 'react'
import { Link } from 'react-router-dom';

import Countdown from 'react-countdown';

//Styles
import './Exercise.scoped.scss';
import '../../styles/globals.scss';

//Icons
import {IoMdArrowDropdownCircle} from 'react-icons/io';
import {TiTick} from 'react-icons/ti';
import {AiFillMinusCircle, AiFillPlusCircle} from 'react-icons/ai';
import {BsFillStopFill, BsFillPlayFill, BsFillPauseFill} from 'react-icons/bs';

const Exercise = ({exercise, handleDelete}) => {
    const [tableOpen, setTableOpen] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    //State for changing sets count
    const [setsCount, setSetsCount] = useState(exercise.sets);
    //State for changing reps count
    const [repsCount, setRepsCount] = useState(exercise.reps);

    //Ref for countdown api
    const countdownRef = useRef();

    //Perform delete function -> calling the handleDelete function from Home component
    const performDelete = async () => {
        handleDelete(exercise.id);
    };

    //Handler function for sets minus icon
    const handleDecreaseSetsCount = () => {
        let newSetsCount = setsCount - 1;
        if(newSetsCount < 0) newSetsCount = 0;
        setSetsCount(newSetsCount);
    };
    //Handler function for sets plus icon
    const handleIncreaseSetsCount = () => {
        let newSetsCount = setsCount + 1;
        setSetsCount(newSetsCount);
    };
    //Handler function for reps minus icon
    const handleDecreaseRepsCount = () => {
        let newRepsCount = repsCount - 1;
        if(newRepsCount < 0) newRepsCount = 0;
        setRepsCount(newRepsCount);
    }
    //Handler function for reps plus icon
    const handleIncreaseRepsCount = () => {
        let newRepsCount = repsCount + 1;
        setRepsCount(newRepsCount);
    }

    //Handler function for play icon
    const handleStartRest = () => {
        countdownRef.current.api.start();
    };
    //Handler function for stop icon (reset rest timer)
    const handleResetRest = () => {
        countdownRef.current.api.stop();
    };
    //Handlerfunction for pause icon
    const handlePauseRest = () => {
        countdownRef.current.api.pause();
    };

    return (
        <>
            <tr className={"exercise-container " + (isComplete && 'complete')}>
                <td className="dropdown" data-label="Exercise Name">
                    <IoMdArrowDropdownCircle 
                        onClick={() => setTableOpen(!tableOpen)} className="icon dropdown-icon"
                    />
                    <TiTick 
                        onClick={() => setIsComplete(!isComplete)} className="icon tick-icon"
                    />
                    <span className="name">
                        {exercise.name}
                    </span>
                </td>
                <td className="sets" data-label="Sets">
                    <AiFillMinusCircle 
                        className="icon minus-icon"
                        onClick={handleDecreaseSetsCount}
                    />
                    <span className="name">
                        {setsCount}
                    </span>
                    <AiFillPlusCircle 
                        className="icon plus-icon"
                        onClick={handleIncreaseSetsCount}
                    />
                </td>
                <td className="reps" data-label="Reps">
                    <AiFillMinusCircle 
                        className="icon minus-icon"
                        onClick={handleDecreaseRepsCount} 
                    />
                    <span className="name">
                        {repsCount}
                    </span>
                    <AiFillPlusCircle 
                        className="icon plus-icon" 
                        onClick={handleIncreaseRepsCount}
                    />
                </td>
                <td className="rest flex" data-label="Rest Timer">
                    <BsFillPlayFill 
                        className="icon play-icon"
                        onClick={handleStartRest}
                    />
                    <BsFillPauseFill 
                        className="icon pause-icon"
                        onClick={handlePauseRest}
                    />
                    <span className="name">
                        <Countdown 
                            autoStart={false} 
                            date={Date.now() + (exercise.rest * 1000)} 
                            intervalDelay={0} 
                            precision={1} 
                            renderer={props => <div>{props.minutes}m{props.seconds}s</div>} 
                            ref={countdownRef} 
                            // onComplete={handleResetRest}
                        />
                    </span>
                    <BsFillStopFill 
                        className="icon stop-icon"
                        onClick={handleResetRest}
                    />
                </td>
            </tr>
            <tr className={"fold " + (tableOpen && "open")}>
                <td colSpan="7">
                    <div className="fold-content">
                        <div className="text flex flex-jc-sa">
                            <div className="how-to-do">
                                <p className="desc-title">Notes:</p>
                                <p className="desc">{exercise.notes}</p>
                                <div className="buttons flex">
                                    <Link className="editBtn" to={`/exercises/${exercise.id}/edit`}>Edit</Link>
                                    <button className="deleteBtn" onClick={performDelete}>Delete</button>
                                </div>
                            </div>
                            <div className="muscles-worked">
                                <p className="muscles-title">Muscles worked:</p>
                                <p className="muscles">{exercise.muscles}</p>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default Exercise

