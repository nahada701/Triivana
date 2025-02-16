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
    return await commenApi("GET",`${serverURL}/get-admin-hotelsdetails`,"",reqHeader)
}

export const deleteProperyApi=async(_id,reqHeader)=>{
    return await commenApi("DELETE",`${serverURL}/delete-hotel`,{_id},reqHeader)

}
export const deleteRoomApi=async(_id,reqHeader)=>{
    return await commenApi("DELETE",`${serverURL}/delete-room`,{_id},reqHeader)

}

export const getAllHotelsApi=async()=>{
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