import React, { useState, useEffect } from "react";
import axios from "axios";
import Clothing from "./Clothing";

function Score() {

    const [scores, setScores] = useState({
        mono: 0,
        analog: 0,
        comp: 0
    });

    //Generates a unique key for each clothing.
    const generateKey = (data, title) => {
        return `${title}${ data }_${ new Date().getTime() }`;
    }

    //Gets the outfit that the user wants to calculate for from local storage
    const getOutfit = () => {
        const outfit = JSON.parse(localStorage.getItem('outfit'));
        return outfit;
    }

    //Computes and sets appropriate scores for each scheme.
    const computeScores = (scores) => {
        let scoresList = scores;
        for (let i = 0; i < scoresList.length; i++) {
            if (scoresList[i] < 50) {
                scoresList[i] = 100;
            } else if (scoresList[i] > 550) {
                scoresList[i] = 0;
            } else {
                let sc = scoresList[i];
                scoresList[i] = Math.floor((500 - sc) / 5);
            }
        }
        setScores({
            mono: scoresList[0],
            analog: scoresList[1],
            comp: scoresList[2]
        });
    }

    useEffect( () => {
        const getScore = async () => {
            const outfit = getOutfit();
            const result = await axios.post('/score', {
                outfit: outfit
            })
            let data = result.data;
            computeScores([data.mono, data.analog, data.comp]);
        }
        getScore();
    }, [])

    return (
        <div className="score-page">
            <div className='outfit'> 
                {getOutfit().map(clothing => {
                    return (<Clothing 
                        key={generateKey(clothing, clothing.label)}
                        type={clothing.type}
                        label={clothing.label}
                        color={clothing.color}
                        showDelete={false}
                    />)
                })}
            </div>
            <h2>
                Monochromatic score: {scores.mono}
            </h2>
            <h2>
                Analogous score: {scores.analog}
            </h2>
            <h2>
                Complementary score: {scores.comp}
            </h2>

        </div>
    )
}

export default Score;

/*  */