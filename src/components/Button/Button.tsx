import type { ButtonHTMLAttributes } from "react";

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`block w-full text-white text-lg text-bold rounded p-4 py-1 cursor-pointer bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 ${
        className ?? ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
