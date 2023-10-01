import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image,Text,View} from 'native-base';
import Login from './pages/login/index'
import HomePage from './pages/home/index'
import Register from './pages/register/index'
import { TouchableOpacity, useColorScheme } from 'react-native';
import Profile from "./pages/profile/index"
import { useNavigation } from '@react-navigation/native';
import ForgetPassword from './pages/forget/password'
import { LoginContext } from './context/login_context';
import { notifyUser } from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MoreDetails from './pages/AddMore/more';
import LiveHome from './pages/live/live_home';
import Live from './pages/live/live_screen';
import ViewMore from './pages/viewMore/view_more';

const Stack = createNativeStackNavigator();


function StackNavigator(props) {
  const navigation = useNavigation()
  const context = React.useContext(LoginContext)

  const logout = async() =>{
    await AsyncStorage.removeItem(
      'user_app_token',
    );
    await AsyncStorage.removeItem(
      'user_app_user_id',
    );
    await context.logout()
    context.setUserData({
      name: undefined,
      mobile: undefined,
      gender: undefined,
      user_id: undefined,
      dob: undefined,
      email: undefined,
      user_type: undefined
    })
    notifyUser("Logout successful")
    navigation.navigate("Login")
  }
  
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login}
        options={{
          headerTitle: (props) => (
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              <Image
                style={{width: 40,height: 50}}
                source={require('./assets/logo/astrologo.png')}
                resizeMode='contain' alt='....' />
              <Text style={{fontSize: 20,fontWeight: 'bold',marginLeft: 2,marginTop: 5}}>Login</Text>
            </View>
          ),
          headerBackVisible:false
        }}
      />
      <Stack.Screen name="Register" component={Register}
        options={{
          headerTitle: (props) => (
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              {/* <Image
                style={{width: 40,height: 50}}
                source={logoImage}
                resizeMode='contain' alt='....' /> */}
              <Text style={{fontSize: 20,fontWeight: 'bold',marginLeft: 2,marginTop: 5}}>Register</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword}
        options={{
          headerTitle: (props) => (
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              {/* <Image
                style={{width: 40,height: 50}}
                source={logoImage}
                resizeMode='contain' alt='....' /> */}
              <Text style={{fontSize: 20,fontWeight: 'bold',marginLeft: 2,marginTop: 5}}>Forget Password</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerTitle: (props) => (
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              <Image
                style={{width: 40,height: 50}}
                source={require('./assets/logo/astrologo.png')}
                resizeMode='contain' alt='....' />
              <Text style={{fontSize: 20,fontWeight: 'bold',marginLeft: 2,marginTop: 5}}>Astrology</Text>
            </View>
          ),
          headerRight:(props) =>(
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}} >
              <TouchableOpacity onPress={()=>console.log("announcer")} style={{width: 30,height: 30,borderRadius:30/2,marginLeft:15}}>
                <Image
                  style={{width: 30,height: 30,borderRadius:30/2,marginLeft:15}}
                  source={require('./svg/image/announcer.png')}
                  resizeMode='contain' alt='....' />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>console.log("wallet")} style={{width: 30,height: 30,borderRadius:30/2,marginLeft:15}}>
                <Image
                  style={{width: 30,height: 30,borderRadius:30/2,marginLeft:15}}
                  source={require('./svg/image/wallet.png')}
                  resizeMode='contain' alt='....' />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>console.log("notification")} style={{width: 30,height: 30,borderRadius:30/2,marginLeft:15}}>
                <Image
                style={{width: 30,height: 30,borderRadius:30/2,marginLeft:15}}
                source={require('./svg/image/notification.png')}
                resizeMode='contain' alt='....' />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Profile',{profile_data:context?.userData,isMyProfile:true})} style={{width: 30,height: 30,borderRadius:30/2,marginLeft:15}}>
                <Image
                style={{width: 30,height: 30,borderRadius:30/2,marginLeft:15}}
                source={require('./svg/image/user.png')}
                resizeMode='contain' alt='....' />
                </TouchableOpacity>
              {/* <Text style={{fontSize: 20,fontWeight: 'bold',marginLeft: 2,marginTop: 5}}>Astrology</Text> */}
            </View>
          ),
          headerBackVisible:false
        }}
      />
      <Stack.Screen name="Profile" component={Profile}
        options={{
          headerTitle: (props) => (
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              {/* <Image
                style={{width: 40,height: 50}}
                source={require('./assets/logo/astrologo.png')}
                resizeMode='contain' alt='....' /> */}
              <Text style={{fontSize: 20,fontWeight: 'bold',marginLeft: 2,marginTop: 5}}>Profile</Text>
            </View>
          ),
          headerRight:(props) =>(
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}} >
              <TouchableOpacity onPress={()=>logout()} style={{width: 30,height: 30,borderRadius:30/2,marginLeft:15}}>
                <Image
                  style={{width: 30,height: 30,borderRadius:30/2,marginLeft:15}}
                  source={require('./svg/image/logout.png')}
                  resizeMode='contain' alt='....' />
              </TouchableOpacity>
            </View>
          )
        }}
      />

      <Stack.Screen name="ViewProfile" component={Profile}
        options={{
          headerTitle: (props) => (
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              {/* <Image
                style={{width: 40,height: 50}}
                source={require('./assets/logo/astrologo.png')}
                resizeMode='contain' alt='....' /> */}
              <Text style={{fontSize: 20,fontWeight: 'bold',marginLeft: 2,marginTop: 5}}>Profile</Text>
            </View>
          ),
          
        }}
      />

      <Stack.Screen name="MoreDetails" component={MoreDetails}
        options={{
          headerTitle: (props) => (
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              {/* <Image
                style={{width: 40,height: 50}}
                source={require('./assets/logo/astrologo.png')}
                resizeMode='contain' alt='....' /> */}
              <Text style={{fontSize: 20,fontWeight: 'bold',marginLeft: 2,marginTop: 5}}>Add Puja Sansthan</Text>
            </View>
          ),
          
        }}
      />

      <Stack.Screen name="ViewMoreDetails" component={ViewMore}
        options={{
          headerTitle: (props) => (
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              {/* <Image
                style={{width: 40,height: 50}}
                source={require('./assets/logo/astrologo.png')}
                resizeMode='contain' alt='....' /> */}
              <Text style={{fontSize: 20,fontWeight: 'bold',marginLeft: 2,marginTop: 5}}>Puja Sansthan Details</Text>
            </View>
          ),
          
        }}
      />

      <Stack.Screen name="LiveHome" component={LiveHome}
        options={{
          headerTitle: (props) => (
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              {/* <Image
                style={{width: 40,height: 50}}
                source={require('./assets/logo/astrologo.png')}
                resizeMode='contain' alt='....' /> */}
              <Text style={{fontSize: 20,fontWeight: 'bold',marginLeft: 2,marginTop: 5}}>Home Live</Text>
            </View>
          ),
          
        }}
      />

      <Stack.Screen name="Live" component={Live}
        options={{
          headerTitle: (props) => (
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              {/* <Image
                style={{width: 40,height: 50}}
                source={require('./assets/logo/astrologo.png')}
                resizeMode='contain' alt='....' /> */}
              <Text style={{fontSize: 20,fontWeight: 'bold',marginLeft: 2,marginTop: 5}}>Live</Text>
            </View>
          ),
          
        }}
      />
      
      {/* <View><Text style={{color:'white'}}>Hello</Text></View> */}
    </Stack.Navigator>
    
  );
}

export default StackNavigator;




