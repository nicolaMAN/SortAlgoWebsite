import React, { useState } from 'react';

import '../styles/menu.css';
import '../styles/sorts.css';
import '../styles/inputs.css';

import { pause, play, shuffle, unfill, fill } from '../svgs/export_svgs';
import * as sort from '../sorting-algorithms/export_all';
import { init } from './utilities';

export let isArrayReset = false;
export let isSortingPaused = false;

const Menu = (props) => {

    const sorts = [
        sort.bubble,
        sort.insertation,
        sort.selection,
        sort.gnome,
        sort.pancake,
        sort.cocktail,
        sort.shell,
        sort.quick,
    ];

    const [disableButtons, setDisableButtons] = useState(false);
    const [stopIcon, setStopIcon] = useState(pause);
    const [strokeIcon, setStrokeIcon] = useState(unfill);
    const [timer, setTimer] = useState(0);

    const handleClick = async (e, func) => {
        if (disableButtons) {
            return;
        }
        setDisableButtons(true);
        let begining, ending;
        new Promise(resolve => resolve(isArrayReset = false, begining = performance.now()))
            .then(
                await func(props.array, props.colors, props.size, props.ms),
                ending = performance.now()
            )
            .then(
                setTimer(ending - begining),
                setDisableButtons(false)
            );
    }

    const PauseButton = () => {
        return <button onClick={() => {
            isSortingPaused = !isSortingPaused
            isSortingPaused ? setStopIcon(play) : setStopIcon(pause);
        }}><img src={stopIcon} alt="stop" /></button>;
    }

    const ShuffleButton = () => {
        return <button onClick={async (e) => {
            init(
                props.array,
                props.colors,
                props.size,
                props.height
            );
            setStopIcon(pause);
            setTimer(0);
            isArrayReset = true;
            isSortingPaused = false;
        }}><img src={shuffle} alt="shuffle" /></button>;
    }

    const SortButtons = () => {
        return <div className="sorts">
            {sorts.map((algorithm, index) => {
                return <button key={index} disabled={disableButtons} onClick={
                    async (e) => handleClick(e, algorithm)
                }>{algorithm.name}</button>;
            })
            }
        </div>;
    }


    return (
        <div className="menu">
            <div className="controls">
                <div className="sliders">
                    <label>lenght: </label>
                    <input
                        disabled={disableButtons}
                        type='range'
                        min={0}
                        max={props.maxStep}
                        value={props.stepIndex}
                        onChange={props.handleChange}
                    />
                    <br />
                    <label>speed: </label>
                    <input
                        disabled={disableButtons}
                        type='range'
                        step={1}
                        min={0}
                        max={1000}
                        value={props.ms}
                        onChange={props.handleDelayChange}
                    />

                </div>
                <PauseButton />
                <ShuffleButton />

                <button onClick={(e) => {
                    props.handleStrokeChange(e);
                    props.stroke ? setStrokeIcon(unfill) : setStrokeIcon(fill);
                }}><img src={strokeIcon} alt="stroke-icon" /></button>
                <p>{timer} ms</p>

            </div>
            <div>
                <SortButtons />
                <div className="more">
                    <h1>SAV</h1>
                    <h3> - Sorting Algorithm Visualizer</h3>
                    <a href="https://github.com/nicolaMAN/SAV">
                        <img
                            src={'http://pngimg.com/uploads/github/github_PNG40.png'}
                            height="50px"
                            alt="github-link"
                        />
                    </a>
                </div>
            </div>

        </div >
    )
}




export default Menu;

