import "./style.css";

export const TextInput = ({ searchValue, handleChange }) => {
  return (
    <div className="input-container">
      <input
        onChange={handleChange}
        value={searchValue}
        type="search"
        placeholder="Pesquise o card"
      />
    </div>
  );
};
