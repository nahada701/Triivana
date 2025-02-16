import React from 'react'

function PropertOwners() {
    return (
        <div>
            <div className='' >
                <h3 className='text-center '>Property owners List</h3>
               <div className='table-responsive'>
                    <table className='table table-responsive'>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>email</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Nahada</td>
                                <td>C</td>
                                <td>anahadac701@gmail.com</td>
                                <td>
                                    <div className='d-flex gap-2 flex-wrap'>
                                        <button className='btn btn-success '><i className='fa-solid fa-check text-light' ></i></button>
                                        <button className='btn btn-danger'><i className='fa-solid fa-xmark text-light'></i></button>
    
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

export default PropertOwners