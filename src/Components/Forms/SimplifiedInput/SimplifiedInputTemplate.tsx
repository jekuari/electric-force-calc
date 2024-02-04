import React, { ReactNode } from "react";
import { FiInfo } from "react-icons/fi";

const SimplifiedInputTemplate = ({
   moreInfo,
   title,
   children
}: {
   moreInfo?: ReactNode;
   title: string;
   children: ReactNode;
}) => {
   return (
      <div className="w-full">
         <div className=" font-medium text-neutral-700">
            {title}{" "}
            {moreInfo && (
               <div className="group relative inline ">
                  <FiInfo className="inline" />
                  <div className=" absolute left-1/2 hidden  w-60 -translate-x-1/2 -translate-y-full rounded border border-neutral-300 bg-white p-2 opacity-0 shadow transition-all group-hover:inline group-hover:opacity-100">
                     {moreInfo}
                  </div>
               </div>
            )}
         </div>
         {children}
      </div>
   );
};

export default SimplifiedInputTemplate;
