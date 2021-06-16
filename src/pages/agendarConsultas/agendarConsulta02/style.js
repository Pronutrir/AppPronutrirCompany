import { StyleSheet, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    box1: {
        flexDirection: 'row',
        marginBottom: 25,
    },
    box1_item1: {
        width: '60%',
        ...Platform.select({
            ios:{
                shadowOffset:{
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android:{
                elevation: 3,
            }
        }),
        backgroundColor: "#fff",
        marginTop: 5,
        borderRadius: 10,
        padding: 8,
    },
    box1_item2: {
        justifyContent: 'space-between',
        marginBottom: -10,
        marginLeft: -25,
        width: 20,
    },
    img: {
        width: Dimensions.get('screen').width / 15,
        height: Dimensions.get('screen').width / 15,
        tintColor: 'black'
    },
    imgDisabled: {
        width: Dimensions.get('screen').width / 15,
        height: Dimensions.get('screen').width / 15,
        tintColor: '#c5c1c1'
    },
    btnConsultas: {
        width: Dimensions.get('screen').width / 15,
        height: Dimensions.get('screen').width / 15,
        elevation: 3,
        backgroundColor: 'red',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginLeft: -5
    },
    btn: {
        width: 40,
        height: 40,
        elevation: 3,
        backgroundColor: "#fff",
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: RFValue(14, 680),
        color: '#7A8888'
    },
    box2: {
        flex: 1,
        width: '85%',
        alignItems: 'flex-start',
        borderLeftWidth: 1,
        borderLeftColor: '#C1C9C9'
    },
    box2_item1: {
        flexDirection: 'row'
    },
    consultaBtn: {
        width: 25,
        height: 25,
        elevation: 3,
        backgroundColor: '#7C9292',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    box2_item1: {
        backgroundColor: '#fff',
        width: Dimensions.get('screen').width / 10,
        height: Dimensions.get('screen').width / 10,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios:{
                shadowOffset:{
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android:{
                elevation: 3,
            }
        }),
        marginLeft: -Dimensions.get('window').width / 20,
        marginTop: -Dimensions.get('window').width / 13,
    },
    box2_item2:{
        paddingRight: 20, 
        width: "110%"
    },
    options1Text: {
        fontSize: RFValue(30, 680),
        color: '#7C9292'
    },
    box2_item3: {
        alignItems: 'center',
        width: '100%'
    },
    btnPage2: {
        backgroundColor: '#fff',
        width: 50,
        height: 50,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios:{
                shadowOffset:{
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android:{
                elevation: 3,
            }
        }),
        marginVertical: 10
    }
})

export default styles;