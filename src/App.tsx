import "./App.css";
import Task1 from "./tasks/task1/Task1";
import Task2 from "./tasks/task2/Task2";

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col gap-2 items-center justify-center p-10 overflow-auto">
      <Task1 />
      <Task2 />
    </div>
  );
}

export default App;
