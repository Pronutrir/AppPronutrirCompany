import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        marginTop: -70
    },
    box1:{
        flex: 0.3,
        justifyContent: 'flex-end',
        alignItems: 'center',
      
    },
    box2:{
        flex: 4,
    },
    box2item1:{
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10
    },
    SectionStyle:{
        width: (Dimensions.get('window').width / 4 * 3),
        height: (Dimensions.get('window').width / 7),
        margin: 5,
        flexDirection: 'row',
        backgroundColor: '#fff',
        elevation: 5
    },
    logo:{
        resizeMode: 'cover',
    },
    Icon:{
        margin: 15,
    },
    logo1:{
        resizeMode: 'cover',
        tintColor: '#f0f1f5'
    },
    input: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
    },
    btn: {       
        backgroundColor: '#fff',
        elevation: 10,
        margin: 20,
        padding: 10
    },
    textBtn:{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    text:{
        color: '#08948A',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text2:{
        color: '#08948A',
        fontSize: 18,
    },
    textError:{
        fontSize: 10, 
        color: 'red'
    }

})

export default styles