import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import QuizComponent from "./components/quizzes/QuizComponent.jsx";

// Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/create-quiz" element={<QuizComponent/>} />
      {/* <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogInContainer />} /> */}
      {/* <Route element={<Layouts />}>
        <Route path="todo" element={<FormMainContainer />} />
      </Route> */}
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <RouterProvider router={router} /> 
  </StrictMode>
);
