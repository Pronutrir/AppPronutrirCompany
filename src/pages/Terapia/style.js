import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    box1: {
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box1_item1: {
        width: '40%',
        elevation: 3,
        backgroundColor: "#fff",
        marginTop: 5,
        borderRadius: 10,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#7A8888',
        marginHorizontal: 5
    },
    box2: {
        width: '100%',
        padding: 10,
    },
    consultaBtn: {
        width: 25,
        height: 25,
        elevation: 3,
        backgroundColor: '#7C9292',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    box2_item1: {
        width: (Dimensions.get('window').width / 100 * 95),
        height: (Dimensions.get('window').height / 8),
        backgroundColor: '#DDE2E2',
    },
    box2_item2: {
       marginBottom: 270
    },
    options1Text: {
        fontSize: 30,
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
        elevation: 3,
        marginVertical: 10
    },
    textLabel: {
        fontSize: 18,
        color: '#666666'
    },
    textNumero: {
        color: "#7C9292",
        fontSize: 22
    },
    box2_item1_1:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    box2_item1_2:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    btnConsultas:{
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        flexDirection: 'row'
    }
})

export default styles;