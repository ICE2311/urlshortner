import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-4 py-3 rounded-lg border ${
          error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:border-gray-600"
        } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 transition-all ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
