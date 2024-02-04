import React, { useEffect } from "react";
import SimplifiedInputTemplate from "../SimplifiedInputTemplate.js";

const SimplifiedInputSelectRadio = ({
   options,
   title,
   value,
   setter,
}: {
   options: readonly string[];
   title: string;
   value?: string;
   setter?: (val?: string) => void;
}) => {

   return (
      <SimplifiedInputTemplate title={title}>
         <div className="flex gap-4 w-full">
            {options.map((option, index) => (
               <SimplifiedInputSelectRadio.Box
                  key={index}
                  selectedValue={value}
                  value={option}
                  setter={setter}
               >
                  {option}
               </SimplifiedInputSelectRadio.Box>
            ))}
         </div>
      </SimplifiedInputTemplate>
   );
};

SimplifiedInputSelectRadio.Box = ({
   children,
   selectedValue,
   value,
   setter,
   Icon: Icon,
}: {
   children: React.ReactNode;
   selectedValue: string | undefined;
   value?: string;
   setter?: React.Dispatch<React.SetStateAction<any>>;
   Icon?: React.ElementType;
}) => {
   return (
      <button
         className={`flex h-12 w-full items-center justify-center gap-4 rounded p-2  font-semibold ${
            selectedValue === value
               ? "bg-cyan-700 text-white"
               : "border border-neutral-300 hover:bg-neutral-200"
         } transition-all  `}
         aria-description="option"
         onClick={() => setter && setter(value)}
      >
         {Icon && <Icon className="h-6 w-6" />}
         {children}
      </button>
   );
};

export default SimplifiedInputSelectRadio;
