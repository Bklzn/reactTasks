import type React from "react";
import Button from "../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <aside className="w-[300px] bg-neutral-900">
      <div className="w-full h-full p-5 py-10 flex flex-col gap-4">
        <Button
          onClick={() => navigate("/task1")}
          className={location.pathname === "/task1" ? "!text-purple-400" : ""}
        >
          Task 1
        </Button>
        <Button
          onClick={() => navigate("/task2")}
          className={location.pathname === "/task2" ? "!text-purple-400" : ""}
        >
          Task 2
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
