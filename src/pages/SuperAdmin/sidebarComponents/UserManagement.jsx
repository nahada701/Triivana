import React, {  useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllUsersApi } from '../../../Services/allApi'
import Spinner from '../../../components/Shared/Spinner'

function UserManagement() {

    const [allUsers,setAllUsers]=useState()
    useEffect(() => {
     getAllUsers()
    }, [])
    
  
      const getAllUsers = async () => {
        const token = sessionStorage.getItem("superAdminToken")
        if (token) {
          const reqHeader = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
    
          }
    
          try {
    
            const result = await getAllUsersApi(reqHeader)
            setAllUsers(result.data)
           
    
          } catch (error) {
            console.log(error);
    
          }
        } else {
          console.log("permission denied");
    
        }
      }
    
  return (
    <div>
           <div>
        <div className='' >
            <h3 className='text-center '>Users List</h3>
            {
                allUsers?.length>0?
            <table className='table'>
                <thead>
                    <tr>
                        <th>#id</th>
                        <th>Name</th>
                        <th>email</th>
                        <th>Registerd Date</th>
                        <th>Booking history</th>
                        <th>Action</th>
                       


                    </tr>
                </thead>
                 <tbody> 
                    {
                        allUsers?.length>0 &&
                        allUsers.map((user)=>(
                            <tr>
                            <td>{user?._id}</td>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>{user?.createdAt.split('T')[0]}</td>
                            <th><button className='btn text-primary'>Click</button></th>
    
                            <td>
                                <div className='d-flex gap-2 flex-wrap'>
                                    {
                                        user.isBanned?
                                    <button className='btn btn-sucess '>Unban</button>

                                        :
                                    <button className='btn btn-danger '>Banuser</button>
                                    }
    
                                </div>
                            </td>
                            
    
                        </tr>
                        ))
                      
                 
                    }
                    
                </tbody>
                
            </table>
                :
                <Spinner/>
            }
        </div>
    </div>
    </div>
  )
}

export default UserManagement