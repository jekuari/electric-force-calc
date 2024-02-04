import {
  useState,
  useEffect,
  useMemo,
  ChangeEventHandler,
  forwardRef,
  MouseEvent,
  MouseEventHandler,
  FocusEventHandler,
} from "react";

import { IconType } from "react-icons";
import { FiEye, FiEyeOff } from "react-icons/fi";

import yup from "yup";

export interface InputFieldProps {
  icon?: JSX.Element;
  background?: string;
  className?: string;
  border?: string;
  borderOnFocus?: string;
  id: string;
  type?: "password" | "text" | "number" | "phone";
  placeholder: string;
  value?: string | number | null;
  textColor?: string;
  strokeColor?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  setter?:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<number>>
    | ((value: string) => void)
    | ((value: number) => void);
  Icon?: IconType;
  autoComplete?: string;
  palceholderColor?: string;
  error?: boolean;
  size?: string;
  isErrored?: boolean;
  maxLength?: number;
  schema?: yup.AnySchema;
  required?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
}

const InputField = forwardRef(
  (
    {
      icon,
      background = "bg-transparent",
      className,
      border = "",
      borderOnFocus,
      id,
      type,
      placeholder,
      value,
      onChange,
      setter,
      textColor = "text-neutral-800",
      strokeColor = "stroke-neutral-800",
      Icon,
      autoComplete,
      palceholderColor = "placeholder-neutral-600",
      error,
      size = "sm",
      isErrored,
      maxLength,
      schema,
      required,
      onClick,
      onFocus,
    }: InputFieldProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const padding = useMemo(() => {
      switch (size) {
        case "sm":
          return ["py-0", "px-4 h-12"];
          break;
        case "md":
          return ["py-4", "px-8"];
          break;
        case "lg":
          return ["py-6", "px-12"];
          break;
        default:
          return ["py-4", "px-4"];
          break;
      }
    }, [size]);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const realType = useMemo(() => {
      if (showPassword && type === "password") {
        return "text";
      }

      return type;
    }, [type, showPassword]);

    const [localIsErrored, setLocalIsErrored] = useState<boolean>(false);

    useEffect(() => {
      if (schema) {
        try {
          schema.validateSync(value);
          setLocalIsErrored(false);
        } catch (error) {
          setLocalIsErrored(true);
        }
      }
    }, [value, schema]);

    const realIsErrored = useMemo(() => {
      if (
        !required &&
        (type === "text" || type === undefined || type === "password")
      ) {
        if (value === "") {
          return false;
        }
      }

      if (isErrored) {
        return isErrored;
      }

      return localIsErrored;
    }, [isErrored, localIsErrored, value, type]);

    const borderLeft = useMemo(() => {
      if (realIsErrored) {
        return "border-l-red-500 focus-within:border-l-yellow-500 border-r-neutral-200";
      }

      if (border) {
        return border;
      }

      if (borderOnFocus) {
        return borderOnFocus;
      }

      return "border-l-lime-500 focus-within:border-l-lime-500 border-r-neutral-200";
    }, [realIsErrored, border, borderOnFocus]);

    return (
      <label
        htmlFor={id}
        className={
          className
            ? className
            : `flex ${background ? background : "bg-white/10"} ${
                padding[1]
              } w-full items-center space-x-4 rounded-md ${borderLeft} border border-l-2 border-solid transition-all ${
                textColor ? textColor : "text-white"
              } ${error && " animate-shake"} relative`
        }
      >
        {Icon ? (
          <Icon
            className={`${
              strokeColor ? strokeColor : "stroke-white"
            } fill-transparent text-2xl`}
          />
        ) : (
          icon
        )}
        <input
          className={`h-full bg-transparent focus:!outline-none focus:!ring-0 ${
            palceholderColor ? palceholderColor : "placeholder:text-white"
          } ${
            padding[0]
          } w-full text-lg placeholder:transition-all focus:placeholder-opacity-0 focus:placeholder:-translate-x-full `}
          id={id}
          type={realType}
          placeholder={placeholder ? placeholder : ""}
          value={value ?? undefined}
          onChange={
            setter
              ? (e) => {
                  const action = setter as any;
                  action(e.target.value as any) as any;
                }
              : onChange && onChange
          }
          onFocus={onFocus}
          onClick={onClick}
          autoComplete={autoComplete ? autoComplete : "off"}
          maxLength={maxLength ? maxLength : 100}
          ref={ref}
        />
        {type === "password" && (
          <button
            className="absolute right-4"
            onClick={(e) => {
              e.preventDefault();
              setShowPassword((prev) => !prev);
            }}
            type="button"
            tabIndex={-1}
          >
            {showPassword ? (
              <FiEyeOff className="h-6 w-6" />
            ) : (
              <FiEye className="h-6 w-6" />
            )}
          </button>
        )}
      </label>
    );
  }
);

export default InputField;
