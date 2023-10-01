import React,{useState,useContext,useEffect} from 'react'
import {View,Text, TouchableOpacity} from 'react-native';
import {StyleSheet,TextInput,Image} from "react-native";
import Button from '../../components/Button'
import {notifyUser, phoneRegExp} from '../../constants';
import {LoginContext} from '../../context/login_context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/EvilIcons'
import { Checkbox } from 'native-base';

function ForgetPaswword(props) {
    const context = useContext(LoginContext)
    const [showPassword,setShowPassword] = useState(false)
    const [loginValue,setLoginValue] = useState({
        password: undefined,
        email: undefined,
        mobile: undefined,
        confirm_password: undefined,
        otp: undefined,
        isOtpSent: false,
        isOtpVerified: false
    })
    const [error,setError] = useState({
        email: false,
        password: false,
        mobile: false,
        confirm_password: false,
        otp: false,
        match_password: false
    })
    const submitForm = async () => {
        if(validateData()) {
            console.log(loginValue,"<<<<111")
            context.setBtnLoading(true)
            try{
                let sentData = {}
                if(loginValue.isOtpSent){
                    sentData = {otp: loginValue.otp,mobile:loginValue.mobile}
                }else if(loginValue.isOtpVerified){
                    sentData = {mobile:loginValue.mobile,password:loginValue.password}
                }else{
                    sentData = {mobile:loginValue.mobile}
                }
                console.log(sentData,"<<<<11sentData1")
                const res = await context.resetPassword(sentData)
                console.log(res,res.data,res.data.status,"<<<<<<<<<<<<<<<register")
                if(res.data.status === "success") {
                    notifyUser("Password changes sucessful")
                    props.navigation.replace('Login')
                }else if(res?.data?.status === "otp_sent"){
                    notifyUser("Otp sent on your mobile number")
                    setLoginValue({...loginValue,isOtpSent:true})
                }else if(res?.data?.status === "otp_verified"){
                    notifyUser("Otp verified sucessful")
                    setLoginValue({...loginValue,isOtpSent:false,isOtpVerified:true})
                }
                 else if(res.data.status?.error){
                    alert(res.data.status?.error)
                }
            }catch(err){
                alert("Somethings wrong please try again")
                // props.navigation.replace('Login')
            }
        }
        context.setBtnLoading(false)
    }
    const validateData = () => {
        const errors = {
            email: false,
            password: false,
            mobile: false,
            confirm_password: false,
            otp: false,
            match_password: false
        }
        if(loginValue.isOtpSent){
            if(!loginValue.otp) {
                setError({...errors,otp: true})
                return false
            }
        }else if(loginValue.isOtpVerified){
            if(!loginValue.password) {
                setError({...errors,password: true})
                return false
            } else if(!loginValue.confirm_password) {
                setError({...errors,confirm_password: true})
                return false
            }else if(loginValue.password !== loginValue.confirm_password){
                setError({...errors,match_password: true})
                return false
            }
        }else{
            if(!phoneRegExp.test(loginValue.mobile)) {
                setError({...errors,mobile: true})
                return false
            }
        }
        setError({
            ...errors
        })
        return true
    }
    
    useEffect(() => {
        
    },[])

    const showAndHidePassowrd = () => {
        setShowPassword(!showPassword)
    }
    console.log(`<<<<<<<<<<`,showPassword)
    return (
        <View style={styles.container}>
            <Image
                style={{width: 200,height: 200}}
                source={require('../../assets/logo/astrologo.png')}
            />
            {!loginValue.isOtpSent && !loginValue.isOtpVerified &&
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Mobile *</Text>
                    <TextInput
                        style={{...styles.input}}
                        placeholder='Enter valid mobile number'
                        value={loginValue.email}
                        onChangeText={(value) => setLoginValue({...loginValue,mobile: value})}
                        keyboardType='numeric'
                        maxLength={10}
                    />
                    {error?.mobile &&
                        <Text style={{color: 'red',textAlign: 'left',width: '80%',fontSize: 12}}>Enter valid mobile number.</Text>
                    }
                </View>
                }
                    {loginValue.isOtpVerified &&
                <>
                    <View style={{...styles.inputContainer,position: 'relative'}}>
                        <Text style={styles.inputLabel}> New Password *</Text>
                        <TextInput
                            style={{...styles.input}}
                            secureTextEntry={!showPassword}
                            placeholder='Enter valid passowrd'
                            keyboardType='default'
                            onChangeText={(value) => setLoginValue({...loginValue,password: value})}
                        />
                        {error?.password &&
                            <Text style={{color: 'red',textAlign: 'left',width: '80%',fontSize: 12}}>Enter valid password.</Text>
                        }
                        {/* <Checkbox name='paswword' value={showPassword.password} onChange={()=>showAndHidePassowrd("password")} >Show Password </Checkbox> */}
                        {/* {(showPassword) ? <Icon name="eye" size={30} color="darkgrey" style={{position: 'absolute',right: 10,top: 35}} onPress={showAndHidePassowrd} /> : <Icon name="eye-off" size={30} color="darkgrey" style={{position: 'absolute',right: 10,top: 35}} onPress={showAndHidePassowrd} />} */}
                    </View>
                    <View style={{...styles.inputContainer,position: 'relative'}}>
                        <Text style={styles.inputLabel}>Confirm Password *</Text>
                        <TextInput
                            style={{...styles.input}}
                            secureTextEntry={!showPassword}
                            placeholder='Enter valid password'
                            keyboardType='default'
                            onChangeText={(value) => setLoginValue({...loginValue,confirm_password: value})}
                        />
                        {error?.confirm_password &&
                            <Text style={{color: 'red',textAlign: 'left',width: '80%',fontSize: 12}}>Enter valid confirm password.</Text>
                        }
                        {error?.match_password &&
                            <Text style={{color: 'red',textAlign: 'left',width: '80%',fontSize: 12}}>Password does not matches!.</Text>
                        }
                        <Checkbox name='confirm_aswword' value={showPassword} onChange={()=>showAndHidePassowrd()} >Show Password </Checkbox>
                        {/* {(showPassword).confirm_password ? <Icon name="eye" size={30} color="darkgrey" style={{position: 'absolute',right: 10,top: 35}} onPress={showAndHidePassowrd} /> : <Icon name="eye-off" size={30} color="darkgrey" style={{position: 'absolute',right: 10,top: 35}} onPress={showAndHidePassowrd} />} */}
                    </View>
                </>}
                {loginValue.isOtpSent &&
                    <View style={{...styles.inputContainer,position: 'relative'}}>
                        <Text style={styles.inputLabel}>Enter Otp *</Text>
                        <TextInput
                            style={{...styles.input}}
                            keyboardType='numeric'
                            maxLength={10}
                            onChangeText={(value) => setLoginValue({...loginValue,otp: value})}
                        />
                        {error?.otp &&
                            <Text style={{color: 'red',textAlign: 'left',width: '80%',fontSize: 12}}>Enter valid otp.</Text>
                        }
                    </View>
                }
                <Button text={loginValue.isOtpSent ? "Verify" : loginValue.isOtpVerified ? "Submit" : "Sent Otp"} color={'blue'} borderRadius={10} height={50} width={'40%'} marginTop={20} onPress={()=>submitForm()} isLoading={context.btnLoading}></Button>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        height: 50,
        borderRadius: 5,
        width: '100%',
        color: '#000',
        backgroundColor: '#f5f6f8',
        borderColor: '#f5f6f8'
    },
    container: {
        backgroundColor: '#fff',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        height: 50,
        borderRadius: 20,
        width: '40%',
        backgroundColor: '#8BC53F',
        marginTop: 30,
    },
    inputContainer: {
        width: '80%',
        paddingTop: 5,
        paddingBottom: 5,
    },
    inputLabel: {
        color: '#000',
        width: '100%'
    }
});
export default ForgetPaswword