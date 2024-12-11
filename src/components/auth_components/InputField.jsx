import React from 'react'



const InputField = ({ label, type, id, value, onChange }) => {
    return (
      <div >
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
    );
  };

  export default InputField