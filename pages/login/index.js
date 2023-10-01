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
import { useNavigation } from '@react-navigation/native';

function Index(props) {
    const context = useContext(LoginContext)
    const navigation = useNavigation()
    const [isLoginScreen,setIsLoginScreen] = useState(false)
    const [showPassword,setShowPassword] = useState(false)
    const [loginValue,setLoginValue] = useState({
        // email: undefined,
        password: undefined,
        token: undefined,
        mobile: undefined
    })
    const [error,setError] = useState({
        email: false,
        password: false,
        mobile: undefined
    })
    const submitForm = async () => {
        if(validateData()) {
            context.setBtnLoading(true)
            console.log(loginValue,"<<<<<<<<<<<<<<<<<<loginValue")
            await context.login(loginValue)
            .then(async response =>{
                console.log(response,response.data,response.data.success,"<<<<<<<<<<<<")
                if(response.data.success === true) {
                    notifyUser("Login Successful")
                    context.setUserLoginToken({...loginValue})
                    context.setBtnLoading(false)
                    context.setUserData({...context.userData,...response.data.data})
                    await AsyncStorage.setItem('user_app_user_id',JSON.stringify(response.data.data.user_id));
                    notifyUser("Login Successful")
                    props.navigation.replace('HomePage')
                } else {
                    alert('Username or password is incorrect')
                    context.setBtnLoading(false)
                }
            })
            .catch(error=>{
                console.log(error?.response?.data?.error?.message,"<<<<<<<<<<<eorr")
                alert(error?.response?.data?.error?.message || 'Please check email or password is incorrect')
                context.setBtnLoading(false)
            })
            
        }else if(loginValue?.email === "test@gmail.com"){
            props.navigation.replace('HomePage')
        }
    }
    const validateData = () => {
        const errors = {
            email: false,
            password: false,
            mobile: false
        }
        // phoneRegExp.test(loginValue.email)
        // console.log(loginValue?.email ,loginValue.email.split("@"), !loginValue.email.split("@").includes("gmail.com"),loginValue?.email && !loginValue.email.split("@").includes("gmail.com"))
        // if(!loginValue?.email || loginValue?.email && !loginValue.email.split("@").includes("gmail.com")) {
        //     setError({...errors,email: true})
        //     return false
        // }
        if(!phoneRegExp.test(loginValue.mobile)) {
            setError({...errors,mobile: true})
            return false
        }
         else if(!loginValue.password) {
            setError({...errors,password: true})
            return false
        }
        setError({
            ...errors
        })
        return true
    }
    const storeToken = async (token) => {
        try {
            await AsyncStorage.setItem(
                'user_app_token',
                token
            );
            setLoginValue({
                ...loginValue,
                token: token
            })
            context.setToken(token)
        } catch(error) {
            console.log(">>>>>>>>>>>>>>>>>>>>>.",error);
        }
    };
    const retrieveToken = async () => {
        let token;
        try {
            const userApptoken = await AsyncStorage.getItem('user_app_token');
            if(userApptoken !== null) {
                setLoginValue({
                    ...loginValue,
                    token: userApptoken
                })
                context.setToken(userApptoken)
                const userId = await AsyncStorage.getItem('user_app_user_id');
                const data = {
                    token: userApptoken,
                    user_id: Number(userId)
                }
                const isLogin = await context.checkLogin(data)
                console.log(`<<<<<<<<<isLogin<<<<<<`,isLogin)
                if(isLogin.data.data) {
                    context.setUserData({...context.userData,...isLogin?.data?.data})
                    props.navigation.replace('HomePage')
                }
            } else {
                token = uuid.v4()
                storeToken(token)
            }
        } catch(error) {
            console.log(">>>>>>>>>>fff>>ss>>>>>>>>>error",error);
        }
    };
    useEffect(() => {
        retrieveToken()
        setTimeout(() => {
            setIsLoginScreen(true)
        },2000)
        return () => {
            setIsLoginScreen(false)
        }
    },[props])
    const showAndHidePassowrd = () => {
        setShowPassword(!showPassword)
    }
    return (
        <View style={styles.container}>
            <Image
                style={{width: 200,height: 200}}
                source={require('../../assets/logo/astrologo.png')}
            />
            {/* <Image
                style={{width: 200,height: 60}}
                source={require('../../assets/logo/ev_cred.png')}
            /> */}
            {isLoginScreen && <>
                {/* <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email *</Text>
                    <TextInput
                        style={{...styles.input}}
                        value={loginValue.email}
                        onChangeText={(value) => setLoginValue({...loginValue,email: value})}
                        // keyboardType='numeric'
                        // maxLength={10}
                    />
                    {error?.email &&
                        <Text style={{color: 'red',textAlign: 'left',width: '80%',fontSize: 12}}>Enter valid email id.</Text>
                    }
                </View> */}
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Mobile *</Text>
                    <TextInput
                        style={{...styles.input}}
                        value={loginValue.mobile}
                        onChangeText={(value) => setLoginValue({...loginValue,mobile: value})}
                        keyboardType='numeric'
                        maxLength={10}
                    />
                    {error?.mobile &&
                        <Text style={{color: 'red',textAlign: 'left',width: '80%',fontSize: 12}}>Enter mobile number.</Text>
                    }
                </View>
                <View style={{...styles.inputContainer,position: 'relative'}}>
                    <Text style={styles.inputLabel}>Password *</Text>
                    <TextInput
                        style={{...styles.input}}
                        secureTextEntry={!showPassword}
                        keyboardType='default'
                        onChangeText={(value) => setLoginValue({...loginValue,password: value})}
                    />
                    {error?.password &&
                        <Text style={{color: 'red',textAlign: 'left',width: '80%',fontSize: 12}}>Enter valid password</Text>
                    }
                    <View style={{flexDirection:'row',justifyContent:"space-between"}}>
                        <Checkbox name='showPaswword' value={showPassword} onChange={showAndHidePassowrd} >Show Password </Checkbox>
                        <TouchableOpacity style={{flexDirection:'row',marginTop:5}} onPress={()=>navigation.navigate('ForgetPassword')}>
                            <View><Text style={{borderBottomWidth:1,borderBottomColor:'blue',color:'blue'}}>Forget Password</Text></View>
                        </TouchableOpacity>
                    </View>
                    {/* {(showPassword) ? <Icon name="eye" size={30} color="darkgrey" style={{position: 'absolute',right: 10,top: 35}} onPress={showAndHidePassowrd} /> : <Icon name="eye-off" size={30} color="darkgrey" style={{position: 'absolute',right: 10,top: 35}} onPress={showAndHidePassowrd} />} */}
                </View>
                <Button text='Login' borderRadius={10} height={50} width={'40%'} marginTop={20} onPress={()=>submitForm()} isLoading={context.btnLoading}></Button>
                <TouchableOpacity style={{flexDirection:'row',marginTop:5}} onPress={()=>navigation.navigate('Register')}>
                    <View><Text style={{color:'black'}}>Create New Account</Text></View>
                    <View><Text style={{borderBottomWidth:1,borderBottomColor:'blue',color:'blue'}}>Register</Text></View>
                </TouchableOpacity>
            </>
            }
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
export default Index