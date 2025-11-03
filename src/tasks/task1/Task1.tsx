import type React from "react";
import { useState } from "react";

const Task1: React.FC = () => {
  const [fileContent, setFileContent] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("text/") && !file.name.endsWith(".txt")) {
      setError("Invalid file type");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      setFileContent(text?.toString() ?? "");
    };
    reader.onerror = (e) => {
      setError(e.target?.error?.message ?? "Unknown error");
    };
    reader.readAsText(file, "UTF-8");
  };
  const encryptText = (text: string) => {
    const shuffleArray = (array: string[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };
    return text.replace(/\p{L}{4,}/gu, (word) => {
      const first = word[0];
      const last = word[word.length - 1];
      const middle = word.slice(1, word.length - 1).split("");
      shuffleArray(middle);
      return first + middle.join("") + last;
    });
  };
  return (
    <form>
      <h1 className="text-2xl font-bold">Task 1</h1>
      <label className="block mb-2 text-sm font-medium" htmlFor="file_input">
        Upload file
      </label>
      <input
        className="block border border-gray-300 rounded px-2 ps-0 background-white file:mr-4 file:py-2 file:px-4 file:border-0 file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-300"
        id="file_input"
        type="file"
        accept="text/plain"
        onChange={handleFileChange}
        key={new Date().getTime()}
      />
      {error && <p className="text-red-500">{error}</p>}
      {fileContent && (
        <div className="my-4 pb-1 overflow-auto">
          <h2 className="text-lg font-bold sticky left-0">File content:</h2>
          <pre>{fileContent}</pre>
          <h2 className="text-lg font-bold sticky left-0 mt-2">
            Encrypted content:
          </h2>
          <pre>{encryptText(fileContent)}</pre>
        </div>
      )}
    </form>
  );
};

export default Task1;
