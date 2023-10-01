import React,{useState,useEffect} from 'react'
import {View} from 'react-native';
import {StyleSheet,TouchableOpacity,Text} from "react-native";
import {Button} from "native-base";

function Index(props) {
    const [progress,setProgress] = useState()
    useEffect(() => {
        if(props.isLoading) {
            setTimeout(() => {
                setProgress(0.1)
            },100)
            setTimeout(() => {
                setProgress(0.2)
            },200)
            setTimeout(() => {
                setProgress(0.3)
            },300)
            setTimeout(() => {
                setProgress(0.4)
            },400)
            setTimeout(() => {
                setProgress(0.5)
            },500)
            setTimeout(() => {
                setProgress(0.6)
            },600)
            setTimeout(() => {
                setProgress(0.7)
            },700)
            setTimeout(() => {
                setProgress(0.8)
            },800)
            setTimeout(() => {
                setProgress(0.9)
            },900)
        } else {
            setProgress(0)
        }
    },[props.isLoading])
    return (<View style={{width: '100%',alignItems: 'center'}}>
        {!props.isLoading &&
            <TouchableOpacity style={{marginTop: props.marginTop,alignItems: 'center',justifyContent: 'center',backgroundColor: props?.color || 'green',height: props.height,borderRadius: props.borderRadius,width: props.width,padding: props.padding}} onPress={props.onPress}>
                <View style={{...styles.button}}>
                    <Text style={{color: '#fff',fontWeight: 'bold',letterSpacing: 1.5,fontSize: 16}}>{props.text}</Text>
                </View>
            </TouchableOpacity>
        }
        {props.isLoading &&
            <TouchableOpacity style={{marginTop: props.marginTop,alignItems: 'center',justifyContent: 'center',height: props.height,borderRadius: props.borderRadius,width: props.width,padding: props.padding}}>
                <Button isLoading={props.isLoading} isLoadingText={props.text} variant="outline" height={'100%'} width={'100%'} padding={props.padding} borderRadius={props.borderRadius} colorScheme={props?.color || 'green' } size={'lg'} borderColor='green.900' />
            </TouchableOpacity>
        }
    </View>
    )
}
const styles = StyleSheet.create({
    button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default Index