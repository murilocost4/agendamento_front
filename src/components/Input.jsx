import React from "react";
import InputMask from "react-input-mask";

const Input = ({ label, name, value, onChange, type = "text", mask = "", required = false, className }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="font-medium text-gray-700">{label}</label>
      {mask ? (
        <InputMask
          mask={mask}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="p-2 border border-gray-300 rounded-lg shadow-sm focus:shadow-lg focus:outline-1 outline-blue-400 outline-0"
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="p-2 border border-gray-300 rounded-lg shadow-sm focus:shadow-lg focus:outline-1 outline-blue-400 outline-0"
          required={required}
        />
      )}
    </div>
  );
};

export default Input;
