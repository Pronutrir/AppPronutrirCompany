import { StyleSheet, Platform, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    box1: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box2: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box3: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgFoto2: {
        marginTop: -50,
        width: 130,
        height: 120,
    },
    logo: {
        resizeMode: 'contain',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height / 10,
    },
    imgFoto: {
        resizeMode: 'contain',
    },
    Btn: {
        margin: 20,
        width: (Dimensions.get('screen').width / 100) * 60,
        height: 40,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        ...Platform.select({
            android: {
                elevation: 3,
            },
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.2,
                shadowRadius: 2,
            },
            default: {
                elevation: 3,
            },
        }),
    },
    text: {
        color: '#1E707D',
        fontSize: RFValue(20, 680),
        fontWeight: 'bold',
    },
    img: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height / 10,
        paddingHorizontal: 10,
    },
});

export default styles;
