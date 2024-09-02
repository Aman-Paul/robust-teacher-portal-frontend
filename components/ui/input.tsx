import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;  // Icon on the left
  rightIcon?: React.ReactNode; // Icon on the right
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className={cn("relative flex items-center", className)}>
        {leftIcon && (
          <span className="absolute left-3 text-muted-foreground border border-s-2 border-transparent border-r-gray-400">
            {leftIcon}
          </span>
        )}
        <input
          type={type}
          className={cn(
            "h-9 w-full rounded-md border border-input bg-transparent px-10 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 indent-2",
            leftIcon ? "pl-10" : "pl-3",   // Adjust padding for left icon
            rightIcon ? "pr-10" : "pr-3"  // Adjust padding for right icon
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 text-muted-foreground">
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
