import React from "react";

const DashboardTable = () => {
  const quizzes = [
    { title: "rwrrerwe", status: "Active", responses: 0, modified: "Dec 02, 2024" },
    { title: "No Title: Nov 28, 2024", status: "Active", responses: 0, modified: "Dec 02, 2024" },
    { title: "No Title: Nov 28, 2024", status: "Active", responses: 2, modified: "Nov 28, 2024" },
  ];

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 border-b">Title</th>
            <th className="p-4 border-b">Status</th>
            <th className="p-4 border-b">Responses</th>
            <th className="p-4 border-b">Modified</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz, index) => (
            <tr key={index}>
              <td className="p-4 border-b">{quiz.title}</td>
              <td className="p-4 border-b">{quiz.status}</td>
              <td className="p-4 border-b">{quiz.responses}</td>
              <td className="p-4 border-b">{quiz.modified}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
