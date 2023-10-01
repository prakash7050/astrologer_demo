// import { ToastAndroid, useColorScheme } from "react-native"

import { ToastAndroid } from "react-native";


// export const isDarkMode = useColorScheme() === "dark"

// export const COLORS = {
//     TEXT_COLOR : isDarkMode ? 'white' : "black",
//     BACK_GROUN_CLOROR : isDarkMode ? "white" : "black"
// }

export const panRegex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/
export const aadhaarRegex = /^([0-9]){4}([0-9]){4}([0-9]){4}?$/
export const nameRegex = /^([a-zA-Z])([a-z" "A-Z])*$/
export const phoneRegExp = /^([0-9]){10}?$/
export const capitalizeWords = (string) => {
    const trimString = string.trim(' ');
    return trimString.replace(/\s\s+/g, ' ');
};
export const FILE_UPLOAD_TYPE = {
	VEHICLE_VIABILITY : 'vehicle_viability',
}

export const notifyUser = message => {
	ToastAndroid.show(message, ToastAndroid.SHORT)
}

export const ERROR_MESSAGE = {
	MOBILE_NO_NOT_VALID: 'Mobile no. not valid',
	IS_REQUIRED: ' is required',
	EMAIL_NOT_VALID: 'email not valid',
	NOT_VALID_NUMBER: ' is not valid number',
	PINCODE_NOT_VALID: 'Pincode is not valid',
	UUID_NOT_VALID: 'is not valid id',
	SHOULD_BE_GREATER_THAN_ZERO: 'should be greater than 0',
	NOT_VALID: 'is not valid',
}

export const TYPE = {
    INVOICE: 'invoice',
    BILL: 'bill',
    ORDER: 'order',
    QUOTATION: 'quotation',
    RETURN: 'return'
}

export const STATE = {
    SUBMIT: 'submit',
    DRAFT: 'draft'
}