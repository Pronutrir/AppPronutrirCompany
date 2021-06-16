import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    box1:{
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box2:{
        width: (Dimensions.get('screen').width),
        height: (Dimensions.get('screen').height / 15) 
    },
    textInfo:{
        color: '#1E707D',
        fontSize: 26,
        textAlign: 'center'
    },
    text:{
        color: '#7A8B8E',
        fontSize: 15
    },
    input:{
        width: '80%',
        borderBottomColor: '#DBCCCC',
        borderBottomWidth:2,
        margin: 10,
        fontSize: 20,
        textAlign: 'center',
        color: '#7A8B8E'
    },
    Error:{
        color:'red',
        fontSize: 14
    },
    BackgroundImage:{
        flex: 1,
        resizeMode: 'cover'
    }

})

export default styles