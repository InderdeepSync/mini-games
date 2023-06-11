import * as React from "react";
import {createRoot} from "react-dom/client";
import StarGame from "./star-matching/index.jsx";
import ColorGame from "./color-match/index.jsx";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import GameGenerator from "./memory-challenge/index.jsx";
import TargetSum from "./target-sum/index.jsx";

const router = createBrowserRouter([
    // {
    //     path: "/star-matching",
    //     element: <StarGame/>,
    // },
    {
        path: "/color-matching",
        element:<ColorGame/>
    },
    // {
    //     path: "/memory-challenge",
    //     element: <GameGenerator/>
    // },
    // {
    //     path: "/target-sum",
    //     element: <TargetSum/>
    // }
]);

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
