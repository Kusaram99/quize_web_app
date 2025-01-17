import React, { useEffect, useState } from "react";
import {
  useParams,
  useNavigate, 
  useSearchParams,
} from "react-router-dom";
import { getExamData } from "./examsRequestHandler"; 

const ExamInstructions = () => {
  const [isLoading, setIsloading] = useState(true);
  const [examData, setExamData] = useState({});
  const params = useParams(); 
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  // const locationData = useLocation(); 

  // start exam button click handler
  const startExam = () => {
    alert("Exam is Started");
    // navigate to exam page
    // const data = { random_1: examData._id, random_2: examData.link };
    // const query = new URLSearchParams(data).toString();  // Converts object to query string
    const url = `/examination/${examData.link}`;
    // // console.log("location: ", locationData);
    navigate(url, { state: { examData: examData, candidateId: searchParams.get("u_id")} });
  };

  // to fetch data after reload components
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getExamData(searchParams.get("link"), setIsloading);
        // update admin data
        // console.log("Result: ", response);
        // set exam data
        setExamData({ ...response });
      } catch (error) {
        console.error("Error fetching quizzes: ", error);
      }
    };

    fetchQuiz(); // Call the async function
  }, []);

  // to avoid to go to the previous page
  useEffect(() => {
    history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", () => {
      history.pushState(null, "", window.location.href);
    });
  }, []);

  return (
    <div className="flex flex-col justify-start items-center h-screen bg-gray-100 p-6">
      {/* Exam Name */}
      <div>
        <header className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {examData.quizInfo?.title
              ? examData?.quizInfo?.title
              : "Exam Instructions"}
          </h1>
        </header>

        {/* Instructions */}
        <main className="bg-white m-10 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Instructions
          </h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Read each question carefully before answering.</li>
              <li>
                No use of electronic devices other than the exam device is
                allowed.
              </li>
              <li>Make sure to submit your exam before the timer ends.</li>
              <li>Contact the invigilator in case of any issues.</li>
              <li>Total Questions are {examData?.questions?.length}</li>
              <li>
                Each questions have {examData?.quizInfo?.marksPerQuestion} marks
              </li>
              <li>
                You have {examData?.quizInfo?.timeDuration} minutes to complete
                exam
              </li>
              <li>
                After time end exam will submit automatically else you can
                submit manually too
              </li>
            </ol>
          )}
        </main>

        {/* Start Button */}
        <footer className="text-center">
          <button
            className="px-6 py-3 bg-sky-400 text-white font-semibold rounded-lg shadow hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300"
            onClick={startExam}
          >
            Start Exam
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ExamInstructions;
