import { useMemo, useState } from "react";
import { validatePesel } from "./utils";

const Task2: React.FC = () => {
  const [pesel, setPesel] = useState("");

  const isValid = useMemo(() => validatePesel(pesel), [pesel]);
  return (
    <div className="max-w-full border-2 border-gray-500 p-4 rounded-lg text-white">
      <h1 className="text-2xl font-bold pb-2">Task 2</h1>
      <label className="block mb-2 text-sm font-medium" htmlFor="file_input">
        Input PESEL
      </label>
      <input
        className="border-2 border-gray-500 p-2 rounded-lg text-2xl"
        value={pesel}
        onChange={(e) => {
          const propValue = e.target.value.replace(/[^0-9]/g, "");
          setPesel(propValue);
        }}
      />
      {pesel && (
        <div className="p-1 pb-0">
          <p
            className={`text-lg ${isValid ? "text-green-500" : "text-red-500"}`}
          >
            {isValid ? "Valid" : "Invalid"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Task2;
