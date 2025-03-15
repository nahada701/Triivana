import React, { createContext, useState } from 'react'


export const addResponseContext=createContext()
export const addReviewContext=createContext()
export const updateReviewContext=createContext()
export const deleteResponseContext=createContext()
export const editHotelResponseContext=createContext()
export const editRoomResponseContext=createContext()
export const addRoomResponseContext=createContext()




function ContextApi({children}) {
    const [addResponse,setAddResponse]=useState()
    const [addReview,setAddReview]=useState()
    const [updateReview,setUpdateReview]=useState()
    const [deleteResponse,setDeleteResponse]=useState()
    const [editHotelResponse,setEditHotelResponse]=useState()
    const [editRoomResponse,setEditRoomResponse]=useState()
    const [addRoomResponse,setaddRoomResponse]=useState()

    



 
  return (
    <div>
        <addResponseContext.Provider value={{addResponse,setAddResponse}} >
        
           <deleteResponseContext.Provider value={{deleteResponse,setDeleteResponse}}>
              <addReviewContext.Provider  value={{addReview,setAddReview}}>
               <updateReviewContext.Provider value={{updateReview,setUpdateReview}}> 
               <editHotelResponseContext.Provider value={{editHotelResponse,setEditHotelResponse}}> 
               <editRoomResponseContext.Provider value={{editRoomResponse,setEditRoomResponse}}> 
                <addRoomResponseContext.Provider value={{addRoomResponse,setaddRoomResponse}}>{children}</addRoomResponseContext.Provider>
                </editRoomResponseContext.Provider>
                </editHotelResponseContext.Provider>
                </updateReviewContext.Provider>
                </addReviewContext.Provider>
         
           </deleteResponseContext.Provider>
        </addResponseContext.Provider>
    </div>
  )
}

export default ContextApi 