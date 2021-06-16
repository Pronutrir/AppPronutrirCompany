import { StyleSheet, Platform, Dimensions } from 'react-native';
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
        marginBottom: 25,
    },
    circle: {
        height: Dimensions.get('screen').width / 16,
        width: Dimensions.get('screen').width / 16,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#ACACAC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    info:{
        flexDirection:'row',
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
    },
    box1_item1: {
        width: '60%',
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
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5
    },
    box1_item2: {
        justifyContent: 'flex-end',
        marginBottom: -10,
        marginLeft: -25,
        width: 10
    },
    box2: {
        width: '90%',
        height: '100%',
        alignItems: 'flex-start',
        borderLeftWidth: 1,
        borderLeftColor: '#C1C9C9',
    },
    box2_item2: {
        opacity: 9
    },
    text: {
        fontSize: RFValue(16, 680),
        color: '#7A8888'
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
                elevation: 3
            }
        }),
        backgroundColor: "#fff",
        borderRadius: 30,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
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
        margin: 10,
        fontSize: RFValue(18, 680),
        color: '#08948A'
    },
    box2_item5: {
        marginVertical: 10
    },
    box2_item6: {
        alignItems: 'center',
        marginBottom: 70
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
        marginVertical: 20
    },
    selected: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    selectedImg: {
        width: 50,
        height: 50,
        marginLeft: -15
    },
    box2_item1: {
        paddingRight: 20, 
        width: "110%"
    }
})

export default styles