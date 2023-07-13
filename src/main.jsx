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
import React from "react";

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
        path: "/",
        element: <HomePage/>
    }
]);

createRoot(document.getElementById("root")).render(
        <RouterProvider router={router} />
);
