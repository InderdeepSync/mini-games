// COLOR MATCH - Final Code
import React from 'react'
import _ from 'lodash'

import styles from './styles.module.css'
import {Link} from "react-router-dom";
import {IoReturnUpBackOutline} from "react-icons/io5";
import {Helmet} from "react-helmet";
const colors = ['black', 'blue', 'red', 'green', 'yellow'];

const randomColors = () => {
    const meaningWord = _.sample(colors);
    const inkWord = _.sample(colors);
    const inkColor = Math.random() < 0.4 ? meaningWord : _.sample(colors);
    return {
        meaningWord,
        inkWord,
        inkColor,
        meaningInkMatch: meaningWord === inkColor,
    };
};

export default class ColorGame extends React.Component {
    state = {
        gameStatus: 'playing', // Possible other values: correct, wrong
    };

    colorValues = randomColors();

    handleClick = yesClick => {
        this.setState(prevState => {
            if (prevState.gameStatus !== 'playing') {
                return null; // Do nothing.
            }
            const correctClick =
                (this.colorValues.meaningInkMatch ^ yesClick) === 0;
            return {
                gameStatus: correctClick ? 'correct' : 'wrong',
            };
        }, this.resetGameAfterDelay);
    };

    resetGameAfterDelay = () => {
        setTimeout(() => {
            this.colorValues = randomColors();
            this.setState({ gameStatus: 'playing' });
        }, 500);
    };

    render() {
        const {
            meaningWord,
            inkWord,
            inkColor,
        } = this.colorValues;
        const { gameStatus } = this.state;
        return (
            <>
                <Helmet>
                    <title>Color Matching Game</title>
                </Helmet>
            <div className="go-back">
                <Link to="/"><IoReturnUpBackOutline/> Go Back</Link>
            </div>
            <h1>Color Match</h1>
            <div>
                <div className={styles.help}>
                    Does the meaning of the top word match the ink
                    color of the bottom word?
                </div>
                <div className={styles.body}>
                    <div
                        className={`${styles["game-status"]} ${styles[`status-${gameStatus}`]}`}
                    />
                    <div className={styles.meaning}>
                        {meaningWord.toUpperCase()}
                    </div>
                    <div className={styles.ink} style={{ color: inkColor }}>
                        {inkWord.toUpperCase()}
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={() => this.handleClick(true)}>
                            YES
                        </button>
                        <button onClick={() => this.handleClick(false)}>
                            NO
                        </button>
                    </div>
                </div>
            </div>
            </>
        );
    }
}
