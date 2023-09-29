import React from 'react'

const Adminhero = ({pageName}) => {
  return (
    <>
      <div className="container mb-5">
        <h3>Welcome to the {pageName}</h3>
        <div>
            <p><a href="/admin">Home</a> / {pageName}</p>
        </div>
      </div>
    </>
  )
}

export default Adminhero