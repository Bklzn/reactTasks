import "./App.css";
import Task1 from "./tasks/task1/Task1";

function App() {
  return (
    <div className="w-full h-screen flex items-center justify-center p-10">
      <div className="max-w-full border-2 border-gray-500 p-4 rounded-lg text-white">
        <Task1 />
      </div>
    </div>
  );
}

export default App;
