import React, { createContext, useState } from 'react'


export const addResponseContext=createContext()
export const addReviewContext=createContext()

export const deleteResponseContext=createContext()


function ContextApi({children}) {
    const [addResponse,setAddResponse]=useState()
    const [addReview,setAddReview]=useState()

    const [deleteResponse,setDeleteResponse]=useState()

 
  return (
    <div>
        <addResponseContext.Provider value={{addResponse,setAddResponse}} >
        
           <deleteResponseContext.Provider value={{deleteResponse,setDeleteResponse}}>
              <addReviewContext.Provider  value={{addReview,setAddReview}}>{children}</addReviewContext.Provider>
         
           </deleteResponseContext.Provider>
        </addResponseContext.Provider>
    </div>
  )
}

export default ContextApi 