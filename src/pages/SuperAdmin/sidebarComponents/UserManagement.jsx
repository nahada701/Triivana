import React from 'react'
import { Link } from 'react-router-dom'

function UserManagement() {
  return (
    <div>
           <div>
        <div className='' >
            <h3 className='text-center '>Property owners List</h3>
            <table className='table'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>email</th>
                        <th>Registerd Date</th>
                        <th>Booking history</th>
                        <th>Ban/Unban</th>
                       


                    </tr>
                </thead>
                 <tbody> 
                    <tr>
                        <td>1</td>
                        <td>Nahada</td>
                        <td>anahadac701@gmail.com</td>
                        <td>12/2/2020</td>
                        <th><Link>Click</Link></th>

                        <td>
                            <div className='d-flex gap-2 flex-wrap'>
                                <button className='btn btn-danger '>Banuser</button>

                            </div>
                        </td>
                        

                    </tr>
                </tbody>
                
            </table>
        </div>
    </div>
    </div>
  )
}

export default UserManagement