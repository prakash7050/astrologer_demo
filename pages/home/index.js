import { View, Text, useColorScheme, TouchableOpacity, StyleSheet, TextInput, LogBox } from 'react-native'
import Footer from '../../components/Footer'
import { useContext, useEffect, useState } from 'react'
import { SearchBar } from 'react-native-screens'
import { Image, ScrollView } from 'native-base'
import { LoginContext } from '../../context/login_context'
import {isEmpty} from "loadsh"
import { useNavigation } from '@react-navigation/native'


const Index = (props) =>{
    const context = useContext(LoginContext)
    const navigation = useNavigation()
    const isDarkMode = useColorScheme() === 'dark'
    const [iconName, setIconName] = useState("home")
    const [color,setColor] = useState('astrology')
    const [data, setData] = useState([])
    const [moreDetails, setMoreDetails] = useState([])
    console.log("hellll<<<<<<<<<<<<")

    const onPressChange = (name) =>{
        setColor(name)
    }

    const getAstrolgers = async() =>{
        const result = await context.getAllAstrolger("astrologer")
        console.log(result,"<<<<<<<<<<<<<home")
        if(result?.data?.status === "success"){
            setData(result?.data?.data)
        }
    }

    useEffect(()=>{
        LogBox.ignoreLogs(['React has detected a change in the order of Hooks called by Footer.']);
        getAstrolgers()
        getMoreDetails()
    },[])

    const showProfile = (astrologer) =>{
        props.navigation.navigate('ViewProfile',{profile_data:astrologer,isMyProfile:false})
    }

    const getMoreDetails = async() =>{
        const res = await context?.getAllMoreDetails()
        console.log(res?.data,"<<<<<<<<<<<<res data<<<")
        if(res?.data?.status === "success"){
            setMoreDetails(res?.data?.data)
        }
    }

    return(
        <ScrollView style={{flexDirection:'column',height:'100%'}}>
            <Text style={{color:'blue',fontWeight:"bold",textAlign:'center',fontSize:25}} onPress={()=>getAstrolgers()}>Refresh</Text>
            <View style={styles.container}>
                <View style={{flexDirection:'row',margin:10,alignItems:"center"}}>
                    <TouchableOpacity onPress={()=>onPressChange('astrology')} style={{backgroundColor:color === 'astrology' ? '#690402' : 'white',height:40,width:150,borderRadius:10,alignItems:'center',justifyContent:'center',marginRight:50}}>
                        <Text style={{fontSize:17,fontWeight:"bold",color:color !== 'astrology' ? '#690402' : 'white'}}>Astrology</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>onPressChange("puja")} style={{backgroundColor:color === 'puja' ? '#690402' : 'white',height:40,width:150,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:17,fontWeight:"bold",color:color !== 'puja' ? '#690402' : 'white'}}>Puja Sansthan</Text>
                    </TouchableOpacity>
                </View>
                <View style={{...styles.inputContainer,position: 'relative'}}>
                    <Image
                        style={{width: 30,height: 35,borderRadius:30/2,marginLeft:10,marginTop:10,marginRight:10}}
                        source={require('../../svg/image/search.png')}
                        resizeMode='contain' alt='....' />
                    <TextInput
                        style={{...styles.input}}
                        keyboardType='default'
                        placeholder='Search astrologers'
                        onChangeText={(value) => console.log(value)}
                    />
                </View>
            </View>
            <View style={{marginTop:-30,flexDirection:'row',marginLeft:10,marginRight:10,justifyContent:"space-between"}}>
                <View style={{width:100,alignItems:"center"}}>
                    <TouchableOpacity style={{width: 50,height: 50,backgroundColor:"white",borderRadius:50/2,marginLeft:10,marginTop:10,marginRight:10}}>
                        <Image
                            style={{width: 50,height: 50,backgroundColor:"white",borderRadius:50/2}}
                            source={require('../../svg/image/sun.png')}
                            resizeMode='contain' alt='....' />
                    </TouchableOpacity>
                    <Text style={{color:'black',fontSize:15,fontWeight:'bold',textAlign:'center'}}>Daily Horoscope</Text>
                </View>
                <View style={{width:100,alignItems:"center"}}>
                    <TouchableOpacity style={{width: 50,height: 50,backgroundColor:"white",borderRadius:50/2,marginLeft:10,marginTop:10,marginRight:10}}>
                        <Image
                            style={{width: 50,height: 50,backgroundColor:"white",borderRadius:50/2}}
                            source={require('../../svg/image/sun.png')}
                            resizeMode='contain' alt='....' />
                    </TouchableOpacity>
                    <Text style={{color:'black',fontSize:15,fontWeight:'bold',textAlign:'center'}}>Free Kundli</Text>
                </View>
                <View style={{width:100,alignItems:"center"}}>
                    <TouchableOpacity style={{width: 50,height: 50,backgroundColor:"white",borderRadius:50/2,marginLeft:10,marginTop:10,marginRight:10}}>
                        <Image
                            style={{width: 50,height: 50,backgroundColor:"white",borderRadius:50/2}}
                            source={require('../../svg/image/sun.png')}
                            resizeMode='contain' alt='....' />
                    </TouchableOpacity>
                    <Text style={{color:'black',fontSize:15,fontWeight:'bold',textAlign:'center'}}>Kundli Matching</Text>
                </View>
                <View style={{width:100,alignItems:"center"}}>
                    <TouchableOpacity style={{width: 50,height: 50,backgroundColor:"white",borderRadius:50/2,marginLeft:10,marginTop:10,marginRight:10}}>
                        <Image
                            style={{width: 50,height: 50,backgroundColor:"white",borderRadius:50/2}}
                            source={require('../../svg/image/sun.png')}
                            resizeMode='contain' alt='....' />
                    </TouchableOpacity>
                    <Text style={{color:'black',fontSize:15,fontWeight:'bold',textAlign:'center'}}>Free Chat</Text>
                </View>
            </View>
            <TouchableOpacity style={{width: "100%",backgroundColor:"white"}}>
                <Image
                    style={{marginTop:-70}}
                    source={require('../../svg/image/astro.jpg')}
                    resizeMode='contain' alt='....' />
            </TouchableOpacity>
            <View style={{width:'100%',backgroundColor:'white',marginTop:-60}}>
                <Text style={{color:'black',fontSize:20,fontWeight:'bold',textAlign:'left',marginLeft:10}}>Astrologers</Text>
                {!isEmpty(data) && <ScrollView horizontal style={{width:'100%',height:150,flexDirection:'row',paddingLeft:5}}>
                    {data?.map((astrologer,i)=>{
                    return(
                    <View key={i} style={{borderWidth:1,borderColor:'black',borderRadius:9,width:100,flexDirection:'column',alignItems:"center",justifyContent:"space-between",marginRight:10}}>
                        <TouchableOpacity onPress={()=>showProfile(astrologer)} style={{width:"100%"}}>
                            <Image
                                style={{width:100,height:50,borderRadius:5}}
                                source={require('../../svg/image/user.png')}
                                resizeMode='contain' alt='....' />
                        </TouchableOpacity>
                        <Text style={{color:'black',fontSize:15,fontWeight:'bold',marginTop:-30}}>{astrologer?.name}</Text>
                        <Text style={{color:'black',fontSize:15,fontWeight:'bold',marginTop:-30}}>50/hr</Text>
                        <TouchableOpacity style={{marginTop:-20,width:80,height:25,marginBottom:5,borderColor:"green",borderWidth:1,borderRadius:10}}>
                        <Text style={{color:'green',fontSize:15,fontWeight:'bold',textAlign:"center"}}>Connect</Text>
                        </TouchableOpacity>
                    </View>
                    )})}
                    
                </ScrollView>}
            </View>

            <View style={{width:'100%',backgroundColor:'white',marginTop:-60}}>
                <Text style={{color:'black',fontSize:20,fontWeight:'bold',textAlign:'left',marginLeft:10}}>Live Astrologers</Text>
                {!isEmpty(data) && <ScrollView horizontal style={{width:'100%',height:150,flexDirection:'row',paddingLeft:5}}>
                    {data?.map((astrologer,i)=>{
                    return( astrologer.is_live &&
                    <View key={i} style={{borderWidth:1,borderColor:'black',borderRadius:9,width:100,flexDirection:'column',alignItems:"center",justifyContent:"space-between",marginRight:10}}>
                        <TouchableOpacity onPress={()=>showProfile(astrologer)} style={{width:"100%"}}>
                            <Image
                                style={{width:100,height:50,borderRadius:5}}
                                source={require('../../svg/image/user.png')}
                                resizeMode='contain' alt='....' />
                        </TouchableOpacity>
                        <Text style={{color:'black',fontSize:15,fontWeight:'bold',marginTop:-30}}>{astrologer?.name}</Text>
                        <Text style={{color:'black',fontSize:15,fontWeight:'bold',marginTop:-30}}>50/hr</Text>
                        <TouchableOpacity style={{marginTop:-20,width:80,height:25,marginBottom:5,borderColor:"green",borderWidth:1,borderRadius:10}}>
                        <Text onPress={()=>navigation.navigate("Live")} style={{color:'green',fontSize:15,fontWeight:'bold',textAlign:"center"}}>Join</Text>
                        </TouchableOpacity>
                    </View>
                    )})}
                    
                </ScrollView>}
            </View>

            <View style={{width:'100%',backgroundColor:'white',marginTop:20,paddingBottom:50}}>
                <Text style={{color:'black',fontSize:20,fontWeight:'bold',textAlign:'left',marginLeft:10}}>Puja Sansthan</Text>
                {!isEmpty(moreDetails) && <ScrollView horizontal style={{width:'100%',height:150,flexDirection:'row',paddingLeft:5}}>
                    {moreDetails?.map((ele,i)=>{
                    return(
                        <View key={i} style={{borderWidth:1,borderColor:'black',borderRadius:9,width:150,flexDirection:'column',alignItems:"center",justifyContent:"space-between",marginRight:10}}>
                            <TouchableOpacity style={{width:"100%"}} onPress={()=>navigation.navigate("ViewMoreDetails",{more_data:ele})}>
                                <Image
                                    style={{width:150,height:150,borderRadius:5}}
                                    source={ele?.main_photo?.uri ? {uri:ele?.main_photo?.uri} :require('../../svg/image/astro.jpg')}
                                    resizeMode='contain' alt='....' />
                            </TouchableOpacity>
                            <Text style={{color:'white',fontSize:20,fontWeight:'bold',marginTop:-50}}>{ele?.name}</Text>
                        </View>
                    )})}
                    
                </ScrollView>}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {flexDirection:'column',
    height:150,
    backgroundColor: "linear-gradient(to right, rgb(190, 36, 23), rgb(97, 73, 120))",
    alignItems:"center",
    },
    input: {
        height: 50,
        borderRadius: 5,
        width: '100%',
        // color: '#000',
        // backgroundColor: '#d5ded7',
        // borderColor: '#d5ded7',
        borderRadius:30
    },
    inputContainer: {
        flexDirection:'row',
        backgroundColor:'#fac3c9',
        borderRadius:20,
        height:50,
        width: '90%',
    },
});

export default Index;