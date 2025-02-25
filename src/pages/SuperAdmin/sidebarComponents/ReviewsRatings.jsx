import React, { useContext, useEffect, useState } from 'react'
import { getAllReviewsApi, updateReviewApi } from '../../../Services/allApi'
import { addReviewContext, updateReviewContext } from '../../../context/ContextApi'

function ReviewsRatings() {

const{addReview,setAddReview}=useContext(addReviewContext)
const{updateReview,setUpdateReview}=useContext(updateReviewContext)


    const [allReviews, setAllReviews] = useState()
    const [pendingReviews, setPendingReviews] = useState()
    const [approvedReviews, setApprovedReviews] = useState()


    useEffect(() => {
        getAllReviews()
    }, [addReview,updateReview])

    const getAllReviews = async () => {
        const token = sessionStorage.getItem("superAdminToken")
        const reqHeader = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"

        }
        if (token) {
            try {
                const result = await getAllReviewsApi(reqHeader)
                setAllReviews(result.data)
                setPendingReviews(result.data?.filter(review => review.status === "pending"))
                setApprovedReviews(result.data?.filter(review => review.status === "approved"))


            } catch (error) {
                console.log(error, "this is error");

            }
        }

    }

    const handleUpdateReview=async(id,status)=>{
        const token = sessionStorage.getItem("superAdminToken")
        const reqHeader = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"

        }
        if(token){
            try {
                const result =await updateReviewApi({id,status},reqHeader)
                console.log(result);
                setUpdateReview(result.data)
                
            } catch (error) {
                console.log(error);
                
            }
        }
       

    }
    return (
        <div>
            <h3 className='text-center'>Review requests</h3>
            <div className='row'>

                {pendingReviews?.length > 0 &&
                    pendingReviews.map(review => (
                        <div className="col-lg-3 mb-3">
                            <div className="card p-2">
                                <h6 style={{ fontSize: "15px" }}>{review?.hotelId.propertyname}</h6>
                                <h6 className='p-0 m-0'>{review?.userId.name}</h6>
                                <span style={{ fontSize: "14px" }}>{review?.createdAt.split("T")[0]}</span>
                                <h6>
                                    {Array.from({ length: review?.rating }).map((_, i) => (
                                        <i className='fa-solid fa-star text-warning'></i>
                                    ))}



                                </h6>
                                <p style={{ fontSize: "13px", color: "black" }}>{review?.comment} </p>
                                <div className='d-flex gap-2  flex-wrap'>
                                    <button className='btn btn-success ' onClick={() => handleUpdateReview(review?._id,"approved")}>Aprove <i className='fa-solid fa-check text-light' ></i></button>
                                    <button className='btn btn-danger' onClick={() => handleUpdateReview(review?._id,"rejected")}> <i className='fa-solid fa-xmark text-light'></i>Reject</button>

                                </div>

                            </div>
                        </div>
                    ))
                }
            </div>



            <div className='' >
                <h3 className='text-center '>Reviews table</h3>
                <div className='table-responsive'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Property Name</th>
                                <th>Username </th>
                                <th>Review</th>
                                <th>Rating</th>

                            </tr>
                        </thead>
                        <tbody>
                            {approvedReviews?.length > 0 &&
                                approvedReviews.map((review, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{review?.hotelId.propertyname}</td>
                                        <td>{review?.userId.name} </td>
                                        <td>{review?.comment}</td>
                                        <td>{review?.rating}</td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    )
}

export default ReviewsRatings