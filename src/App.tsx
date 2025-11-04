import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Task1 from "./tasks/task1/Task1";
import Task2 from "./tasks/task2/Task2";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const location = useLocation();
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="w-full flex flex-col gap-2 items-center justify-center p-10 overflow-auto">
        <Routes location={location}>
          <Route path="/task1" element={<Task1 />} />
          <Route path="/task2" element={<Task2 />} />
          <Route path="*" element={<Navigate to="/task1" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
