import React from 'react'

const Badge = (props) => {
  return (
    <>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {props.tag.slice(0,8)}
              </span>
    </>
  )
}

export default Badge
