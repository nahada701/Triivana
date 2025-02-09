import React, { createContext, useState } from 'react'


export const addResponseContext=createContext()
export const deleteResponseContext=createContext()


function ContextApi({children}) {
    const [addResponse,setAddResponse]=useState()
    const [deleteResponse,setDeleteResponse]=useState()

 
  return (
    <div>
        <addResponseContext.Provider value={{addResponse,setAddResponse}} >
        
           <deleteResponseContext.Provider value={{deleteResponse,setDeleteResponse}}>
              {children}
         
           </deleteResponseContext.Provider>
        </addResponseContext.Provider>
    </div>
  )
}

export default ContextApi 