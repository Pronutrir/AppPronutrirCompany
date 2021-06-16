import { StyleSheet, Dimensions } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    box1: {
        flex: 1.5
    },
    box2: {
        flex: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    box3: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    imageMedicamento: {
        flex: 1,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').width,
        resizeMode: 'contain'
    },
    textLabel: {
        fontSize: RFValue(16, 680),
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center'
    },
    text: {
        fontSize: RFValue(14, 680),
        marginVertical: 10,
        textAlign: 'justify',
        paddingHorizontal: 20
    },
    labelHorario:{
        fontSize: RFValue(16, 680),
        color: '#666666',
        paddingTop: 10,
        alignSelf: 'flex-start',
        marginLeft: 20
    },
    box1Modal: {
        flex: 0.8,
        width: `100%`,
        backgroundColor: '#6bbfb9',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    box2Modal: {
        flex: 2.5,
        width: `100%`,
        backgroundColor: '#fff'

    },
    box3Modal: {
        flex: 1.5,
        width: `100%`,
        flexDirection: 'row',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#6bbfb9',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
})

export default styles;