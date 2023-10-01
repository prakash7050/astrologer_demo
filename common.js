import { useColorScheme } from "react-native"





const textColor = (isDarkMode) =>{
    if(isDarkMode){
        return {color:'black'}
    }else{
        return {color:'black'}
    }
}

const backgroundColor = (isDarkMode) =>{
    if(isDarkMode){
        return {backgroundColor: 'black'}
    }else{
        return {backgroundColor: 'black'}
    }
}

export const tabBarColor = '#ff99dd';

const iconColor = (iconName,name) =>{
    const isDarkMode = useColorScheme() === 'dark'
    const color = '#ff99dd';
    if(iconName === name){
        return color;
    }else{
        return isDarkMode ? 'white' : 'black';
    }
}

export {
    backgroundColor, iconColor, textColor
}