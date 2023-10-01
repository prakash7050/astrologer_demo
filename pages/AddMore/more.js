import { View, Image, Modal, Text } from "native-base"
import { ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import {isEmpty} from 'loadsh'
import { useContext, useEffect, useState } from "react"
import Button from '../../components/Button'
import {launchCamera,launchImageLibrary} from 'react-native-image-picker';
import { notifyUser } from "../../constants"
import { LoginContext } from "../../context/login_context"


const MoreDetails = (props) =>{
    const context = useContext(LoginContext)
    const [showModal, setShowModal] = useState(false)
    const [profile, setProfile] = useState({})
    const [profileImage, setProfileImage] = useState({})
    const [detailsData, setDetailsData] = useState({})
    const [details, setdetails] = useState([{title:"",image:"",description:""}])
    const [error,setError] = useState({
        name: false,
        description: false,
        image: false,
    })
    const [modelIndex, setModelIndex] = useState("")

    const getProfiledetails = async() =>{
        const userId = context?.userData?.user_id
        const res = await context.getProfileDetailsByuserId(userId)
        console.log(res?.data,"<<<<<<<<<<<<<<<<<add")
        if(res?.data?.status === 'success'){
            setProfile(res?.data?.data)
        }
    }

    useEffect(()=>{
        getProfiledetails()
    },[])

    const openGallery = () => {
        setShowModal(false)
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5,
            maxHeight: 400,
            maxWidth: 400,
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
                console.log(modelIndex,"<<<<<<3<<<<<<<<<modelIndex")
                if(modelIndex || modelIndex===0){
                    console.log(modelIndex,"<<<<4<<<<<<<<<<<modelIndex")
                    handleChange("image",{file_type:"image",...callback.assets[0]},modelIndex)
                }else{
                    console.log(modelIndex,"<<<<<<<<5<<<<<<<modelIndex")
                    setProfileImage({file_type:"main_photo",...callback.assets[0]})
                }
            }
        })
    }
    
    const openCamera = () => {
        setShowModal(false)
        launchCamera({
            mediaType: 'photo',
            quality: 0.5,
            // maxHeight: 200,
            // maxWidth: 200,
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
                console.log(modelIndex,"<<<<<<<<<<<<<<<modelIndex")
                if(modelIndex){
                    console.log(modelIndex,"<<<<<<<<<1<<<<<<modelIndex")
                    handleChange("image",{file_type:"image",...callback.assets[0]},modelIndex)
                }else{
                    console.log(modelIndex,"<<<<<<<<2<<<<<<<modelIndex")
                    setProfileImage({file_type:"main_photo",...callback.assets[0]})
                }
            }
        })
    }

    const addMore = () =>{
        let list = [...details]
        list.push({title:"",image:"",description:""})
        setdetails([...list])
    }

    const remove = (i) =>{
        let list = [...details]
        list.splice(i,1)
        setdetails([...list])
    }

    const handleChange = (name,value,i)=>{
        let list = [...details]
        list[i][`${name}`] = value
        setdetails([...list])
    }

    const showModalChange = (index) =>{
        setModelIndex(index)
        setShowModal(true)
    }

    const submitForm = async () => {
        if(validateData()) {
            context.setBtnLoading(true)
            const finalData = {...detailsData,main_photo:profileImage,post:details,user_id:profile?.user_id,profile_id:profile?.profile_id,is_active:true}
            await context.addMoreDetails(finalData)
            .then(async response =>{
                if(response.data.status === "success") {
                    notifyUser("Data Saved Successful")
                    props.navigation.replace('Profile',{profile_data:context?.userData,isMyProfile:true})
                } else {
                    alert(response?.data?.status?.error)
                    
                }
            })
            .catch(error=>{
                console.log(error?.response?.data?.error?.message,"<<<<<<<<<<<eorr")
                alert(error?.response?.data?.error?.message || 'Somethings went worng')
            })
            
        }
        context.setBtnLoading(false)
    }
    const validateData = () => {
        const errors = {
            name: false,
            description: false,
            image: false
        }
        if(!detailsData?.name) {
            setError({...errors,name: true})
            return false
        }
        setError({
            ...errors
        })
        return true
    }

    return(
        <View style={{backgroundColor:"white",height:"100%",alignItems:"center"}}>
            <ScrollView style={{width:'100%',height:"100%"}} contentContainerStyle={{alignItems:"center"}}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Puja Sansthan Name *</Text>
                    <TextInput
                        style={{...styles.input}}
                        value={detailsData?.name}
                        placeholder='Enter Puja Sansthan Name'
                        onChangeText={(value) => setDetailsData({...detailsData,name:value})}
                    />
                    {error?.name &&
                        <Text style={{color: 'red',textAlign: 'left',width: '80%',fontSize: 12}}>Enter Puja Sansthan Name.</Text>
                    }
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Upload Puja Sansthan Image *</Text>
                    <View style={{flexDirection:"row",marginTop:10,justifyContent:'space-between',alignItems:"center"}}>
                        <TouchableOpacity onPress={()=>showModalChange("")} style={{alignItems:'center',width:"30%",height:100}}>
                            <Image
                                style={{width:100,height: 100}}
                                source={require('../../svg/image/upload.webp')}
                                resizeMode='contain' alt='....' />
                            <Text style={{color:'#9e0702',fontSize:20,textAlign:"center",fontWeight:"bold",marginTop:-60,marginBottom:40}}>Upload</Text>
                        </TouchableOpacity>
                        {!isEmpty(profileImage) && 
                        <View style={{width:"70%",marginTop:10,height:100,justifyContent:'center',alignItems:"center"}}>
                            <Image
                            width={200}
                            height={120}
                            source={!isEmpty(profileImage) ? {uri:profileImage?.uri} : require('../../svg/image/upload.webp')}
                            resizeMode='contain' alt='....' />
                        </View>
                        }
                    </View>
                    {/* {error?.name &&
                        <Text style={{color: 'red',textAlign: 'left',width: '80%',fontSize: 12}}>Enter Full Name.</Text>
                    } */}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Description *</Text>
                    <TextInput
                        style={{...styles.input,minHeight:80}}
                        value={detailsData?.description}
                        placeholder='Enter Full Description'
                        onChangeText={(value) => setDetailsData({...detailsData,description:value})}
                        multiline
                    />
                    {error?.name &&
                        <Text style={{color: 'red',textAlign: 'left',width: '80%',fontSize: 12}}>Enter Full Description.</Text>
                    }
                </View>
                <Text style={{fontWeight:'bold',color:"darkred",marginTop:70,fontSize:20}}>Puja Sansthan Details</Text>
                {details?.map((ele,i) =>{
                    return(
                        <View key={i} style={{width:"100%",alignItems:"center"}}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Title </Text>
                                <TextInput
                                    style={{...styles.input}}
                                    value={ele?.title}
                                    placeholder='Enter Title'
                                    onChangeText={(value) => handleChange("title",value,i)}
                                />
                            </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Upload Image</Text>
                            <View style={{flexDirection:"row",marginTop:10,justifyContent:'space-between',alignItems:"center"}}>
                                <TouchableOpacity onPress={()=>showModalChange(i)} style={{alignItems:'center',width:"30%",height:100}}>
                                    <Image
                                        style={{width:100,height: 100}}
                                        source={require('../../svg/image/upload.webp')}
                                        resizeMode='contain' alt='....' />
                                    <Text style={{color:'#9e0702',fontSize:20,textAlign:"center",fontWeight:"bold",marginTop:-60,marginBottom:40}}>Upload</Text>
                                </TouchableOpacity>
                                {!isEmpty(ele?.image) && 
                                <View style={{width:"70%",marginTop:10,height:100,justifyContent:'center',alignItems:"center"}}>
                                    <Image
                                    width={200}
                                    height={120}
                                    source={!isEmpty(ele?.image) ? {uri:ele?.image?.uri} : require('../../svg/image/upload.webp')}
                                    resizeMode='contain' alt='....' />
                                </View>
                                }
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Description</Text>
                            <TextInput
                                style={{...styles.input,minHeight:80}}
                                value={ele?.description}
                                placeholder='Enter Full Description'
                                onChangeText={(value) => handleChange("description",value,i)}
                                multiline
                            />
                        </View>
                        <View style={{marginTop:30,marginLeft:300,width:"20%"}}>
                            <Button text='Remove' shadow={0} color={'red'} borderRadius={10} marginTop={0} height={30} width={"100%"} onPress={() => remove(i)}/>
                        </View>
                </View>)})}
                <View style={{marginTop:-30,marginLeft:-300,width:"20%"}}>
                    <Button text='Add More' shadow={0} color={'blue'} borderRadius={10} marginTop={0} height={30} width={"100%"} onPress={() => addMore()}/>
                </View>
                <Button text='Submit' shadow={2} color={'green'} borderRadius={10} marginTop={40} height={50} width={'40%'} onPress={() => submitForm()}/>
            </ScrollView>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Header>
                <Text style={{color: '#00ab55',fontSize: 14,textAlign: 'center',alignSelf: 'center'}}>Upkoad Photo</Text>
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
                    <Button text='OK' shadow={2} color={'green'} borderRadius={10} marginTop={20} height={40} width={'40%'} onPress={() => setIsEdit(false)}/>
                </Modal.Content>
            </Modal>
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

export default MoreDetails;