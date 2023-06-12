// TARGET SUM - Final Code
import _ from "lodash"
import React from "react";

import styles from "./styles.module.css"
import {Link} from "react-router-dom";

const colors = {
    new: 'lightblue',
    playing: 'deepskyblue',
    won: 'lightgreen',
    lost: 'lightcoral',
};

const randomNumberBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

class Number extends React.PureComponent {
    handleClick = () => {
        if (this.props.clickable) {
            this.props.onClick(this.props.id);
        }
    };

    render() {
        return (
            <div
                className={styles.number}
                style={{opacity: this.props.clickable ? 1 : 0.3}}
                onClick={this.handleClick}
            >
                {this.props.value}
            </div>
        );
    }
}

class Game extends React.Component {
    state = {
        gameStatus: 'new', // new, playing, won, lost
        remainingSeconds: this.props.initialSeconds,
        selectedIds: [],
    };
    challengeNumbers = Array.from({
        length: this.props.challengeSize,
    }).map(() =>
        randomNumberBetween(...this.props.challengeRange)
    );
    target = _.sum(
        _.sampleSize(this.challengeNumbers, this.props.answerSize)
    );

    componentDidMount() {
        if (this.props.autoPlay) {
            this.startGame();
        }
    }

    componentWillUnmount() {
        console.log("About to unmount Game: ", this.intervalId)
        clearInterval(this.intervalId);
    }

    isNumberAvailable = numberIndex =>
        this.state.selectedIds.indexOf(numberIndex) === -1;

    startGame = () => {
        this.setState({gameStatus: 'playing'}, () => {
            this.intervalId = setInterval(() => {
                this.setState(prevState => {
                    const newRemainingSeconds =
                        prevState.remainingSeconds - 1;
                    if (newRemainingSeconds === 0) {
                        clearInterval(this.intervalId);
                        return {gameStatus: 'lost', remainingSeconds: 0};
                    }
                    return {remainingSeconds: newRemainingSeconds};
                });
            }, 1000);
            console.log("IntervalId: ", this.intervalId);
        });
    };

    selectNumber = numberIndex => {
        this.setState(
            prevState => {
                if (prevState.gameStatus !== 'playing') {
                    return null;
                }
                const newSelectedIds =
                    [...prevState.selectedIds, numberIndex];
                return {
                    selectedIds: newSelectedIds,
                    gameStatus: this.calcGameStatus(newSelectedIds),
                };
            },
            () => {
                if (this.state.gameStatus !== 'playing') {
                    clearInterval(this.intervalId);
                }
            }
        );
    };
    calcGameStatus = newSelectedIds => {
        const sumSelected = newSelectedIds.reduce(
            (acc, curr) => acc + this.challengeNumbers[curr],
            0
        );
        if (newSelectedIds.length !== this.props.answerSize) {
            return 'playing';
        }
        return sumSelected === this.target ? 'won' : 'lost';
    };

    render() {
        const {gameStatus, remainingSeconds} = this.state;
        return (
            <div className={styles.game}>
                <div className={styles.help}>
                    Pick {this.props.answerSize} numbers that sum to the
                    target in {this.props.initialSeconds} seconds
                </div>
                <div
                    className={styles.target}
                    style={{backgroundColor: colors[gameStatus]}}
                >
                    {gameStatus === 'new' ? 'TARGET' : this.target}
                </div>
                <div className={styles["challenge-numbers"]}>
                    {this.challengeNumbers.map((value, index) =>
                        <Number
                            key={index}
                            id={index}
                            value={gameStatus === 'new' ? '?' : value}
                            clickable={this.isNumberAvailable(index)}
                            onClick={this.selectNumber}
                        />
                    )}
                </div>
                <div className={styles.footer}>
                    {gameStatus === 'new' &&
                        <button onClick={this.startGame}>Start</button>
                    }

                    {gameStatus === 'playing' &&
                        <div className={styles["timer-value"]}>{remainingSeconds}</div>
                    }

                    {['won', 'lost'].includes(gameStatus) &&
                        <button onClick={this.props.onPlayAgain}>
                            Play Again
                        </button>
                    }
                </div>
            </div>
        );
    }
}

class GameContainer extends React.Component {
    state = {
        gameId: 1,
    };
    resetGame = () =>
        this.setState(prevState => ({
            gameId: prevState.gameId + 1,
        }));

    render() {
        return (
            <>
                <div className="go-back">
                    <Link to="/">Go Back</Link>
                </div>
                <h1>Target Sum</h1>
                <Game
                    key={this.state.gameId}
                    autoPlay={this.state.gameId > 1}
                    challengeRange={[2, 9]}
                    challengeSize={6}
                    answerSize={4}
                    initialSeconds={15}
                    onPlayAgain={this.resetGame}
                />
            </>
        );
    }
}

export default GameContainer;
