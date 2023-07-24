import React from "react";
import {createRoot} from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import "./index.css";
import HomePage from "./Home.jsx";

import GameGenerator from "./memory-challenge";
import TargetSum from "./target-sum";
import StarGame from "./star-matching";
import ColorGame from "./color-match";
import Kanban from "./kanban/"
import TicTacToeGame from "./tic-tac-toe";
import TodoList from "./todo";

const router = createBrowserRouter([
    {
        path: "/star-match",
        element: <StarGame/>,
    },
    {
        path: "/color-match",
        element:<ColorGame/>
    },
    {
        path: "/memory-challenge",
        element: <GameGenerator/>
    },
    {
        path: "/target-sum",
        element: <TargetSum/>
    },
    {
        path: "/kanban",
        element: <Kanban/>
    },
    {
        path: "/tic-tac-toe",
        element: <TicTacToeGame/>
    },
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "/todos",
        element: <TodoList/>
    },
    {
        path: "*",
        element: <h1>404 Not Found</h1>
    }
]);

createRoot(document.getElementById("root")).render(
        <RouterProvider router={router} />
);
