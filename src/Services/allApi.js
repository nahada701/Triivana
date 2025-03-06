import commenApi from "./commenApi";
import serverURL from "./ServerURL";

export const userRegisterApi=async(reqBody)=>{
    return await commenApi("POST",`${serverURL}/register-user`,reqBody)
}

export const userLoginApi=async(reqBody)=>{
    return await commenApi("POST",`${serverURL}/login-user`,reqBody)
}

export const adminRegisterApi=async(reqBody)=>{
    return await commenApi("POST",`${serverURL}/admin-register`,reqBody)
}

export const adminLoginApi=async(reqBody)=>{
    return await commenApi("POST",`${serverURL}/admin-login`,reqBody)
}

export const addHotelApi=async(reqBody,reqHeader)=>{
    return await commenApi("POST",`${serverURL}/addhotel`,reqBody,reqHeader)
}

export const addRoomsApi=async(reqBody,reqHeader)=>{
    return await commenApi("POST",`${serverURL}/addrooms`,reqBody,reqHeader)
}

export const getAdminHotelsDetailsApi=async(reqHeader)=>{
    return await commenApi("GET",`${serverURL}/get-owner-hotelsdetails`,"",reqHeader)
}

export const deleteProperyApi=async(_id,reqHeader)=>{
    return await commenApi("DELETE",`${serverURL}/delete-hotel`,{_id},reqHeader)

}
export const deleteRoomApi=async(_id,reqHeader)=>{
    return await commenApi("DELETE",`${serverURL}/delete-room`,{_id},reqHeader)

}

export const getAllApprovedHotelsApi=async()=>{
    return await commenApi("GET",`${serverURL}/get-all-hotels`)

    
}

export const addReviewApi=async(reqBody,reqHeader)=>{
    return await commenApi("POST",`${serverURL}/add-review`,reqBody,reqHeader)
}

export const getSingleHotelsApi=async(id)=>{
    return await commenApi("GET",`${serverURL}/get-single-hotel/${id}`)
}

export const LoginSuperAdminApi=async(reqBody)=>{
    return await commenApi("POST",`${serverURL}/super-admin-login`,reqBody)
}



export const getAllOwnersApi=async(reqHeader)=>{
    return await commenApi("GET",`${serverURL}/get-all-propertyowners`,"",reqHeader)
}

export const getAllReviewsApi=async(reqHeader)=>{
    return await commenApi("GET",`${serverURL}/get-all-reviews`,"",reqHeader)
}

export const updateReviewApi=async(reqBody,reqHeader)=>{
    return await commenApi("PUT",`${serverURL}/update-review`,reqBody,reqHeader)
}
export const getAllHotelsApi=async(reqHeader)=>{
    return await commenApi("GET",`${serverURL}/all-hotels-super-admin`,"",reqHeader)
}

export const updateHotelStatusApi=async(reqBody,reqHeader)=>{
    return await commenApi("PUT",`${serverURL}/update-hotel-status`,reqBody,reqHeader)
}

export const checkRoomAvailabilityApi=async(reqBody,reqHeader)=>{
    return await commenApi("POST",`${serverURL}/check-room-availability`,reqBody,reqHeader)
}


export const BookRoomApi=async(params,reqBody,reqHeader)=>{
    return await commenApi("POST",`${serverURL}/newbooking/${params.hotelId}/${params.roomId}`,reqBody,reqHeader)
}


export const bookingConfirmationEmailApi=async(reqBody,reqHeader)=>{
    return await commenApi("POST",`${serverURL}/booking-confirmation-email`,reqBody,reqHeader)
}

export const savePropetyApi=async(reqBody,reqHeader)=>{
    return await commenApi("PUT",`${serverURL}/save-property`,reqBody,reqHeader)
}

export const getUserSavedPropetyApi=async(reqHeader)=>{
    return await commenApi("GET",`${serverURL}/user/saved-properties`,"",reqHeader)
}

export const deleteUserSavedPropetyApi=async(hotelId,reqHeader)=>{
    return await commenApi("DELETE",`${serverURL}/remove/hotel/${hotelId}`,{},reqHeader)
}

export const getAlluserBookingsApi=async(reqHeader)=>{
    return await commenApi("GET",`${serverURL}/get-user-bookings`,{},reqHeader)
}

export const cancelBookingsApi=async(bookingId,reqHeader)=>{
    return await commenApi("PUT",`${serverURL}/cancel-booking/${bookingId}`,{},reqHeader)
}

export const dashboardDataApi=async(reqHeader)=>{
    return await commenApi("GET",`${serverURL}/super-admin-dashboard`,"",reqHeader)
}

export const getAllUsersApi=async(reqHeader)=>{
    return await commenApi("GET",`${serverURL}/get-all-users`,"",reqHeader)
}
