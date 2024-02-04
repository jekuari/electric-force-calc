import React from "react";
import { motion } from "framer-motion";

const MenuButton = ({
   className,
   state: { isOpen, setIsOpen },
}: {
   className?: string;
   state: {
      isOpen: boolean;
      setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
   };
}) => {
   return (
      <svg
         width="20"
         height="20"
         viewBox="0 0 3 3 "
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         className={`${className || "h-full w-max fill-blue-300"}`}
         onClick={() => setIsOpen((prev) => !prev)}
      >
         <motion.rect
            y="0"
            width="1"
            height="1"
            rx="0.25"
            animate={{
               x: isOpen ? 1 : 0,
               rotate: isOpen ? 45 : 0,
            }}
         />
         <motion.rect
            x="2"
            width="1"
            height="1"
            rx="0.25"
            animate={{
               y: isOpen ? 1 : 0,
               rotate: isOpen ? 45 : 0,
            }}
         />
         <motion.rect
            x="0"
            width="1"
            height="1"
            rx="0.25"
            animate={{
               y: isOpen ? 1 : 2,
               rotate: isOpen ? 45 : 0,
            }}
         />
         <motion.rect
            y="2"
            width="1"
            height="1"
            rx="0.25"
            animate={{
               x: isOpen ? 1 : 2,
               rotate: isOpen ? 45 : 0,
            }}
         />
      </svg>
   );
};

export default MenuButton;
