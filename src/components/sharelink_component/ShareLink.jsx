import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const ShareLink = () => {
  const [copyStatus, setCopyStatus] = useState("");
  const location = useLocation();
  // console.log("location data: ", location);

  // make long title in short
  function truncateString(str, maxLength = 10) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    }
    return str;
  }

  const copyToClipboard = async (linkToCopy) => {
    try {
      await navigator.clipboard.writeText(linkToCopy); // Copy link to clipboard
      setCopyStatus("Copied!"); // Update status on success
    } catch (error) {
      setCopyStatus("Failed to copy!"); // Update status on failure
      console.error("Error copying to clipboard:", error);
    }
  };

  return (
    <div className="p-16">
      <div className="flex items-center max-w-max border border-blue-200">
        <code className="px-9 py-8 font-bold">
          http://localhost:5173/resource/
          {truncateString(location.state.link)}
        </code>
        <button
          onClick={() =>
            copyToClipboard(
              `http://localhost:5173/resource/${location.state.link}`
            )
          }
          className="text-center px-9 py-8 bg-gradient-to-bl from-sky-400 to-green-950 text-white font-bold"
        >
          Copy
        </button>
      </div>
      {copyStatus && (
        <p className="mt-2 text-sm text-green-500">{copyStatus}</p>
      )}
    </div>
  );
};

export default ShareLink;
