import { StyleSheet, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 10
    },
    box1: {
        flexDirection: 'row',
    },
    box1_item1: {
        width: '100%',
        marginTop: 5,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box1_item2: {
        justifyContent: 'flex-end',
        marginBottom: -10,
        marginLeft: -25,
        width: 10
    },
    box2: {
        width: '90%',
        flex: 1,
        alignItems: 'flex-start',
        borderLeftWidth: 1,
        borderLeftColor: '#C1C9C9'
    },
    box2_item2: {
        marginVertical: Dimensions.get('screen').width / 40
    },
    box2_item3: {
        marginVertical: Dimensions.get('screen').width / 40
    },
    TextTitulo: {
        color: '#666666',
        fontSize: RFValue(20, 680),
        fontWeight: 'bold'
    },
    text: {
        color: '#7A8888',
        fontSize: RFValue(18, 680),
        fontWeight: 'bold'
    },
    text2: {
        color: '#7C9292',
        fontSize: RFValue(18, 680),
    },
    btn: {
        width: 40,
        height: 40,
        elevation: 3,
        backgroundColor: "#fff",
        borderRadius: 30,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: Dimensions.get('screen').width / 18,
        height: Dimensions.get('screen').width / 18,
    },
    options1: {
        backgroundColor: '#fff',
        width: Dimensions.get('screen').width / 10,
        height: Dimensions.get('screen').width / 10,
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
        marginLeft: -Dimensions.get('window').width / 20,
        marginTop: -Dimensions.get('window').width / 13,
    },
    options1Text: {
        fontSize: RFValue(30, 680),
        color: '#7C9292'
    },
    textLabel: {
        fontSize: RFValue(18, 680),
        color: '#7C9292',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    box2_item6: {
        alignItems: 'center',
    },
    btnAgendar: {
        width: '50%',
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
                elevation: 5,
            }
        }),
        marginBottom: 10,
        marginTop: 20,
        flexDirection: 'row'
    },
    TextAgendar: {
        color: '#08948A',
        fontWeight: 'bold',
        fontSize: RFValue(16, 680),
        marginRight: 20
    },
    box2_item4: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '80%',
        borderBottomWidth: 2,
        borderBottomColor: '#AEABAB',
        textAlign: 'center',
        fontSize: RFValue(20, 680),
        color: '#7C9292',
        fontWeight: 'bold'
    },
    textErro: {
        color: 'red',
        alignSelf: 'center'
    }
})

export default styles