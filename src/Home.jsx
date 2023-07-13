import React from 'react';
import {Link} from "react-router-dom";
// import './HomePage.css';

function HomePage() {
    return (
        <div className="container">
            <ul className="link-list">
                <li>
                    <Link to="/star-match">Star Match</Link>
                </li>
                <li>
                    <Link to="/color-match">Color Match</Link>
                </li>
                <li>
                    <Link to="/target-sum">Target Sum</Link>
                </li>
                <li>
                    <Link to="/memory-challenge">Memory Challenge</Link>
                </li>
                <li>
                    <Link to="/tic-tac-toe">Tic Tac Toe</Link>
                </li>
                <li>
                    <Link to="/kanban">Kanban Board</Link>
                </li>
            </ul>
        </div>
    );
}

export default HomePage;