import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { User } from "./types";
import Button from "../../components/Button/Button";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "./api";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { AxiosError } from "axios";

const labelClass =
  "block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300 pt-2";
const inputClass = "block w-full bg-neutral-500 rounded p-1 px-2";
const selectClass =
  "block w-full bg-neutral-500 rounded p-1 px-2 focus:ring-neutral-500";

const EditUser: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      id: 0,
      name: "",
      email: "",
      gender: "",
      status: "",
    },
  });
  if (!state) {
    navigate(-1);
  }
  const [updated, setUpdated] = useState(false);

  const { mutate, status } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      setUpdated(true);
    },
    onError: (err: AxiosError<{ field: keyof User; message: string }[]>) => {
      console.error(err);
      if (err.response?.data) {
        err.response.data.forEach(({ field, message }) => {
          setError(field, { message });
        });
      }
    },
  });

  useEffect(() => {
    if (!state) {
      navigate(-1);
    }
    setValue("id", state.id);
    setValue("name", state.name);
    setValue("email", state.email);
    setValue("gender", state.gender);
    setValue("status", state.status);
  }, [state, navigate, setValue]);

  if (!state) return null;

  const onSubmit: SubmitHandler<User> = (data) => {
    clearErrors();
    mutate(data);
  };

  if (updated) {
    return (
      <div className="max-w-full border-2 border-gray-500 p-4 rounded-lg text-white">
        <h1 className="text-2xl font-bold pb-2 text-green-300">
          User #{state.id} updated
        </h1>
        <Button onClick={() => navigate(-1)}>Ok</Button>
      </div>
    );
  }
  return (
    <div className="max-w-full border-2 border-gray-500 p-4 rounded-lg text-white">
      <h1 className="text-2xl font-bold pb-2">Edit User #{state.id}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <label className={labelClass}>Name</label>
        <input type="text" className={inputClass} {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <label className={labelClass}>Email:</label>
        <input type="email" className={inputClass} {...register("email")} />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <label className={labelClass}>Gender:</label>
            <select className={selectClass} {...register("gender")}>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className={labelClass}>Status:</label>
            <select className={selectClass} {...register("status")}>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-row justify-end gap-2 pt-4">
          <Button
            className="!text-blue-400"
            type="submit"
            disabled={status === "pending"}
          >
            <div className="flex flex-row gap-2 justify-center">
              {status === "pending" && (
                <svg
                  className="size-5 my-auto animate-spin ..."
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {status === "pending" ? "Processing" : "Save"}
            </div>
          </Button>
          <Button
            className="!text-red-400"
            onClick={() => navigate(-1)}
            disabled={status === "pending"}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
