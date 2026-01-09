import React from 'react'

type logoProps= {
  className? : string
}
const Logo = ({className}:logoProps) => {
  console.log(className);
  
  return (
     <div className={` text-white ${className ?? " text-lg lg:text-2xl pb-10"}`}>
        <h1 className="font-logo">
          <span className=" font-bold capitalize">snippethub</span>
          <span className="uppercase font-light text-buttonColor">_pro</span>
        </h1>
      </div>
  )
}

export default Logo
