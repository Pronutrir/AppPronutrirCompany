import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    imgGif:{
        width: Dimensions.get('screen').width / 5,
        height: Dimensions.get('screen').width / 5
    },
    box1: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    box2: {
        flex: 1,
    },
    img:{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height / 10,
        paddingHorizontal: 10
    }
})

export default styles
