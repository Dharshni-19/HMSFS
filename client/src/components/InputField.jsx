import React from 'react';
// import './InputField.css';

const InputField = ({ label, type = "text", name, value, onChange }) => {
  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
      />
    </div>
  );
};

export default InputField;
