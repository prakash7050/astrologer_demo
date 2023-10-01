import { Ionicons } from '@expo/vector-icons';
// import * as React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { iconColor, textColor } from '../common';
import { useContext } from 'react';
import { LoginContext } from '../context/login_context';
import ImageIcon from '../svg/imageIcon';
import { Image } from 'native-base';

const Footer = ({isDarkMode,iconName,onPress}) =>{
  const context = useContext(LoginContext)
  const handleChange = async(name) =>{
    await onPress(name)
    // alert(name)
  }
  
    return(
      <>
      {context?.userData?.user_id ?
      <View style={{flex:1,flexDirection:'row',backgroundColor:'white'}}>
        <TouchableOpacity onPress={()=>handleChange('Call')} style={{width:'20%',borderTopLeftRadius:50,alignItems:'center',justifyContent:"center",borderRadius: Platform.OS === 'web' ? 15 : 0,backgroundColor:iconColor(iconName,'Call')}} >
          {/* <Ionicons  style={{...textColor(isDarkMode),textAlign:'center'}} size={25} name="Call" /> */}
          <Image
            style={{width: 30,height: 30}}
            source={require('../svg/image/phone.png')}
            resizeMode='contain' alt='....' />
          <Text style={{...textColor(isDarkMode),fontSize:15,fontWeight:'bold',textAlign:'center'}}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleChange('Chat')} style={{width:'20%',borderTopRightRadius:50,borderTopLeftRadius:50,alignItems:'center',justifyContent:"center",borderRadius: Platform.OS === 'web' ? 15 : 0,backgroundColor:iconColor(iconName,'Chat')}} >
          {/* <Ionicons  style={{...textColor(isDarkMode),textAlign:'center'}} size={25} name="md-people-sharp" /> */}
          <Image
            style={{width: 30,height: 30}}
            source={require('../svg/image/chat.png')}
            resizeMode='contain' alt='....' />
          <Text style={{...textColor(isDarkMode),fontSize:15,fontWeight:'bold',textAlign:'center'}}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleChange('Watch')} style={{width:'20%',borderTopRightRadius:50,borderTopLeftRadius:50,alignItems:'center',justifyContent:"center",borderRadius: Platform.OS === 'web' ? 15 : 0,backgroundColor:iconColor(iconName,'Watch')}} >
          {/* <Ionicons  style={{...textColor(isDarkMode),textAlign:'center'}} size={25} name="add-circle" /> */}
          <Image
            style={{width: 30,height: 30}}
            source={require('../svg/image/watch.png')}
            resizeMode='contain' alt='....' />
          <Text style={{...textColor(isDarkMode),fontSize:15,fontWeight:'bold',textAlign:'center'}}>Watch</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleChange('Pooja')} style={{width:'20%',borderTopRightRadius:50,borderTopLeftRadius:50,alignItems:'center',justifyContent:"center",borderRadius: Platform.OS === 'web' ? 15 : 0,backgroundColor:iconColor(iconName,'Pooja')}} >
          {/* <Ionicons  style={{...textColor(isDarkMode),textAlign:'center'}} size={25} name="Pooja" /> */}
          <Image
            style={{width: 30,height: 30}}
            source={require('../svg/image/pooja.png')}
            resizeMode='contain' alt='....' />
          <Text style={{...textColor(isDarkMode),fontSize:15,fontWeight:'bold',textAlign:'center'}}>Pooja room</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleChange('Membership')} style={{width:'20%',borderTopRightRadius:50,alignItems:'center',justifyContent:"center",borderRadius: Platform.OS === 'web' ? 15 : 0,backgroundColor:iconColor(iconName,'Membership')}} >
          {/* <Ionicons style={{...textColor(isDarkMode),textAlign:'center'}} size={25} name="book" /> */}
          <Image
            style={{width: 30,height: 30}}
            source={require('../svg/image/membership.png')}
            resizeMode='contain' alt='....' />
          <Text style={{...textColor(isDarkMode),fontSize:15,fontWeight:'bold',textAlign:'center'}}>Membership</Text>
        </TouchableOpacity>
    </View>
    :
    <View style={{backgroundColor:'white',height:"100%"}}></View>
  }
      </>
        
    )
}

export default Footer;