import React, { MouseEventHandler, useEffect, useMemo, useRef, useState } from "react";
import SimplifiedInput from "../SimplifiedInputField/SimplifiedInput.js";
import { AnimatePresence, motion } from "framer-motion";

const SimplifiedInputListSearch = ({
   title,
   options,
   displayKey,
   setter
}:
   | {
        title: string;
        options: string[];
        displayKey?: undefined;
        setter: React.Dispatch<React.SetStateAction<any>>
     }
   | {
        title: string;
        options: object[];
        displayKey: string;
        setter: React.Dispatch<React.SetStateAction<any>>
     }) => {
   const [term, setTerm] = useState("");

   const [selection, setSelection] = useState<object>({});
   const [isSelecting, setIsSelecting] = useState(false);

   useEffect(() => {

      if (term === "") {
         setSelection({})
      }

   }, [term])

   useEffect(() => {

      setter(selection)

   }, [selection])

   const parentContainerRef = useRef<HTMLInputElement>(null);

   const optionsContainerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (!parentContainerRef.current) {
         return;
      }

      const onClickOutsideHandler = (e: MouseEvent) => {
         const containerBoundingBox =
            parentContainerRef.current?.getBoundingClientRect();

         const optionsContainerBoundingBox =
            optionsContainerRef.current?.getBoundingClientRect();

         if (!containerBoundingBox || !optionsContainerBoundingBox) {
            return;
         }

         const xPos = e.pageX;
         const yPos = e.pageY;

         let { width, height, x, y } = containerBoundingBox as DOMRect;

         if (!(xPos < x || xPos > x + width || yPos < y || yPos > y + height)) {
            return;
         }

         if (
            !(
               xPos < optionsContainerBoundingBox.x ||
               xPos > optionsContainerBoundingBox.x + width ||
               yPos < optionsContainerBoundingBox.y ||
               yPos > optionsContainerBoundingBox.y + height
            )
         ) {
            return;
         }

         setIsSelecting(false);
      };

      window.addEventListener("click", onClickOutsideHandler);

      return () => {
         window.removeEventListener("click", onClickOutsideHandler);
      };
   }, [isSelecting]);

   const filteredOptions = useMemo(() => {

      if (typeof options[0] === "object") {
         
         return (options as object[]).filter((option) => {
            return (option[displayKey as keyof typeof option] as string)
               .toLowerCase()
               .includes(term.toLowerCase());
         });
      }

      return (options as string[]).filter((option) => {
         return option.toLowerCase().includes(term.toLowerCase());
      });

   }, [term, options, displayKey])

   return (
      <div className="relative">         
         <div>
            <SimplifiedInput
               title={title}
               inputFieldProps={{
                  placeholder: "Universidad de procedencia",
                  id: "originUniversity",
                  value: term,
                  setter: setTerm,
                  onFocus: (e) => {
                     setIsSelecting(true);
                  },
                  ref: parentContainerRef,
               }}
            />
         </div>

         <AnimatePresence mode="wait">
            {isSelecting && (
               <motion.div
                  initial={{ scaleY: "0%" }}
                  animate={{ scaleY: "100%" }}
                  exit={{ scaleY: "0%" }}
                  ref={optionsContainerRef}
                  className="divide-y-neutral-200 absolute top-full z-20 h-auto max-h-48 w-full origin-top divide-y overflow-y-auto rounded-b border border-neutral-200 border-t-transparent bg-white shadow"
                  transition={{
                     duration: 0.15,
                     ease: "easeInOut",
                  }}
               >  
                  {filteredOptions.map((option, index) => {


                     if (typeof option === "object") {

                        return (
                           <OptionCard
                              option={option[displayKey as keyof typeof option]}
                              value={option}
                              index={index}
                              key={index}
                              setter={setTerm}
                              setIsSelecting={setIsSelecting}
                              setSelection={setSelection}
                           />
                        );
                     }

                     if (term.toLowerCase && option.toLowerCase().includes(term.toLowerCase())) {
                        return (
                           <OptionCard
                              option={option}
                              index={index}
                              key={index}
                              setter={setTerm}
                              setIsSelecting={setIsSelecting}
                              value={option}
                              setSelection={setSelection}
                           />
                        );
                     }


                  })}
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

const OptionCard = ({
   option,
   index,
   setter,
   setIsSelecting,
   value,
   setSelection
}: {
   option: string;
   index: number;
   setter: React.Dispatch<React.SetStateAction<any>>;
   setIsSelecting: React.Dispatch<React.SetStateAction<boolean>>;
   value: any
   setSelection: React.Dispatch<React.SetStateAction<any>>
}) => {
   return (
      <button
         className="justify-left group flex h-12 w-full items-center border-y-neutral-200 px-2"
         onClick={(e) => {
            e.preventDefault();
            setter(option.toLowerCase());
            setSelection(value)
            setIsSelecting(false);
         }}
      >
         <span className="mr-2 inline h-1/2 w-1 rounded-full bg-sky-500 transition-all group-hover:bg-sky-800" />
         <p className=" text-left whitespace-nowrap overflow-clip">{option.toLowerCase()}</p>
      </button>
   );
};

export default SimplifiedInputListSearch;
