import React, { MouseEventHandler } from "react";
import SimplifiedInputTemplate from "../SimplifiedInputTemplate.js";

const SimplifiedInputSelectMultiple = ({
   title,
   options,
   selection,
   setter,
}: {
   title: string;
   options: readonly string[];
   selection?: string[];
   setter?: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
   const handleOnClick: MouseEventHandler = (e) => {
      const value = e.currentTarget.textContent;
      if (!value) return;

      if (selection?.includes(value)) {
         setter && setter(selection.filter((val) => val !== value));
      } else {
         setter && setter([...(selection || []), value]);
      }
   };

   return (
      <SimplifiedInputTemplate title={title}>
         <div className="flex w-full flex-wrap items-center justify-center gap-4 py-2">
            {options.map((option, index) => (
               <OptionButton
                  key={index}
                  value={option}
                  isSelected={selection?.includes(option) || false}
                  onClick={handleOnClick}
               />
            ))}
         </div>
      </SimplifiedInputTemplate>
   );
};

const OptionButton = ({
   value,
   isSelected,
   onClick,
}: {
   value: string;
   isSelected: boolean;
   onClick: MouseEventHandler;
}) => (
   <div className={`rounded-full ${isSelected ? "bg-cyan-700 text-cyan-100" : "text-neutral-800 outline outline-1 outline-neutral-300"} px-4 py-1 hover:cursor-pointer select-none lowercase`} onClick={onClick}>
      {value}
   </div>
);

export default SimplifiedInputSelectMultiple;
