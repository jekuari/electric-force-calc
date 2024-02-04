import React, { useState, useEffect, useContext, createContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import UpsrjLoading from "../Loading/UpsrjLoading";

export const LoadingScreenContext = createContext({
   active: false,
   setActive: () => {},
   close: () => {},
   open: () => {},
   addTime: () => {},
} as {
   active: boolean;
   setActive: React.Dispatch<React.SetStateAction<boolean>>;
   close: () => void;
   open: () => void;
   addTime: () => void;
});

const Provider = ({ children }: { children: React.ReactNode }) => {
   const [overlayActive, setOverlayActive] = useState<boolean>(false);

   const close = () => {
      setOverlayActive(false);
   };

   const open = () => {
      setOverlayActive(true);
   };

   const [time, setTime] = useState<number>(0);

   const addTime = () => {
      setTime((prev) => prev + 1);
   }

   useEffect(() => {

      // time state is used to trigger a re-render

      /* if (overlayActive) {
         const timer = setTimeout(() => {

            close();
   
         }, 1000)

         return () => {
            clearTimeout(timer);
         }

      } */

   }, [overlayActive, time])

   return (
      <LoadingScreenContext.Provider
         value={{
            active: overlayActive,
            setActive: setOverlayActive,
            close: close,
            open: open,
            addTime: addTime,
         }}
      >
         {children}
         <AnimatePresence mode="wait">
         {overlayActive && <Contents />}
         </AnimatePresence>
      </LoadingScreenContext.Provider>
   );
};

const Contents = () => {
   return (
      <motion.div 
         className=" z-[250] fixed w-full h-full bg-slate-900 flex items-center justify-center p-4  top-0 left-0"
         animate={{ y: "0%"}}
         exit={{ y: "-200%" }}
         transition={{ duration: 0.5 }}
         onDragOver={(e) => {
            e.stopPropagation()
            e.preventDefault()
         }}
      >
         <div className="w-full h-full flex items-center justify-center ">
            <UpsrjLoading className='w-20 h-20 stroke-white stroke-[100px]' />
         </div>
      </motion.div>
   );
};

const LoadingScreen = {
   Provider,
   Contents,
};

export default LoadingScreen;
