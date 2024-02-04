import React, {useEffect, useState} from "react";
import {PanInfo, motion} from "framer-motion";

const Knob = ({
   constraintsRef,
   handleOnKnobDragStart,
   handleOnKnobDragEnd,
   value,
   knobColor,
}: {
   constraintsRef: any;
   handleOnKnobDragStart: () => void;
   handleOnKnobDragEnd: (
      event: PointerEvent | MouseEvent | TouchEvent,
      info: PanInfo
   ) => void;
   value: boolean;
   knobColor?: {
      true: string;
      false: string;
   };
}) => {

   useEffect(() => {

      if (constraintsRef?.current?.offsetWidth) {
         setVariants({
            true: {
               x: constraintsRef.current.offsetWidth - 16,
            },
            false: {
               x: 0,
            },
         });
      }
   
   }, [constraintsRef, constraintsRef?.current?.offsetWidth])
   

   const [variants, setVariants] = useState<any>(null);

   return (
      variants && (
         <motion.div
         className={`h-full aspect-square ${
            knobColor
               ? value
                  ? knobColor.true
                  : knobColor.false
               : "bg-gradient-to-tr from-orange-500 to-red-500"
         } ransition-colors rounded-full`}
         drag="x"
         dragConstraints={constraintsRef}
         dragElastic={0}
         initial={value ? "true" : "false"}
         animate={
            value ? "true" : "false"
         }
         variants={variants}
         onDragStart={handleOnKnobDragStart}
         onDragEnd={handleOnKnobDragEnd}
         dragMomentum={true}
         aria-label="Switch knob"
         role="button"
         tabIndex={0}
      />
      )
   );
};

export default Knob;
