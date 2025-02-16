import React from 'react'

function DashboardSuperAdmin() {
    
  return (
    <div>
        <div className="p-5">
            <div className="">
                <div className='row w-100'>
                    <div className="text-center w-100  mb-3 col-lg-6 p-4  shadow">
                        <h4>Number of users</h4>
                        <h4 className='fw-bold'>8783</h4>
                    </div>
                    <div className="text-center w-100  mb-3 col-lg-6 p-4  shadow">
                        <h4>Number of Propery owners</h4>
                        <h4 className='fw-bold'>77</h4>
                    </div><div className="text-center w-100  mb-3 col-lg-6 p-4  shadow">
                        <h4>Number of Properies</h4>
                        <h4 className='fw-bold'>930</h4>
                    </div><div className="text-center w-100  mb-3 col-lg-6 p-4  shadow">
                        <h4>Total booking</h4>
                        <h4 className='fw-bold'>7083</h4>
                    </div>
                
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardSuperAdmin