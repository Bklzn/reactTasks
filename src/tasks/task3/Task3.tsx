import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { getUsers } from "./api";
import type { User } from "./types";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

const Task3: React.FC = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="h-full">
      <div className="max-w-full border-2 border-gray-500 p-4 rounded-lg text-white">
        <div className="flex flex-row justify-between items-start">
          <h1 className="text-2xl font-bold pb-2">Task 3</h1>
          <input
            type="text"
            className="bg-neutral-500 rounded p-1 px-2"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[800px]">
            <thead className="border-b-2 border-gray-500">
              <tr>
                <th className="border-e-2 border-gray-500 px-2">Id</th>
                <th className="border-e-2 border-gray-500 px-2">Name</th>
                <th className="border-e-2 border-gray-500 px-2">Email</th>
                <th className="border-e-2 border-gray-500 px-2">Gender</th>
                <th className="border-e-2 border-gray-500 px-2">Status</th>
                <th className="px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <FetchData filter={search} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const FetchData: React.FC<{ filter: string }> = ({ filter }) => {
  const navigate = useNavigate();
  const { status, error, data } = useQuery<User[]>({
    queryFn: getUsers,
    queryKey: ["users"],
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (filter.length < 3) return data;
    const lower = filter.toLowerCase();
    return data.filter(({ id, name, email, gender, status }) => {
      return (
        String(id).includes(lower) ||
        name.toLowerCase().includes(lower) ||
        email.toLowerCase().includes(lower) ||
        gender.toLowerCase().includes(lower) ||
        status.toLowerCase().includes(lower)
      );
    });
  }, [data, filter]);

  if (status === "pending")
    return Array.from({ length: 5 }).map((_, index) => (
      <tr key={index}>
        <td>
          <div className="p-2">
            <div className=" w-10 h-3 rounded-full bg-neutral-500 animate-pulse"></div>
          </div>
        </td>
        <td>
          <div className="p-2">
            <div className=" w-20 h-3 rounded-full bg-neutral-500 animate-pulse"></div>
          </div>
        </td>
        <td>
          <div className="p-2">
            <div className=" w-40 h-3 rounded-full bg-neutral-500 animate-pulse"></div>
          </div>
        </td>
        <td>
          <div className="p-2">
            <div className=" w-20 h-3 rounded-full bg-neutral-500 animate-pulse"></div>
          </div>
        </td>
        <td>
          <div className="p-2">
            <div className=" w-15 h-3 rounded-full bg-neutral-500 animate-pulse"></div>
          </div>
        </td>
        <td>
          <div className="p-2">
            <div className=" w-15 h-3 rounded-full bg-neutral-500 animate-pulse"></div>
          </div>
        </td>
      </tr>
    ));
  if (status === "error")
    return (
      <tr>
        <td colSpan={6}>Error: {error.message}</td>
      </tr>
    );

  return filteredData.map((user) => (
    <tr key={user.id}>
      <td className="border-e-2 border-gray-500 px-2">{user.id}</td>
      <td className="border-e-2 border-gray-500 px-2">{user.name}</td>
      <td className="border-e-2 border-gray-500 px-2">{user.email}</td>
      <td className="border-e-2 border-gray-500 px-2">{user.gender}</td>
      <td className="border-e-2 border-gray-500 px-2">
        <span
          className={`rounded-md  px-2 py-1 text-xs font-medium  ${
            user.status === "active"
              ? "text-green-400 inset-ring inset-ring-green-400/20 bg-green-400/10"
              : "text-red-400 inset-ring inset-ring-red-400/20 bg-red-400/10"
          }`}
        >
          {user.status}
        </span>
      </td>
      <td className="p-1">
        <Button
          className="!inline !p-0 !text-blue-300"
          onClick={() => navigate(`/task3/${user.id}/edit`, { state: user })}
        >
          Edit
        </Button>
      </td>
    </tr>
  ));
};

export default Task3;
