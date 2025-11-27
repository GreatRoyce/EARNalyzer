// src/components/ui/CustomButton.jsx
import React from "react";

const CustomButton = ({ 
  type = "button", 
  title, 
  handleClick, 
  styles = "",
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  icon = null
}) => {
  // Base styles
  const baseStyles = "font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2";
  
  // Size variants
  const sizes = {
    small: "px-3 py-2 text-sm",
    medium: "px-4 py-3 text-base",
    large: "px-6 py-4 text-lg"
  };
  
  // Color variants
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 shadow-lg shadow-gray-500/25 hover:shadow-gray-500/40",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 shadow-lg shadow-green-500/25 hover:shadow-green-500/40",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-lg shadow-red-500/25 hover:shadow-red-500/40",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500 shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40",
    outline: "border-2 border-slate-300 bg-transparent hover:bg-white text-slate-700 focus:ring-blue-500 shadow-sm hover:shadow-md",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-700 focus:ring-blue-500",
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${styles}`}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        <>
          {icon}
          {title}
        </>
      )}
    </button>
  );
};

export default CustomButton;