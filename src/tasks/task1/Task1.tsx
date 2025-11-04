import type React from "react";
import { useRef, useState } from "react";

const Task1: React.FC = () => {
  const [fileContent, setFileContent] = useState("");
  const [error, setError] = useState("");

  const pre1Ref = useRef<HTMLPreElement>(null);
  const pre2Ref = useRef<HTMLPreElement>(null);

  const handleScroll = (source: "pre1" | "pre2") => {
    const pre1 = pre1Ref.current;
    const pre2 = pre2Ref.current;
    if (!pre1 || !pre2) return;
    if (source === "pre1") {
      pre2.scrollTop = pre1.scrollTop;
      pre2.scrollLeft = pre1.scrollLeft;
    } else {
      pre1.scrollTop = pre2.scrollTop;
      pre1.scrollLeft = pre2.scrollLeft;
    }
  };

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
    <div className="max-h-[calc(100vh-5rem)] max-w-full border-2 border-gray-500 p-4 rounded-lg text-white flex flex-col">
      <form>
        <h1 className="text-2xl font-bold">Task 1</h1>
        <label className="block mb-2 text-sm font-medium" htmlFor="file_input">
          Upload file
        </label>
        <input
          className="block border border-gray-300 rounded px-2 ps-0 file:mr-4 file:py-2 file:px-4 file:border-0 file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-300"
          id="file_input"
          type="file"
          accept="text/plain"
          onChange={handleFileChange}
          key={new Date().getTime()}
        />
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {fileContent && (
        <div className="flex flex-row gap-4 mt-4 overflow-hidden">
          <div className="flex flex-col overflow-hidden">
            <h2 className="text-xl font-bold mb-1">File content:</h2>
            <pre
              className="overflow-auto  rounded p-2"
              ref={pre1Ref}
              onScroll={() => handleScroll("pre1")}
            >
              {fileContent}
            </pre>
          </div>
          <div className="w-[1px] bg-neutral-500" />
          <div className="flex flex-col overflow-hidden">
            <h2 className="text-xl font-bold mb-1">Encrypted content:</h2>
            <pre
              className="overflow-auto rounded p-2"
              ref={pre2Ref}
              onScroll={() => handleScroll("pre2")}
            >
              {encryptText(fileContent)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task1;
