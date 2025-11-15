

import type { ReactElement} from "react";


interface ButtonInterface {
  title: string;
  size: "lg" | "sm" | "md";
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  variant: "primary" | "secondary";
  onClick ?: () => void ;
}

const sizeStyles = {
  lg: "px-8 py-4 text-xl rounded-xl",
  md: "px-4 py-2 text-md rounded-md",
  sm: "px-2 py-1 text-sm rounded-sm",
};

const variantStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-slate-300 text-purple-600",
};

export function Button(props: ButtonInterface) {

  return (
    <button  onClick = {props.onClick} className={`${sizeStyles[props.size]} ${variantStyles[props.variant]}  flex items-center justify-between gap-1`} >
      
        {props.startIcon && <span className="text-xs">
            {props.startIcon}
          </span>}
        
        <div className="pl-1 pr-1">{props.title}</div>
        
        {props.endIcon && <span className="text-xs">
            {props.endIcon}
          </span>}
    </button>
  );
}
