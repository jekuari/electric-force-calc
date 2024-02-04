import React, { useState } from "react";
import CharInput from "./CharInput.js";

const RecoverPassword = ({
   fullRecoveryKey,
   setFullRecoveryKey,
}: {
   fullRecoveryKey: string;
   setFullRecoveryKey: React.Dispatch<React.SetStateAction<string>>;
}) => {
   const [isWritingCode, setIsWritingCode] = useState(false);

   return (
      <form className="pt-4">
         <label
            htmlFor="fullrecovery"
            onClick={() => {
               setIsWritingCode(true);
            }}
            className="flex w-full justify-center gap-4 text-neutral-700 hover:cursor-text"
         >
            {
               Array.from({ length: 6 }, (_, index) => (
                  <CharInput key={index} fullRecoveryKey={fullRecoveryKey} isWritingCode={isWritingCode} index={index} />
               ))
            }
         </label>

         <input
            id="fullrecovery"
            name="fullrecovery"
            maxLength={6}
            className="h-0 w-0"
            type="text"
            value={fullRecoveryKey}
            onChange={({ target }) => {
               setFullRecoveryKey(target.value);
            }}
         />
      </form>
   );
};

export default RecoverPassword;
