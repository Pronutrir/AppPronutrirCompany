import { StyleSheet, Platform, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6ECEC',
    },
    box1: {
        width: Dimensions.get('screen').width,
        height: RFPercentage(8),
        flexDirection: 'row',
    },
    box2: {
        flex: 1,
    },
    btn: {
        flex: 1,
        backgroundColor: '#20c4cb',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 5,
        borderColor: '#20c4cb',
    },
    btnSelected: {
        borderColor: '#08948A',
    },
    textBtn: {
        color: '#fff',
        fontSize: RFValue(16, 680),
        fontWeight: 'bold',
        padding: 10,
    },
    ContainerModal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: '100%',
        marginVertical: 10,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    text: {
        color: '#7C9292',
        fontSize: RFValue(12, 680),
        marginTop: 5,
        textAlign: 'center',
    },
    btnTextModal: {
        width: RFPercentage(45),
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#666666',
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
    },
    textLabel: {
        color: '#666666',
        fontWeight: 'bold',
        fontSize: RFValue(12, 680),
        marginTop: 5,
        textAlign: 'center',
        marginBottom: 5,
    },
    viewEmpty: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: RFValue(22, 680),
    },
    textEmpty: {
        marginHorizontal: 10,
        fontSize: RFValue(16, 680),
        color: '#7C9292',
    },
    indicator: {
        position:"absolute",
        width:20,
        height: 5,
        //top:0,
        //right:0,
        backgroundColor:"red"
    },
    indicatorWrapper: {
        flexDirection: 'row',
        flex: 0.1,
        backgroundColor: 'green',
    }
});

export default styles;
