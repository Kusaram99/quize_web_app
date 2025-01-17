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
import HomePage from "./components/home/Home.jsx";
import ExaminationPage from "./components/examinationpage/ExaminationPage.jsx";
import CandidateLogIn from "./components/candidate_auth/CandidateLogIn.jsx"; 
import ShareLink from "./components/sharelink_component/ShareLink.jsx";
import SuccessfulPage from "./components/examinationpage/SuccessfulPage.jsx";
import Error from "./components/error_component/Error.jsx";
import PDFGenerator from "./components/pdf_generator/PDFGenerator.jsx";
import DashboardHome from "./components/dashboard-home/DashboardHome.jsx";
import PreviewTest from "./components/preview_test/PreviewTest.jsx";

// Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      {/* Root Route */}
      <Route
        path="/"
        element={
          <>
            <HomePage />
            <QuizComponent />
          </>
        }
      />

      {/* Parent Route: /home */}     
      <Route path="/home" element={<App />}>
        {/* Nested Routes under /home */}
        <Route path="/home" element={<DashboardHome/>}/>
        <Route path="authentication" element={<FormContainer />} />
        <Route path="dashboard" element={<DashboardTable />} />
        <Route path="updateacccount" element={<UpdateAccount />} />
        <Route path="create-quiz" element={<QuizComponent />} />
        {/* <Route path="create-quiz" element={<QuizComponent />} /> */}
        <Route path="quiz-preview" element={<PreviewTest />} />
        <Route path="share-link" element={<ShareLink />} />
        <Route path="pdf-generator/:_id" element={<PDFGenerator />} />
      </Route>
      <Route path="/resource/:id" element={<CandidateLogIn />} />
      <Route path="/examinstruction" element={<ExamInstructions />} />
      <Route path="/examination/:id" element={<ExaminationPage />} />
      <Route path="/successful/:id" element={<SuccessfulPage />} />
      <Route path="/error/:id" element={<Error />} />
    </React.Fragment>
  )
);

createRoot(document.getElementById("root")).render( 
    <ApiContextProvider>
      <RouterProvider router={router} />
    </ApiContextProvider> 
);
