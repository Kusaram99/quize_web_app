import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import App from "./App.jsx";
import QuizComponent from "./components/quizzes/QuizComponent.jsx";
import { ApiContextProvider } from "./components/useContexAPI/ContextAPI.jsx";
import FormContainer from "./components/auth_components/FormContainer.jsx";
import DashboardTable from "./components/dashboard_table/DashboardTable.jsx";
import UpdateAccount from "./components/account/UpdateAccount.jsx";
import ExamInstructions from "./components/examinationpage/ExamInstructions.jsx";
import Logo from "./components/home/Logo.jsx";
import ExaminationPage from "./components/examinationpage/ExaminationPage.jsx";
import CandidateLogIn from "./components/candidate_auth/CandidateLogIn.jsx";

// Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      {/* Root Route */}
      <Route
        path="/"
        element={
          <>
            <Logo />
            <QuizComponent />
          </>
        }
      />

      {/* Parent Route: /home */}
      <Route path="/home" element={<App />}>
        {/* Nested Routes under /home */}
        <Route path="authentication" element={<FormContainer />} />
        <Route path="dashboard" element={<DashboardTable />} />
        <Route path="updateacccount" element={<UpdateAccount />} />
        <Route path="create-quiz" element={<QuizComponent />} />
      </Route>
      <Route path="examinstruction" element={<ExamInstructions />} />
      <Route path="/examination" element={<ExaminationPage />} />
      <Route path="/candidatelogin" element={<CandidateLogIn />} />
    </React.Fragment>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApiContextProvider>
      <RouterProvider router={router} />
    </ApiContextProvider>
  </StrictMode>
);
