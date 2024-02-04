import React, { ChangeEventHandler, useMemo } from "react";
import SimplifiedInputTemplate from "../SimplifiedInputTemplate.js";
import { InputFieldProps } from "../../InputField/InputField.js";
import { BsCalendar } from "react-icons/bs";
import { FiCalendar } from "react-icons/fi";

const SimplifiedInputDate = ({
  title,
  moreInfo,
  className,
  background = "bg-neutral-200",
  textColor = "text-neutral-800",
  strokeColor = "stroke-neutral-700",
  palceholderColor = "placeholder-neutral-600",
  borderLeft,
  error,
  size = "sm",
  id,
  placeholder,
  value,
  onChange,
  setter,
  autoComplete,
}: {
  id: string;
  title: string;
  moreInfo?: React.ReactNode;
  className?: string;
  background?: string;
  borderLeft?: string;
  textColor?: string;
  error?: boolean;
  size?: string;
  strokeColor?: string;
  palceholderColor?: string;
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  setter: React.Dispatch<React.SetStateAction<string>>;
  autoComplete?: string;
}) => {
  const padding = useMemo(() => {
    switch (size) {
      case "sm":
        return ["py-0", "px-4 h-12"];
      case "md":
        return ["py-4", "px-8"];
      case "lg":
        return ["py-6", "px-12"];
      default:
        return ["py-4", "px-4"];
    }
  }, [size]);

  return (
    <SimplifiedInputTemplate title={title} moreInfo={moreInfo}>
      <label
        htmlFor={id}
        className={
          className
            ? className
            : `flex ${background ? background : "bg-white/10"} ${
                padding[1]
              } w-full items-center space-x-4 rounded-md border-transparent ${borderLeft} border-2 border-solid transition-all ${
                textColor ? textColor : "text-white"
              } ${error && " animate-shake"} relative`
        }
      >
        <FiCalendar
          className={`${
            strokeColor ? strokeColor : "stroke-white"
          } fill-transparent text-2xl`}
        />
        <input
          className={`h-full bg-transparent focus:!outline-none focus:!ring-0 ${
            palceholderColor ?? "placeholder:text-white"
          } ${
            padding[0]
          } w-full text-lg placeholder:transition-all focus:placeholder-opacity-0 focus:placeholder:-translate-x-full `}
          id={id}
          type="date"
          placeholder={placeholder ?? ""}
          value={value ?? undefined}
          onChange={
            setter
              ? (e) => {
                  setter(e.target.value as any);
                }
              : onChange && onChange
          }
          autoComplete={autoComplete ?? "off"}
        />
      </label>
    </SimplifiedInputTemplate>
  );
};

export default SimplifiedInputDate;
