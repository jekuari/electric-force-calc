import React from "react";
import { motion } from "framer-motion";

const UpsrjLoading = ({ className }: { className?: string }) => {
   return (
      <motion.svg
         version="1.1"
         id="Layer_1"
         xmlns="http://www.w3.org/2000/svg"
         xmlnsXlink="http://www.w3.org/1999/xlink"
         viewBox="0 0 500 500"
         xmlSpace="preserve"
         className={`${
            className ? className : "h-full w-full stroke-white "
         } stroke-[110px] `}
      >
         <motion.path
            className="fill-transparent"
            d="M67.3,218.5l201.8,201.8c71.7,69.2,180.4-48,115.8-115.8L209.4,129l48.8-46.4c71.1-71.7,195.2,31.6,114.6,114.6
            l-48.2,47"
            animate={{
               pathLength: [0, 1, 1],
               pathOffset: [0, 0, 1],
            }}
            transition={{
               duration: 1.5,
               ease: "easeInOut",
               repeat: Infinity,
               repeatType: "loop",
            }}
         />
      </motion.svg>
   );
};

export default UpsrjLoading;
