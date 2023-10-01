import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/login_context";
import Button from '../../components/Button'
import {isEmpty,upperCase} from 'loadsh'
import { ScrollView, TextInput, TouchableOpacity } from "react-native";
import FilePickerManager from 'react-native-file-picker';
import {launchCamera,launchImageLibrary} from 'react-native-image-picker';
import { useNavigation } from "@react-navigation/native";


const { View, Text, Image, Modal } = require("native-base")



const Index = (props) =>{
    const profileData = props.route.params?.profile_data
    const navigation = useNavigation()
    const isMyProfile = props.route.params?.isMyProfile
    const context = useContext(LoginContext)
    const [user, setUser] = useState(profileData)
    const [isEdit, setIsEdit] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [profileImage, setProfileImage] = useState({})
    const [moreDetails, setMoreDetails] = useState([])

    useEffect(()=>{
        setUser(profileData)
        getMoreDetails()
    },[props])

    const getMoreDetails = async() =>{
        const res = await context?.getAllMoreDetails()
        console.log(res?.data,"<<<<<<<<<<<<res data<<<")
        if(res?.data?.status === "success"){
            setMoreDetails(res?.data?.data)
        }
    }

    const openGallery = () => {
        setShowModal(false)
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5,
            maxHeight: 200,
            maxWidth: 200,
            includeBase64: true,
            includeExtra: true
        },callback => {
            console.log(callback,"<<<<<<<<<<<<<cammmm")
            if(callback.didCancel) {
                console.log('User cancelled camera');
            }
            else if(callback.error) {
                console.log('FilePickerManager Error: ',response.error);
            }
            else {
                setProfileImage({file_type:"profile_photo",...callback.assets[0]})
            }
        })
    }
    
    const openCamera = () => {
        setShowModal(false)
        launchCamera({
            mediaType: 'photo',
            quality: 0.5,
            maxHeight: 200,
            maxWidth: 200,
            includeBase64: true,
            includeExtra: true
        },callback => {
            console.log(callback,"<<<<<<<<<<<<<cammmm")
            if(callback.didCancel) {
                console.log('User cancelled camera');
            }
            else if(callback.error) {
                console.log('FilePickerManager Error: ',response.error);
            }
            else {
                setProfileImage({file_type:"profile_photo",...callback.assets[0]})
            }
        })
    }

    return(
        <View style={{backgroundColor:"white",height:"100%",alignItems:"center"}}>
            {isMyProfile && <TouchableOpacity onPress={()=>setIsEdit(true)} style={{paddingLeft:350,paddingTop:10}}>
                <Image
                    style={{width: 30,height: 30,borderRadius:30/2,marginLeft:15}}
                    source={require('../../svg/image/edit.png')}
                    resizeMode='contain' alt='....' />
            </TouchableOpacity>}
            <TouchableOpacity onPress={()=>isEdit ? setShowModal(true) : console.log('View Image')}>
            <Image
                style={{width: 100,height: 100,borderRadius:100/2,marginLeft:10}}
                source={!isEmpty(profileImage) ? {uri:profileImage?.uri} : require('../../svg/image/user.png')}
                resizeMode='contain' alt='....' />
            {isEdit && <Text style={{color:'#9e0702',fontSize:20,textAlign:"center",fontWeight:"bold",marginTop:-60,marginBottom:40}}>Upload</Text>}
            {isEdit && <Text style={{color:'black'}}>Upload Profile Photo</Text>}
            </TouchableOpacity>
            <Text style={{marginTop:10,color:"black",fontSize:20,fontWeight:"bold"}}>{user?.name || "Full Name"}</Text>
            {user?.user_type === "astrologer" && 
                <Text style={{marginTop:10,color:"red",fontSize:15,fontWeight:"bold",borderEndWidth:1,borderColor:'black'}}>{upperCase(user.user_type)}</Text>
            }
            <Text style={{marginTop:10,color:"black",fontSize:15,fontWeight:"bold",borderEndWidth:1,borderColor:'black'}}>{"User Name : " + user?.user_name || "User Name"}</Text>
            <Text style={{marginTop:10,color:"black",fontSize:15,fontWeight:"bold",borderEndWidth:1,borderColor:'black'}}>{"Mobile Number : " + user?.mobile || "Mobile Number"}</Text>
            {!isEdit && isMyProfile && user?.user_type === "astrologer" && <View style={{flexDirection:"row",width:"60%",alignItems:"center",justifyContent:"center",paddingRight:20}}>
                <Button text='Live' borderRadius={10} height={50} width={'50%'} marginTop={20} onPress={()=>navigation.navigate("LiveHome")} isLoading={context.btnLoading}></Button>
                <Button text='Add Pooja Sansthan' color={'blue'} borderRadius={10} height={50} width={'76%'} marginTop={20} marginRight={40} onPress={()=>navigation.navigate("MoreDetails")} isLoading={context.btnLoading}></Button>
            </View>}
            {isEdit && 
            <Button text='Save' color={'green'} borderRadius={10} height={50} width={'40%'} marginTop={20} onPress={()=>setIsEdit(false)} isLoading={context.btnLoading}></Button>
            }

            {!isMyProfile && 
             <Button text='Connect' color={'green'} borderRadius={10} height={50} width={'40%'} marginTop={20} onPress={()=>setIsEdit(false)} isLoading={context.btnLoading}></Button>
            }

{!isEmpty(moreDetails) && <View style={{width:"100%",borderTopWidth:4,borderBottomWidth:4,borderRadius:2,borderColor:'darkred',marginTop:15}}>
                <Text style={{color:'black',paddingTop:20,paddingBottom:20,fontSize:20,fontWeight:'bold',textAlign:'left',marginLeft:10}}>All Puja Sansthan</Text>
                <ScrollView horizontal style={{width:'100%',height:150,flexDirection:'row',paddingLeft:5}}>
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
                    
                </ScrollView>
            </View>}

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Header>
                <Text style={{color: '#00ab55',fontSize: 14,textAlign: 'center',alignSelf: 'center'}}>Upkoad Profile Photo</Text>
                </Modal.Header>
                <Modal.Content height={'250px'} bgColor="white">
                    <View height={'70%'} style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
                        <TouchableOpacity onPress={()=>openCamera()} style={{alignItems:"center"}}>
                            <Image
                                style={{width: 100,height: 100}}
                                source={require('../../svg/image/camera.png')}
                                resizeMode='contain' alt='....' />
                            <Text style={{color:'black'}}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>openGallery()} style={{marginLeft:20,alignItems:"center"}}>
                            <Image
                                style={{width: 100,height: 100}}
                                source={require('../../svg/image/gallery.png')}
                                resizeMode='contain' alt='....' />
                            <Text style={{color:'black'}}>Gallery</Text>
                        </TouchableOpacity>
                    </View>
                    <Button text='OK' shadow={2} color={'green'} borderRadius={10} marginTop={20} height={40} width={'40%'} onPress={() => setIsEdit(false)} isLoading={context.btnLoading}/>
                </Modal.Content>
            </Modal>
        </View>
    )
}


export default Index;