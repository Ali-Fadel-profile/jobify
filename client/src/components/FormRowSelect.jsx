function FormRowSelect({ labelText, list, name, value, onChange }) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        value={value}
        onChange={onChange}
      >
        {list.map((option, index) => {
          return (
            <option key={index} value={option}>
              {" "}
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FormRowSelect;
