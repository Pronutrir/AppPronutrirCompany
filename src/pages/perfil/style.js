import { StyleSheet, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    boxImg: {
        margin: 5,
        alignItems: 'flex-end'
    },
    perfilImg:{
        width: 80, 
        height: 80, 
        borderRadius: 60
    },
    box1: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    imgLogo: {
        margin: 10,
        width: 120,
        height: 120,
    },
    text1: {
        fontSize: RFValue(15, 680),
        color: '#1E707D',
    },
    text2: {
        fontSize: RFValue(15, 680),
        color: '#7A8B8E',
        padding: 5,
        textAlign: 'center'
    },
    text3: {
        fontSize: RFValue(21, 680),
        color: '#7A8B8E',
        marginHorizontal: 10,
    },
    inputText: {
        width: (Dimensions.get("screen").width / 10 * 8),
        height: (Dimensions.get("screen").height / 15),
        color: '#7A8B8E',
        textAlign: 'center',
        backgroundColor: '#fff',
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowOpacity: 0.2,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            }
        }),
        flexDirection: 'row',
        marginVertical: 10,
        fontSize: RFValue(16, 680),
    },
    TextAgendar: {
        color: '#08948A',
        fontWeight: 'bold',
        fontSize: RFValue(16, 680),
        marginRight: 20
    },
    card:{
        width: '100%',
        height:  Dimensions.get('screen').height / 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        borderRadius: 10,
        margin: 5,
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 1
                },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            }
        }),
    },
    item1:{
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item2:{
        flex: 2,
        alignItems: 'flex-start'
    },
    item3:{
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize: RFValue(18, 680),
        color: '#748080'
    },
    textInfo:{
        fontSize: RFValue(14, 680),
        color: '#748080',
        opacity: 0.5
    }
})

export default styles;