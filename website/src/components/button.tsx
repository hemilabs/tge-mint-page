import { ComponentProps } from "react";

const commonCss = `text-sm box-border flex items-center justify-center box-border
  rounded-lg border border-solid px-3 py-1.5 font-medium disabled:opacity-40`;

const ButtonPrimary = ({
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

const ButtonSecondary = ({
  className,
  disabled,
  ...props
}: ComponentProps<"button">) => (
  <button
    {...props}
    className={`${commonCss} shadow-button-secondary focus:shadow-button-secondary-focused border-neutral-300/55 bg-white
    text-neutral-950 hover:bg-neutral-100 disabled:bg-neutral-100 ${className} ${
      disabled ? "" : "cursor-pointer"
    }`}
    type="button"
  />
);

export const Button = {
  Primary: ButtonPrimary,
  Secondary: ButtonSecondary,
};
