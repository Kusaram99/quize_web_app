import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getRequestToGetUserAnswer } from "./pdfGeneraterRequestHan";
import { useReactToPrint } from "react-to-print";

const PDFGenerator = () => {
  // Get parameters from the URL (quiz ID)
  const params = useParams();

  // State to hold the fetched results
  const [results, setResults] = useState([]);

  // Reference to the DOM element to be printed
  const contentRef = useRef(null);
 
  // Print function using `useReactToPrint`
  const printFn = useReactToPrint({
    contentRef: contentRef, // Provide the element reference to print
    documentTitle: "test document", // Title of the printed document 
    copyStyles: true, // Ensure styles are copied for printing
  });

  // Callback for the download button click
  const handleOnClick = useCallback(() => {
    printFn(); 
  }, [printFn]); // Recreates only if `printFn` changes

  // use Effect
  useEffect(() => {
    getRequestToGetUserAnswer(params._id)
      .then((res) => {
        // console.log(res.data.data);
        setResults(res.data.data);
      })
      .catch((err) => console.log("Error: ", err));

    // console.log(contentRef);
  }, []);

  return (
    <div className="p-14">
      <div className="flex justify-end">
        {/* ========================== PDF Download button ====================== */}
        <button
          onClick={handleOnClick}
          className="px-4 py-2 rounded bg-gradient-to-bl from-blue-500 to-sky-600 text-white font-bold"
        >
          Download
        </button>
      </div>
      {/* ============================ Loader =================================== */}
      {results.length === 0 ? (
        <div className="flex flex-col gap-5 justify-center items-center">
          <span className="font-bold">Generating your PDF file</span>
          <span>Loadding...</span>
        </div>
      ) : (
        // =========================== Dynamic Data printing =====================
        <div ref={contentRef} className="p-14">
          <div>
            <h1 className="">By QUIZMAKER</h1>
          </div>
          <div>
            <h1 className="font-bold text-2xl text-center my-4">
              {results.quizInfo.title}
            </h1>

            <div>
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 border border-gray-300">No.</th>
                    <th className="px-4 py-2 border border-gray-300">Name</th>
                    <th className="px-4 py-2 border border-gray-300">Score</th>
                    <th className="px-4 py-2 border border-gray-300">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {results.results.length &&
                    results.results.map((elem, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-4 py-2 border border-gray-300">
                            {index + 1}
                          </td>
                          <td className="px-4 py-2 border border-gray-300">
                            {elem.candidateData.fullName}
                          </td>
                          <td className="px-4 py-2 border border-gray-300">
                            {elem.score}
                          </td>
                          <td className="px-4 py-2 border border-gray-300">
                            {elem.score < +results.quizInfo.passingMarks
                              ? "Fail"
                              : "Pass"}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFGenerator;
