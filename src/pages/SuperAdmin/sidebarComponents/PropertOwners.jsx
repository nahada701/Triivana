import React, { useEffect, useState } from 'react'
import { getAllOwnersApi } from '../../../Services/allApi'
import {  } from 'react-router-dom'

function PropertOwners() {


    const[properyOwner,setPropertyOwners]=useState()

    useEffect(() => {
        getAllOwners()
    }, [])

    const getAllOwners=async()=>{
        const token=sessionStorage.getItem("superAdminToken")
        const reqHeader = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
  
          }
        if(token) {
            try {
            const result=await getAllOwnersApi(reqHeader) 
           setPropertyOwners(result.data)
           
        } catch (error) {
            console.log(error,"this is error");
            
        }}
        
    }
    
    return (
        <div>
            <div className='' >
                <h3 className='text-center '>Property owners List</h3>
               <div className='table-responsive'>
                   {properyOwner?.length>0?  <table className='table table-responsive'>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>email</th>
                                <th>Approved Hotels</th>
                                {/* <th>Ban/Unban</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                properyOwner?.length>0&&
                                properyOwner.map((owner,index)=>(
                                    <tr>
                                    <td>{index+1}</td>
                                    <td>{owner?.firstname}</td>
                                    <td>{owner?.lastname}</td>
                                    <td>{owner?.email}</td>
                                    <td>
                                        {owner?.approvedHotels?.length>0?
                                       owner?.approvedHotels?.map(hotel => hotel?.propertyname).join(', ')
                                       :
                                       <p className='text-danger'>No approved hotels</p>
                                    }
                                    </td>
                                    {/* <td>
                                        <button className='btn btn-danger'>Ban Owner</button>
                                    </td> */}
        
        
        
                                </tr>
                            
                                ))
                                
                            }
                           
                        </tbody>
    
                    </table>
                    :
                    <h3  className='text-center mt-5'>Loading...</h3>

                    }
               </div>
            </div>
        </div>
    )
}

export default PropertOwners