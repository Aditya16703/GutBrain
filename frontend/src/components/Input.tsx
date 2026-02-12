import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = "", ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1 w-full relative">
                {label && (
                    <label className="text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`
            w-full px-4 py-2 border rounded-lg outline-none transition-all duration-200
            ${error
                            ? "border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                        }
            ${className}
          `}
                    {...props}
                />
                {error && (
                    <span className="text-xs text-red-500 mt-0.5">{error}</span>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
