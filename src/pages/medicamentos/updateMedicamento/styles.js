import { StyleSheet, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    box1: {
        height: 10,
        backgroundColor: '#08948A'
    },
    box2: {
        flex: 5,
        backgroundColor: '#fff',
        paddingHorizontal: 10
    },
    box3: {
        flex: 0.1,
        backgroundColor: '#fff',
        paddingHorizontal: 10
    },
    containerAutoComplete: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 2,
        position: 'absolute',
        width: '85%',
        zIndex: 1,
        marginLeft: 25,
        marginTop: 50,
        maxHeight: 400,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    AutoComplete: {
        padding: 10
    },
    title: {
        color: '#1E707D',
        fontSize: RFValue(16, 680)
    },
    descricao:{
        color: '#748080',
        fontSize: RFValue(12, 680)
    },
    apresentacao:{
        color: '#748080',
        fontSize: RFValue(12, 680)
    },
    input: {
        width: '70%',
        height: Dimensions.get('screen').height / 100 * 5,
        paddingVertical: 3,
        fontSize: RFValue(18, 680),
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        color: '#7A8B8E'
    },
    containerComplete: {
        width: '80%',
    },
    item: {
        flex: 1,
        marginBottom: 10
    },
    btnImg: {
        width: 15,
        height: 15,
        tintColor: '#fff'
    },
    nameMedicamento: {
        fontSize: RFValue(20, 680),
        color: 'black'
    },
    cardDescription: {
        width: '90%',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#00A1A3',
        padding: 10,
        alignSelf: 'center',
        borderRadius: 10
    },
    TextDescriptionlabel: {
        fontSize: RFValue(20, 680),
        color: '#00A1A3'
    },
    TextDescription: {
        fontSize: RFValue(20, 680),
        color: '#00A1A3'
    },
    btnClear: {
        backgroundColor: '#fff',
        elevation: 3,
        borderRadius: 5,
        paddingHorizontal: 5
    },
    textBtn: {
        color: '#00A1A3',
        fontSize: 20,
    },
    cardBox1: {
        flex: 1,
        marginVertical: 5
    },
    cardBox2: {
        flex: 4,
        marginVertical: 5
    },
    TextMsn:{
        fontSize: RFValue(20, 680),
        color: '#7A8B8E'
    }
})

export default styles;