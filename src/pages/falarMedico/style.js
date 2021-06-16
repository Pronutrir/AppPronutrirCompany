import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    box1: {
        alignItems: 'center',
        backgroundColor: '#E6ECEC',
    },
    containerAutoComplete: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 2,
        position: 'absolute',
        width: '60%',
        zIndex: 1,
        marginLeft: 25,
        marginTop: 85,
        maxHeight: 150,
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

    },
    box2: {
    },
    item1: {
        margin: 10,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    item2: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cardMedicamento: {
        backgroundColor: '#00A1A3',
        width: (Dimensions.get('window').width / 100 * 44),
        height: (Dimensions.get('window').height / 40 * 4),
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 10,
        elevation: 3,
        borderRadius: 10
    },
    box3: {
        flex: 1,
        margin: 10
    },
    title: {
        color: '#1E707D',
        fontSize: 20,
        margin: 10
    },
    input: {
        width: '70%',
        fontSize: 20,
        paddingLeft: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        color: '#7A8B8E'
    },
    containerComplete: {
        width: '80%',
    },
    item: {

    },
    btnImg: {
        width: 15,
        height: 15,
        tintColor: '#fff'
    },
    nameMedicamento: {
        fontSize: 20,
        color: '#fff'
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
        fontSize: 20,
        color: '#00A1A3'
    },
    TextDescription: {
        fontSize: 20,
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
        fontSize: 20,
        color: '#7A8B8E'
    }
})

export default styles;