import React from "react";
import SimplifiedInputTemplate from "../SimplifiedInputTemplate.js";

const SimplifiedInputSelect = ({
   title,
   value,
   placeholder,
   setter,
   options,
   labels
}: {
   title: string;
   value?: string;
   placeholder?: string;
   setter?: React.Dispatch<React.SetStateAction<any>>;
   options: readonly string[];
   labels?: string[]
}) => {
   return (
      <SimplifiedInputTemplate title={title}>
         <label
            htmlFor={`nationalityPicker${title.split(" ")[0]}`}
            className="relative flex h-12 w-full items-center rounded bg-neutral-200 px-4 transition-all hover:bg-transparent hover:shadow-lg hover:outline hover:outline-1 hover:outline-neutral-200 "
         >
            <span className="">
               { value ? labels?.[options.indexOf(value)] || value : placeholder || "Selecciona una opción"}
            </span>
            <select
               className="absolute left-0 top-0 h-full w-full opacity-0"
               name="country"
               id={`nationalityPicker${title.split(" ")[0]}`}
               value={value}
               onChange={(e) => setter && setter(e.target.value)}
            >
               {options.map((value, index) => (
                  <option key={index} value={value}>
                     {labels?.[index] || value}
                  </option>
               ))}
            </select>
         </label>
      </SimplifiedInputTemplate>
   );
};

export default SimplifiedInputSelect;
