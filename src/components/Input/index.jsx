import React from "react";

const Input = ({ label, required, error, renderInput, ...restProps }) => {
  return (
    <div className="form-group">
      <label className="label">
        {label} {required && <span>*</span>}
      </label>
      {renderInput?.({...restProps, error }) || (
        <input
          {...restProps}
          className={`form__input ${error ? "formerror" : ""}`}
        />
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Input;
