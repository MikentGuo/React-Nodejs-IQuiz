import React from 'react'
import { useState, useEffect } from 'react';

const QuizTimer = (props) => {    
    const {initialMinute = 0,initialSeconds = 0, notifyTimerEnd} = props;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [ seconds, setSeconds ] =  useState(initialSeconds);

    useEffect(()=>{
        let myInterval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(myInterval)
                        notifyTimerEnd()
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } 
        }, 1000)

        return ()=> {
            clearInterval(myInterval);
        };
    },[minutes, seconds, notifyTimerEnd]);

    return (
        <div>
        { minutes === 0 && seconds === 0
            ? null            
            : <div>
                <h3>Time left: <span style={{color:"green"}}>{minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</span></h3>
            </div>
        }
        </div>
    )
}

export default QuizTimer;
