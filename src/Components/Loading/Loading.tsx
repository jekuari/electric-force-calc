import React from 'react'

const Loading = ({className, strokeClass} : {
   className?: string,
   strokeClass?: string
}) => {
  return (
   <div className={`${className || "h-16 w-16"} border-solid  ${strokeClass ? strokeClass : "border-white border-2"} border-t-transparent rounded-full animate-spin `}></div>
  )
}

export default Loading