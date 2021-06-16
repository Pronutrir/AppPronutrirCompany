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
    },
    box1_item1: {
        width: '65%',
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            }
        }),
        backgroundColor:"#fff",
        marginTop: 5,
        borderRadius: 10,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    box2: {
        width: '85%',
        height: '100%',
        borderLeftWidth: 1,
        borderLeftColor: '#C1C9C9',
        margin: 20,
        paddingLeft: 10
    },
    box2_item1: {
        flexDirection: 'row',
    },
    box2_item1: {
        backgroundColor: '#fff',
        width: (Dimensions.get('window').width / 10),
        height: (Dimensions.get('window').width / 10),
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            }
        }),
       marginLeft: -Dimensions.get('window').width / 12,
       marginTop: -Dimensions.get('window').width / 23, 
    },
    box2_item2:{
        flex: 1
    },
    options1Text: {
        fontSize: RFValue(30, 680),
        color: '#7C9292'
    },
    label: {
        color: '#7C9292',
        fontSize: RFValue(18, 680),
        fontWeight: 'bold'
    },
    btnAgendar: {
        width: '40%',
        height: (Dimensions.get('window').height / 15),
        backgroundColor: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            }
        }),
        marginBottom: 10,
        marginTop: 20,
        flexDirection: 'row'
    },
    TextAgendar:{
        color: '#08948A',
        fontWeight: 'bold',
        fontSize: RFValue(16, 680),
        marginRight: 20
    },
    text: {
        color: '#7A8888',
        fontSize: RFValue(18, 680)
    },
    btnConsultas: {
        width: 25,
        height: 25,
        elevation: 3,
        backgroundColor: 'red',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginLeft: -5
    },
    box1_item2: {
        justifyContent: 'flex-end',
        marginBottom: -15,
        marginLeft: -25,
        width: 20,
    },
    btn: {
        width: Dimensions.get('screen').width / 10,
        height: Dimensions.get('screen').width / 10,
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            }
        }),
        backgroundColor: "#fff",
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 25,
        height: 25,
    },
    TextTitulo:{
        color: '#666666',
        fontSize: RFValue(20, 680),
        fontWeight: 'bold'
    }

})

export default styles;