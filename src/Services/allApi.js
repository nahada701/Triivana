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