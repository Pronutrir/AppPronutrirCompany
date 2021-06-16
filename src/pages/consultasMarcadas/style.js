import { Dimensions, StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    box1: {
        width: (Dimensions.get('window').width),
        height: (Dimensions.get('window').height / 6),
        marginBottom: (Dimensions.get('window').height / 200),
        padding: (Dimensions.get('window').height / 100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    box1_item1: {
        flex: 1,
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
                elevation: 3
            }
        }),
        backgroundColor: '#fff',
        marginTop: 5,
        borderRadius: 10,
        padding: (Dimensions.get('window').height / 40),
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: RFValue(14, 680),
        color: '#7A8888',
        marginHorizontal: 5
    },
    box2: {
        flex: 1
    },
    consultaBtn: {
        width: 25,
        height: 25,
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
                elevation: 3
            }
        }),
        backgroundColor: '#7C9292',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    box2_item1: {
        width: '100%',
        height: (Dimensions.get('window').height / 7),
        backgroundColor: '#DDE2E2',
    },
    box2_item2: {
        flex: 1,
        paddingHorizontal: 10,
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
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 3
            }
        }),
        marginVertical: 10
    },
    textLabel: {
        fontSize: RFValue(18, 680),
        color: '#666666'
    },
    textNumero: {
        color: "#7C9292",
        fontSize: RFValue(22, 680)
    },
    box2_item1_1: {
        flex: 1,
        flexDirection: 'row',
    },
    box2_item1_2: {
        flex: 1,
        flexDirection: 'row'
    },
    btnConsultas: {
        flex: 1,
        margin: (Dimensions.get('window').height / 200),
        backgroundColor: '#fff',
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
                elevation: 3
            }
        }),
        flexDirection: 'row'
    },
    
    btnCaledario:{
        flex: 1,
        margin: (Dimensions.get('window').height / 200),
        backgroundColor: '#fff',
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
                elevation: 3
            }
        }),
        flexDirection: 'row'
    }
})

export default styles;