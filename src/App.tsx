import { useCallback } from "react";
import { useFormState } from "./hooks/state-management/useFormState";

const borderLookup = {
  idle: "black",
  valid: "green",
  error: "red",
};
function validateCharacter(str: string) {
  if (str.includes("fuck")) return "ut is not a valid name!";
}

function validateLength(str: string) {
  if (str.length < 10) return "length must be more than 10 characters!";
}

function cantBeEmpty(str: string) {
  if (str.length === 0) return "can't be empty!";
}

const App = () => {
  const [name, setName, { isValid, errors, status }] = useFormState<string>(
    "",
    [useCallback(validateLength, []), useCallback(validateCharacter, []), cantBeEmpty]
  );

  console.log({ name, errors, isValid, status });
  return (
    <div>
      <h1>Form state with validations</h1>
      <h2>Name: {name}</h2>
      {Array.isArray(errors) && (
        <ul>
          {errors.map((error) => (
            <li>{error}</li>
          ))}
        </ul>
      )}
      <input
        // type="text"
        name="name"
        id="name"
        value={name}
        style={{
          outline: "none",
          borderRadius: 4,
          padding: "10px 16px",
          borderWidth: 4,
          borderStyle: "solid",
          borderColor: borderLookup[status],
        }}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

export default App;
