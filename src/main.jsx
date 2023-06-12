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
import HomePage from "./Home.jsx";

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
        path: "/",
        element: <HomePage/>
    }
]);

createRoot(document.getElementById("root")).render(
        <RouterProvider router={router} />
);
