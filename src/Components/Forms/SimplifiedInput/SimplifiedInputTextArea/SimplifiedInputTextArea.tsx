import React from 'react'
import SimplifiedInputTemplate from '../SimplifiedInputTemplate.js'

const SimplifiedInputTextArea = ({
   title,
   value,
setter,
}: {
   title: string
   value?: string
   setter?: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
   <SimplifiedInputTemplate title={title}>
      <textarea
         className="w-full h-32 p-4 rounded bg-neutral-200 text-neutral-800 outline outline-1 outline-neutral-300 resize-none"
         value={value}
         onChange={(e) => setter && setter(e.target.value)}
      />
   </SimplifiedInputTemplate>
  )
}

export default SimplifiedInputTextArea