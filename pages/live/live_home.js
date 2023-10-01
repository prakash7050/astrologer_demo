import { useContext, useEffect, useState } from 'react';
import { AGORA_APP_ID, CHANNEL_NAME, TOKEN } from '../../config'
import { ScrollView, Text, View } from 'react-native'
import AgoraUIKit from 'agora-rn-uikit';
import axios from 'axios';
import uuid from 'react-native-uuid';
import { LoginContext } from '../../context/login_context';
import RtmClient from 'agora-react-native-rtm';
import createAgoraRtcEngine, { RtcEngineContext } from 'react-native-agora';
// import ip

const LiveHome = () => {
  const [videoCall, setVideoCall] = useState(false);
  const context = useContext(LoginContext)
  const [isAudiance,setIsAudiance] = useState(false)
    const connectionData = {
        appId: AGORA_APP_ID,
        channel: CHANNEL_NAME,
        token: TOKEN,
        user_id:0,
        uid:0
    };

    const callbacks = {
      EndCall: (props) => {
        console.log(props,"<<<<<<props")
        setVideoCall(false)
      }
  };

  useEffect(()=>{
    postData()
  },[])
  const postData = async() =>{
    // let rtmClient = await AgoraRTM.createChannel(AGORA_APP_ID)
    let uid = uuid.v4()
    // await createAgoraRtcEngine.

    // const channel = await RtmClient.createChannel('astrologer')
    // await channel.join()

    // channel.on('ChannelMessage', (messageData, memberId) => {
    //     let data = JSON.stringify(messageData.text)
    //     console.log('Data: ', data)
    // })

    // // let messageForm = document.getElementById('message__form')
    // // messageForm.addEventListener('submit', sendMessage)

    try{
      const auth = await context.agoraAuth()
      // const result = await axios.post(`https://api.agora.io/dev/v1/kicking-rule`,data)
      console.log(auth,"<<<<<<<<<<<<<<<,,,")
      
    }catch(err){
      console.log(err?.response?.data?.error?.message,"<<<<<<<<errr")
    }
    
    
  }

  const handleChange = () =>{
    setVideoCall(false)
    setIsAudiance(true)
  }

  return (
    videoCall ? 
    <AgoraUIKit settings={{mode:1,role:1}} connectionData={connectionData} rtcCallbacks={callbacks} /> 
        :
        <Text style={{color:"black",textAlign:"center",alignItems:"center",borderWidth:2,width:100,margin:"40%"}} onPress={() => setVideoCall(true)}>{isAudiance?"Join" : "Start Call"}</Text>
    // <View style={{alignItems:"center",justifyContent:"space-between",width:"100%",flexDirection:"row"}}>
      
    //   <ScrollView contentContainerStyle={{alignItems:"center",justifyContent:"space-around"}}>
    //   {/* <Text style={{color:"black",textAlign:"center",alignItems:"center",borderWidth:2,width:100,margin:"40%"}} onPress={()=>handleChange()}>Audiance</Text> */}
    //   {videoCall ? 
    //     isAudiance ? <AgoraUIKit settings={{mode:1,role:2}} connectionData={connectionData} rtcCallbacks={callbacks} /> 
    //     : <AgoraUIKit
    //     settings={{mode:1,role:1}} connectionData={connectionData} rtcCallbacks={callbacks}
    //   />
    //     :
    //     <Text style={{color:"black",textAlign:"center",alignItems:"center",borderWidth:2,width:100,margin:"40%"}} onPress={() => setVideoCall(true)}>{isAudiance?"Join" : "Start Call"}</Text>
    //   }
    //   </ScrollView>
    // </View>
  )
}

export default LiveHome