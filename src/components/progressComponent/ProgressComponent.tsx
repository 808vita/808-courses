import React from 'react'

interface Props {
    [key: string]: any;
  }

const ProgressComponent = ({enrollementData}:Props) => {
  return (
    <>
    
    {enrollementData?.progress && (
          <div
            className="progress"
            role="progressbar"
            aria-label="Basic example"
          >
            <div
              className="progress-bar bg-success"
              style={{
                width: `${
                  enrollementData?.progress === "completed" ? "100" : "35"
                }%`,
              }}
            >{`${
              enrollementData?.progress === "completed" ? "100" : "35"
            }%`}</div>
          </div>
        )}
    </>
  )
}

export default ProgressComponent