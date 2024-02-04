import React, { useState, useEffect, useContext, createContext } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const OverlayContext = createContext({
   active: false,
   content: null,
   setActive: () => {},
   setOverlayContent: () => {},
   close: () => {},
   open: () => {},
} as {
   active: boolean;
   content: React.ReactNode;
   setActive: React.Dispatch<React.SetStateAction<boolean>>;
   setOverlayContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
   close: () => void;
   open: (content: React.ReactNode) => void;
});

const Overlay = ({ children }: { children: React.ReactNode }) => {
   const overlayContext = useContext(OverlayContext);

   useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
         if (e.key === "Escape") {
            overlayContext.close();
         }
      };

      window.addEventListener("keydown", handleEsc);
      return () => {
         window.removeEventListener("keydown", handleEsc);
      };
   }, []);

   return (
      <AnimatePresence mode="wait">
         {overlayContext.active && (
            <Overlay.Contents>{children}</Overlay.Contents>
         )}
      </AnimatePresence>
   );
};

Overlay.Provider = ({ children }: { children: React.ReactNode }) => {
   const [overlayActive, setOverlayActive] = useState<boolean>(false);
   const [overlayContent, setOverlayContent] = useState<React.ReactNode>(null);

   const close = () => {
      setOverlayActive(false);
      setOverlayContent(null);
   };

   const open = (content: React.ReactNode) => {
      setOverlayActive(true);
      setOverlayContent(content);
   };

   return (
      <OverlayContext.Provider
         value={{
            active: overlayActive,
            content: overlayContent,
            setActive: setOverlayActive,
            setOverlayContent: setOverlayContent,
            close: close,
            open: open,
         }}
      >
         {children}
         <Overlay>{overlayContent}</Overlay>
      </OverlayContext.Provider>
   );
};

Overlay.Contents = ({ children }: { children: React.ReactNode }) => {
   return (
      <motion.div 
         className=" z-[101] fixed w-full h-full bg-black/70 flex items-center justify-center p-4  top-0 left-0"
         initial={{ opacity: 0}}
         animate={{ opacity: 1}}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.1 }}
         onDragOver={(e) => {
            e.stopPropagation()
            e.preventDefault()
         }}
      >
         <div className="w-full h-full flex items-center justify-center ">
            {children}
         </div>
      </motion.div>
   );
};

export default Overlay;
