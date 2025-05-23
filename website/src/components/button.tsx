import { ComponentProps } from "react";

const commonCss = `text-sm flex items-center justify-center box-border
  rounded-lg border border-solid px-3 py-1.5 font-medium disabled:opacity-40`;

export const Button = ({
  className,
  disabled,
  ...props
}: ComponentProps<"button">) => (
  <button
    {...props}
    className={`${commonCss} shadow-button-primary focus:shadow-button-primary-focused border-orange-700/55 bg-gradient-to-b from-orange-500  
    to-orange-600 text-white transition-all
    duration-300 hover:border-orange-700/70 hover:from-orange-600 hover:to-orange-600
    disabled:bg-orange-600 ${className}`}
    disabled={disabled}
    type="button"
  />
);
