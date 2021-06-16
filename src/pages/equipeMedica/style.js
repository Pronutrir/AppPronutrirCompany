import { StyleSheet, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 10
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
        margin: 10,
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
                elevation: 3
            }
        }),
    },
    item1:{
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item2:{
        flex: 2,
        alignItems: 'center'
    },
    item3:{
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize: RFValue(18, 680),
        color: '#748080'
    }
});

export default styles;