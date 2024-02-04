import React from 'react'

const PreRegisterTitle = ({
   children
}: {
   children: React.ReactNode
}) => {
  return (
   <h1 className="sm:text-2xl h-16 flex items-center sm:w-auto w-40 text-center font-semibold text-neutral-800 absolute top-0 right-0 sm:static">{children}</h1>
  )
}

export default PreRegisterTitle
