import React, { ReactNode, useCallback, useEffect } from "react";

const PreRegisterButton = ({
  onClick,
  children,
  isSecondary,
  activateOnEnter,
}: {
  onClick?: (e: React.MouseEvent) => any;
  children: ReactNode;
  isSecondary?: boolean;
  activateOnEnter?: boolean;
}) => {
  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.key === "Enter" && onClick && activateOnEnter) {
        onClick(e);
      }
    },
    [onClick]
  );

  useEffect(() => {
    const keydownHandler = handleKeyDown;

    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [handleKeyDown]);

  return (
    <button
      onClick={onClick}
      className={
        isSecondary
          ? "flex h-12 w-full max-w-[16rem] items-center justify-center rounded-md border border-neutral-300 font-semibold text-neutral-700 transition-all hover:bg-neutral-100 active:scale-90 active:bg-neutral-300"
          : "flex h-12 w-full max-w-[16rem] items-center justify-center rounded-md bg-cyan-700 font-semibold text-cyan-100 transition-all hover:bg-cyan-600 active:scale-90 active:bg-cyan-800"
      }
      type={isSecondary ? "button" : "submit"}
    >
      {children}
    </button>
  );
};

export default PreRegisterButton;
