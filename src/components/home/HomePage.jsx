import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 p-6">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-white">Quiz Maker</h1>
        <p className="text-lg text-white mt-2">
          Create, manage, and take quizzes effortlessly.
        </p>
      </header>

      <main className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-700">
            What would you like to do?
          </h2>
          <div className="space-y-4 mt-4">
            <button
              className="w-full py-3 bg-sky-500 text-white font-semibold rounded-lg shadow hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
              onClick={() => alert("Create New Quiz")}
            >
              Create New Quiz
            </button>

            <button
              className="w-full py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={() => alert("View Existing Quizzes")}
            >
              View Existing Quizzes
            </button>
          </div>
        </section>

        <section className="text-center">
          <p className="text-gray-600">
            Already have an account?
            <Link to="/authentication" className="text-sky-500 font-semibold">
              Login
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
