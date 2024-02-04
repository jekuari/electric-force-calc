import React, { ReactNode } from "react";
import PreRegisterButton from "../Button/PreRegisterButton.js";
import { useNavigate } from "react-router";

const NextAndBackButtons = ({
   next,
   prev,
}: {
   next:
   | {
      location: string;
      text: ReactNode;
      activateOnEnter?: boolean;
   }
   | {
      action: (e: React.MouseEvent<Element, MouseEvent>) => void;
      text: ReactNode;
      activateOnEnter?: boolean;
   };
   prev?:
   | {
      location: string;
      text: ReactNode;
      activateOnEnter?: boolean;
   }
   | {
      action: (e: React.MouseEvent<Element, MouseEvent>) => void;
      text: ReactNode;
      activateOnEnter?: boolean;
   };
}) => {
   const navigate = useNavigate();

   return (
      <div className="bg-white pt-2 sm:pt-0 h-16 sm:h-auto flex-shrink-0 w-full flex fixed bottom-0 left-0 sm:static">
         <div className="flex px-4 sm:px-0 w-full justify-center gap-4">
            {prev && <PreRegisterButton
               onClick={(e) => {
                  e.preventDefault();

                  if (Object.keys(prev).includes("action")) {
                     const { action } = prev as {
                        action: (e: React.MouseEvent<Element, MouseEvent>) => void;
                        text: string;
                     };
                     action(e);
                     return;
                  }

                  const { location } = prev as { location: string; text: string };

                  navigate(location, { state: { isGoingForward: false } });
               }}
               isSecondary
               activateOnEnter={prev.activateOnEnter}
            >
               {prev.text}
            </PreRegisterButton>}

            <PreRegisterButton
               onClick={(e) => {
                  e.preventDefault();
                  console.log("Se activo")
                  if (Object.keys(next).includes("action")) {
                     const { action } = next as {
                        action: (e: React.MouseEvent<Element, MouseEvent>) => void;
                        text: string;
                     };
                     action(e);
                     return;
                  }

                  const { location } = next as { location: string; text: string };

                  navigate(location, { state: { isGoingForward: true } });
               }}
               activateOnEnter={next.activateOnEnter}
            >
               {next.text}
            </PreRegisterButton>
         </div>
      </div>
   );
};

export default NextAndBackButtons;
