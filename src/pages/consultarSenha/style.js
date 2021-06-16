import { Dimensions, StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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
        fontSize: RFValue(26, 680),
        textAlign: 'center'
    },
    text:{
        color: '#7A8B8E',
        fontSize: RFValue(15, 680)
    },
    input:{
        flex: 1,
        fontSize: RFValue(20, 680),
        textAlign: 'center',
        marginLeft: 30,
        color: '#7A8B8E'
    },
    sectionInput:{
        flexDirection: 'row',
        width: '80%',
        borderBottomColor: '#DBCCCC',
        borderBottomWidth:2,
        alignItems: 'center',
        marginVertical: 10
        //backgroundColor: 'blue'
    },
    Error:{
        color:'red',
        fontSize: RFValue(14, 680)
    },
    BackgroundImage:{
        flex: 1,
        resizeMode: 'cover'
    }

})

export default styles