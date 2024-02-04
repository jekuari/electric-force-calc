import React, { useContext, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router";
import { SlidingAnimationContext } from "../../App/MainRoutes/Main.routes.js";


const StandardLayout = ({
   children,
}: {
   children: React.ReactNode;
}) => {

   const location = useLocation();

   const {variants, direction} = useContext(SlidingAnimationContext);

   return (
      <motion.div className="flex h-full w-full items-center justify-center absolute s:p-4 xl:p-0"
         key={location.pathname + "layout"}
         variants={variants}
         initial="enter"
         animate="center"
         exit="exit"
         custom={direction}
      >
         <div className="pt-16 h-full sm:pt-0 flex w-full max-w-3xl flex-col items-center justify-center gap-4">
            {children}
         </div>
      </motion.div>
   );
};

export default StandardLayout;
