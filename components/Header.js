// import { Ionicons } from "@expo/vector-icons";
// import { Avatar } from '@react-native-material/core';
// import * as React from 'react';
// import { Platform, Text, TouchableOpacity, View } from "react-native";
// import { Appbar } from 'react-native-paper';
// import { backgroundColor, iconColor, textColor } from '../common';
// import ProfileImage from '../assets/logo/astrologo.png';
// import Footer from "./Footer";


// const Header = ({isDarkMode,iconName,onPress}) => {
//   const _goBack = () => console.log('Went back');

//   const _handleSearch = () => console.log('Searching');

//   const _handleMore = () => console.log('Shown more');

//   const messagePress = async(name) =>{
//    await onPress(name)
//     // colorChange()
//     alert(name)
//   }
//   const colorChange = () =>{
//     return iconColor(iconName,'message')
//   }

//   return (
//     <Appbar.Header style={{width:"100%"}}>
//       <Appbar.Content mode='medium' style={{maxWidth:Platform.OS !== 'web' && 80,width: Platform.OS === 'web' ? '5%' : 'auto'}}
//         title={
//             <Ionicons color={'red'} size={605} name='search' />}
//         onPress={_handleMore}
//       />
//       <Appbar.Content mode="medium" style={{paddingLeft: Platform.OS === 'web' ? 10 : 0,width:Platform.OS === 'web' ? '30%' : 'auto'}}
//         title={
//           <TouchableOpacity style={{...backgroundColor(isDarkMode),minHeight:40,borderRadius:10,width:'auto'}}>
//             <View style={{...textColor(!isDarkMode),flex:1,flexDirection:'row'}}>
//               <Text style={{...textColor(isDarkMode),flex:1,textAlign:'left',minWidth:'50%',margin:10,marginLeft:20}}>Search Here .......</Text>
//               <Ionicons size={25} style={{...textColor(!isDarkMode),flex:2,textAlign:'right',margin:5,marginRight:10}} name='search' />
//             </View>
//           </TouchableOpacity>}
//         onPress={_handleSearch}
//       />
//       {/* <Appbar.Content style={{maxWidth:Platform.OS === 'web' ? 'auto' : 60,width:Platform.OS === 'web' ? '50%':'auto',paddingLeft:Platform.OS === 'web' ? 30 : 0}} mode="small"
//         title={
//           <View style={{flexDirection:'row'}}>
//             <View style={{flex:1}} >
//               {Platform.OS === 'web' && <Footer iconName={iconName} onPress={(name)=>onPress(name)} isDarkMode={isDarkMode} />}
//             </View>
//             <TouchableOpacity onPress={()=>messagePress('message')} style={{width:Platform.OS === 'web' ? '20%' : 'auto', borderRadius: Platform.OS === 'web' ? 15 : 0,backgroundColor:Platform.OS === 'web' ? colorChange() : isDarkMode ? 'white' : 'black'}} >
//               <Ionicons  style={{...textColor(isDarkMode),textAlign:'center',paddingRight:5}} size={Platform.OS === 'web' ? 25 : 35} name="chatbubble-ellipses" />
//               {Platform.OS === 'web' && <Text style={{...textColor(isDarkMode),fontSize:10,textAlign:'center'}}>Messages</Text>}
//             </TouchableOpacity>
//           </View>}
//         onPress={_handleSearch}
//       /> */}
//     </Appbar.Header>
//   );
// };

// export default Header;