import axios from 'axios';
import React,{createContext,useState,useEffect} from 'react'
import {FILE_UPLOAD_TYPE, STATE, TYPE} from '../constants';
import moment from 'moment';
import {get,isEmpty} from 'lodash';
import ENV from '../env.json'
import uuid from 'react-native-uuid';
import FormData from 'form-data';
import { AGORA_APP_ID, CHANNEL_NAME } from '../config';

export const LoginContext = createContext();

function LoginContextProvider(props) {
//   const docList = [
//     {
//       key: FILE_UPLOAD_TYPE.BANK_STATEMENT,
//       label: 'Bank Statement'
//     },
//   ]
 
  const [btnLoading,setBtnLoading] = useState(false)
  const [token,setToken] = useState()
  const [userData,setUserData] = useState({
    name: undefined,
    mobile: undefined,
    gender: undefined,
    user_id: undefined,
    dob: undefined,
    email: undefined,
    user_type: undefined,
  })
  const [userLoginToken,setUserLoginToken] = useState({})

  useEffect(() => {
    setBtnLoading(false)
    // if(token && userData?.user_id) {
    //   get()
    // }
  },[token]);

  const login = async (loginValue) => {
    console.log(loginValue,"login  value")
    return await axios.post(`${ENV.site_api}/login`,loginValue)
  }

  const getUserData = async () => {
    return await axios.get(`${ENV.site_api}/get_user/${userData.user_id}`,{
      headers: {
        "token": token,
        "user": userData.user_id
      }
    })
  }  

  const checkLogin = async (data) => {
    return await axios.post(`${ENV.site_api}/app_login`,data)
  }

  const registerUser = async (data) => {
    console.log(data,"<<<<<<<<<<<<<name")
    return await axios.post(`${ENV.site_api}/register`,data)
  }

  const logout = async () => {
    return await axios.post(`${ENV.site_api}/app_logout/${userData.user_id}`,{
      headers: {
        "token": token,
        "user": userData.user_id
      }
    })
  }

  const getAllAstrolger = async(userType) =>{
    return await axios.get(`${ENV.site_api}/get_all_profile/${userType}`,{
      headers: {
        "token": token,
        "user": userData.user_id
      }
    })
  }

  const resetPassword = async (data) => {
    console.log(data,"<<<<<<<<<<<<<name")
    return await axios.post(`${ENV.site_api}/reset_password`,data)
  }

  const getProfileDetailsByuserId = async (userId) =>{
    console.log(userId,"<<<<<<<<addmoreDetails")
    return await axios.get(`${ENV.site_api}/get_profile/${userId}`,{
      headers: {
        "token": token,
        "user": userData.user_id
      }
    })
  }

  const addMoreDetails = async (data) =>{
    console.log(data,"<<<<<<<<addmoreDetails")
    return await axios.post(`${ENV.site_api}/upsert_details`,data)
  }

  const getAllMoreDetails = async() =>{
    return await axios.get(`${ENV.site_api}/get_details/${userData.user_id}`,{
      headers: {
        "token": token,
        "user": userData.user_id
      }
    })
  }

  const agoraAuth = async() =>{
    const data = {
      "appid": AGORA_APP_ID,
      "cname": CHANNEL_NAME,
      "uid": token,
      "ip": "",
      "time": 60,
      "privileges": [
        "join_channel"
      ]
    }
    try{
      const auth = await axios.get(`${ENV.site_api}/agora/auth`,{
        headers: {
          "token": token,
          "user": userData.user_id
        }
      })
      // const result = await axios.post(`https://api.agora.io/dev/v1/kicking-rule`,data)
      console.log(auth,"<<<<<<<<<<<<<<<,,,")
    }catch(err){
      console.log(err?.response?.data?.error?.message,"<<<<<<<<errr")
    }
    
    
  }

  return (
    <LoginContext.Provider
      value={{
        userData,
        setUserData,
        userLoginToken,
        setUserLoginToken,
        btnLoading,
        login,
        setBtnLoading,
        setToken,
        getUserData,
        checkLogin,
        registerUser,
        logout,
        getAllAstrolger,
        resetPassword,
        addMoreDetails,
        getProfileDetailsByuserId,
        getAllMoreDetails,
        agoraAuth
      }}
    >{props.children}</LoginContext.Provider>
  )
}

export default LoginContextProvider