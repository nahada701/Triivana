import React from 'react'
import PropagateLoader from "react-spinners/PropagateLoader";

function Spinner() {
  return (
    <div>
         <div className="d-flex justify-content-center my-5 py-5"><PropagateLoader /> </div>

    </div>
  )
}

export default Spinner