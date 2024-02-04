import React from 'react'

const CharInput = ({
   fullRecoveryKey,
   isWritingCode,
   index
}: {
   fullRecoveryKey: string;
   isWritingCode: boolean;
   index: number;
}) => {
  return (
   <p
   className={`flex h-14 w-10 items-center justify-center rounded-md border border-solid bg-neutral-200 text-center text-2xl ${
      isWritingCode && fullRecoveryKey.length === index
         ? "shadow border-cyan-500 border-2"
         : ""
   }`}
>
   {fullRecoveryKey[index]}
</p>
  )
}

export default CharInput