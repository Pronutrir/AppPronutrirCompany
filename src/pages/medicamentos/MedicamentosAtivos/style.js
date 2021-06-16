import { StyleSheet, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    titulo:{
        padding: 10,
        fontSize: RFValue(18, 680),
    },
    box1:{
        flex: 0.2,
        marginTop: 20,
        width: '80%',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    box2:{
        flex: 5
    },
    box3:{
        flex: 0.8
    },
    card: {
        width: '80%',
        height: Dimensions.get('screen').height / 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: "#fff",
        borderRadius: 10,
        margin: 10,
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
        })
    },
    item1: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 3,
        borderRightColor: '#b5dfdc'
    },
    item2: {
        flex: 2,
        alignItems: 'flex-start',
        marginLeft: 15
    },
    item3: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLabel: {
        fontSize: RFValue(16, 680),
        color: '#666666'
    },
    text: {
        fontSize: RFValue(12, 680),
        color: '#84cac5'
    }
})

export default styles;
