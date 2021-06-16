import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    box1: {
        width: (Dimensions.get('window').width),
        height: (Dimensions.get('window').height / 10 * 7),
        padding: 20,
    },
    box2: {
        width: (Dimensions.get('window').width),
        height: (Dimensions.get('window').height / 10 * 1),
    },
    box1_1: {
        marginVertical: 10
    },
    box1_2: {
        marginVertical: 10
    },
    box1_3: {
        marginVertical: 10,
        width: (Dimensions.get('window').width),
        height: (Dimensions.get('window').height) / 10 * 2,
        flexDirection: 'row',
    },
    box1_4:{
        width: '100%',
        height: 50,
        alignItems: 'center',
    },
    input:{
        width: '90%', 
        borderBottomWidth: 1,
        borderColor: '#707070',
        fontSize: 25,
        textAlign: 'center',
        color: '#1E707D',
        letterSpacing: 2

    },
    boxImg: {
        width: '45%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxImg1: {
        padding: 30,
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 60
    },
    text1: {
        color: '#1E707D',
        fontSize: 22,
    },
    text2: {
        color: '#7A8B8E',
        fontSize: 15,
        width: '80%'
    },
    textCod:{
        color: '#1E707D',
        fontSize: 18,
        margin: 10
    },
    textImg:{
        marginTop: 10
    },
    box1_3Telefone:{
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textAguarde:{
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 20,
        color: '#1E707D'
    },
    textError:{
        color: 'red'
    },
    numero1:{
        borderWidth: 3,
        borderColor: 'black'
    }
})

export default styles
