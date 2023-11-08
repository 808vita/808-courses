import React, { ReactNode } from 'react'
interface Props {
    children: ReactNode;
  }


const BadgeWrapComponent = ({children}:Props) => {
  return (
    <span className="badge rounded-pill text-bg-light m-2 p-2 fw-light text-wrap"> 
    {children}
    </span>
  )
}

export default BadgeWrapComponent