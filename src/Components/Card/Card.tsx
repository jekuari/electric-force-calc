import React from "react";

const Card = ({
   children,
   title,
   scrollable = false,
}: {
   children: React.ReactNode;
   title: string;
   scrollable?: boolean;
}) => {
   return (
      <div className={`h-full max-h-full sm:h-auto sm:max-h-[50svh] ${scrollable ? "overflow-y-auto" : ""} rounded-xl sm:border sm:border-neutral-300 p-3 flex flex-col gap-2 w-full`}>
         <div className="flex gap-2 h-6 items-center">
            <div className="h-full w-1 rounded-full bg-cyan-500 flex-shrink-0" />
            <h1 className="text-xl font-semibold ">{title}</h1>
         </div>

         {children}
      </div>
   );
};

export default Card;
