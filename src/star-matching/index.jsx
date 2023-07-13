

import styles from "./styles.module.css"

import _ from "lodash"
import React, {Component, PureComponent} from "react"
import {Link} from "react-router-dom";
// STAR MATCH - Final Code

function randomSum(arr, maxSum) {
    const sets = [[]], sums = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0, len = sets.length; j < len; j++) {
            const candidateSet = sets[j].concat(arr[i]);
            const candidateSum = _.sum(candidateSet);
            if (candidateSum <= maxSum) {
                sets.push(candidateSet);
                sums.push(candidateSum);
            }
        }
    }
    return _.sample(sums);
}

const colors = {
    available: '#eee',
    used: 'lightgreen',
    wrong: 'lightcoral',
    selected: 'deepskyblue',
};

class Number extends PureComponent {
    handleClick = () => {
        if (this.props.status !== 'used') {
            this.props.onClick(this.props.number);
        }
    };
    render() {
        return (
            <button
                className={styles.number}
                style={{ backgroundColor: colors[this.props.status] }}
                onClick={this.handleClick}
            >
                {this.props.number}
            </button>
        );
    }
}

export default class StarGame extends Component {
    numbers = _.range(1, 10);
    initialState = () => ({
        randomStars: randomSum(this.numbers, 9),
        selectedNumbers: [],
        usedNumbers: [],
    });

    state = this.initialState();
    selectionIsWrong = false;

    numberClick = (number) => {
        // Select the number
        this.setState((prevState) => {
            let { selectedNumbers, usedNumbers, randomStars } = prevState;
            if (selectedNumbers.indexOf(number) >= 0) {
                // Unselect already selected number
                selectedNumbers = selectedNumbers.filter((sn) => sn !== number);
            } else {
                selectedNumbers = [...selectedNumbers, number];
            }
            const selectedSum = _.sum(selectedNumbers);
            if (selectedSum === randomStars) {
                // Correct picks
                usedNumbers = [...usedNumbers, ...selectedNumbers];
                randomStars = randomSum(_.difference(this.numbers, usedNumbers), 9);
                selectedNumbers = [];
            }
            this.selectionIsWrong = selectedSum > this.state.randomStars;
            this.gameIsDone = usedNumbers.length === this.numbers.length;
            return {
                selectedNumbers,
                usedNumbers,
                randomStars,
            };
        });
    };

    numberStatus(number) {
        if (this.state.usedNumbers.indexOf(number) >= 0) {
            return 'used';
        }

        const isSelected =
            this.state.selectedNumbers.indexOf(number) >= 0;

        if (isSelected) {
            return this.selectionIsWrong ? 'wrong' : 'selected';
        }

        return 'available';
    }

    resetGame = () => {
        this.gameIsDone = false;
        this.setState(this.initialState());
    };

    renderStars() {
        return _.range(this.state.randomStars).map((starIndex) => (
            <div className={styles.star} key={starIndex} />
        ));
    }

    renderPlayAgain() {
        return (
            <div className={styles["game-done"]}>
                <div className={styles.message}>Nice!</div>
                <button onClick={this.resetGame}>Play Again</button>
            </div>
        );
    }

    render() {
        return (
            <>
            <div className="go-back">
                <Link to="/">Go Back</Link>
            </div>
            <h1>Star Match</h1>
            <div className={styles.game}>
                <div className={styles.help}>Pick 1 or more numbers that sum to the number of stars</div>
                <div className={styles.body}>
                    <div className={styles.stars}>
                        {this.gameIsDone ? this.renderPlayAgain() : this.renderStars()}
                    </div>
                    <div className={`${styles["play-numbers"]}`}>
                        {this.numbers.map((number) => {
                            const isUsed = this.state.usedNumbers.indexOf(number) >= 0;
                            const isSelected =
                                this.state.selectedNumbers.indexOf(number) >= 0;
                            const isWrong = this.selectionIsWrong && isSelected;
                            return (
                                <Number
                                    key={number}
                                    number={number}
                                    status={this.numberStatus(number)}
                                    onClick={this.numberClick}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
            </>
        );
    }
}
