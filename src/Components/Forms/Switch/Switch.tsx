import React, {
   useState,
   useRef,
} from "react";
import { PanInfo } from "framer-motion";
import Knob from "./Knob/Knob";

const Switch = ({
   className,
   height,
   width,
   setter,
   value,
   bgColor,
   knobColor,
}: {
   className?: string;
   height?: number;
   width?: number;
   setter: React.Dispatch<React.SetStateAction<boolean>>;
   value: boolean;
   bgColor?: {
      true: string;
      false: string;
   };
   knobColor?: {
      true: string;
      false: string;
   };
}) => {
   const constraintsRef = useRef<any>(null);

   const handleOnKnobDragStart = () => {
      setIsDragging(true);
   };

   const handleOnKnobDragEnd = (
      event: PointerEvent | MouseEvent | TouchEvent,
      info: PanInfo
   ) => {
      if (info.offset.x > 0) {
         setter(true);
      } else {
         setter(false);
      }

      window.setTimeout(() => {
         setIsDragging(false);
      }, 100);
   };

   const handleOnClick = () => {
      if (!isDragging) {
         setter((prev) => !prev);
      }
   };

   const [isDragging, setIsDragging] = useState<boolean>(false);

   return (
      <label
         className={`${
            bgColor ? (value ? bgColor.true : bgColor.false) : "bg-neutral-700"
         } transition-colors rounded-full p-1 hover:cursor-pointer flex-shrink-0`}
         style={{ height: height ? height : 25, width: width ? width : 45 }}
         onClick={handleOnClick}
         role="switch"
         aria-checked={value}
         aria-label="Switch"
      >
         <div className="w-full h-full" ref={constraintsRef}>
            <Knob
               constraintsRef={constraintsRef}
               handleOnKnobDragStart={handleOnKnobDragStart}
               handleOnKnobDragEnd={handleOnKnobDragEnd}
               value={value}
               knobColor={knobColor}
            />
         </div>
      </label>
   );
};

export default Switch;
