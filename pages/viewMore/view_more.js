import { useContext, useEffect, useState } from "react"
import { LoginContext } from "../../context/login_context"
import {ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { Button } from "native-base"

const { View, Text, Image } = require("react-native")




const ViewMore = (props) =>{
    const moreData = props.route.params?.more_data
    const context = useContext(LoginContext)
    const [userDetails, setUserDetails] = useState({})

    const getUserProfile = async() =>{
        const result = await context.getProfileDetailsByuserId(moreData?.user_id)
        if(result?.data?.status === 'success'){
            setUserDetails(result?.data?.data)
        }
    }

    useEffect(()=>{
        getUserProfile()
    },[])

    console.log(moreData,"<<<<<<<<<<<<<")
    return(
        <View style={{height:'100%',width:"100%",backgroundColor:'white',paddingLeft:10}}>
            <ScrollView>
                <View style={{width:"100%",flexDirection:'row',marginTop:10}}>
                <Image
                    style={{height:40,width:40,borderRadius:20}}
                    source={moreData?.main_photo?.uri ? {uri:moreData?.main_photo?.uri} :require('../../svg/image/astro.jpg')}
                    resizeMode='contain' alt='....' />
                    <View style={{marginLeft:10}}>
                        <Text style={{fontSize:20,fontWeight:'bold',color:'darkred'}}>{moreData?.name}</Text>
                        <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>props.navigation.navigate('ViewProfile',{profile_data:userDetails,isMyProfile:userDetails?.user_id === context?.userData?.user_id})}>
                            <Text style={{fontSize:10,fontWeight:'bold',color:'black'}}>Astrologer : </Text>
                            <Text style={{fontSize:10,fontWeight:'bold',color:'blue'}}>{userDetails?.name}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Image
                    style={{height:250,width:"99%",marginTop:20,borderRadius:5}}
                    source={moreData?.main_photo?.uri ? {uri:moreData?.main_photo?.uri} :require('../../svg/image/astro.jpg')}
                    resizeMode='contain' alt='....' />
                <Text style={{fontSize:13,color:'black',marginTop:10}}>{moreData?.description}</Text>
                {moreData?.post?.map((ele,i)=>{
                    return(
                        <View key={i}>
                            <View style={{width:"100%",flexDirection:'row',marginTop:10}}>
                            <Image
                                style={{height:25,width:25,borderRadius:25/2}}
                                source={ele?.image?.uri ? {uri:ele?.image?.uri} :require('../../svg/image/astro.jpg')}
                                resizeMode='contain' alt='....' />
                                <View style={{marginLeft:10}}>
                                    <Text style={{fontSize:15,fontWeight:'bold',color:'darkred'}}>{ele?.title}</Text>
                                </View>
                            </View>
                            <Image
                                style={{height:250,width:"99%",marginTop:20,borderRadius:5}}
                                source={ele?.image?.uri ? {uri:ele?.image?.uri} :require('../../svg/image/astro.jpg')}
                                resizeMode='contain' alt='....' />
                            <Text style={{fontSize:13,color:'black',marginTop:10}}>{ele?.description}</Text>
                        </View>
                )})}
                <Text style={{fontSize:15,fontWeight:'bold',color:'black',marginTop:20}}>Comments</Text>
                <View>

                </View>
            </ScrollView>
            <View style={{...styles.inputContainer,justifyContent:'space-between',position: 'relative'}}>
                <TextInput
                    style={{...styles.input}}
                    keyboardType='default'
                    placeholder='Comments ........'
                    onChangeText={(value) => console.log(value)}
                />
                <Button style={{height:50,marginLeft:10,borderRadius:40}} onPress={()=>console.log("send")}>Send</Button>
            </View>
        </View>
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
        width: '80%',
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
        width: '100%',
    },
});

export default ViewMore;