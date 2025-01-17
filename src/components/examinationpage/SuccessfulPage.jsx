import React, { useEffect } from "react";

const SuccessfulPage = () => {
  // to avoid navigate to the previos page
  useEffect(() => {
    history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", () => {
      history.pushState(null, "", window.location.href);
    });
  }, []);

  return (
    <div className="p-5 flex flex-col items-center justify-center my-4">
      <p className="font-bold text-black">
        Your Test is successfully submited!
      </p>
      <p className="text-black">Thank you!</p>
    </div>
  );
};

export default SuccessfulPage;
