import { useEffect, useState } from 'react'
import { Text } from 'react-native'

const { Image, View } = require('native-base')



const ImageIcon = ({name}) =>{
    const [imagePath, setImagePath] = useState("")
    console.log(imagePath,name,"<<<<<<<<<<<<imagePath<<<","./image/" + name + ".png")

    useEffect(()=>{
        if(name){
            const imageFilePath = "./image/" + name + ".png"
            setImagePath(imageFilePath)
        }
    },[name])

    return(
    // <>
    //     {imagePath && <Image
    //         style={{width: 40,height: 50}}
    //         source={require(`${imagePath}`)}
    //         resizeMode='contain' alt='....' />}
    //     </>
        
        <View>
            <Text>Hello</Text>
        </View>
    )
}

export default ImageIcon;