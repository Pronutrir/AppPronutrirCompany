import { StyleSheet, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    container:{
        width: windowWidth / 100 * 90, 
        height: windowHeight / 100 * 45
    },
    box1: {
        flex: 0.3,
        width: `100%`,
        backgroundColor: '#6bbfb9',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    box2: {
        flex: 3,
        width: `100%`,
        backgroundColor: '#fff',
        padding: 10,
        justifyContent: 'space-evenly'
    },
    item1:{
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 5,
        borderBottomWidth: 2,
        borderColor: '#fff'
    },
    item2:{
        justifyContent: 'center', 
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: '#fff'
    },
    item3:{
        justifyContent: 'center', 
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: '#fff'
    },
    item4:{
        justifyContent: 'center', 
        alignItems: 'center',
    },
    box3: {
        flex: 1,
        width: `100%`,
        flexDirection: 'row',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#6bbfb9',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        marginHorizontal: 20,
        backgroundColor: '#84cac5',
        padding: 10,
        borderRadius: 30,
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
    boxBtn: {
        marginVertical: 10,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    img: {
        resizeMode: 'center'
    },
    text: {
        color: '#7C9292',
        fontSize: RFValue(14, 680),
        textAlign: 'center'
    },
    textBtn: {
        color: '#fff',
        fontSize: RFValue(14, 680),
        textAlign: 'center',
    },
    textTitulo: {
        color: '#7C9292',
        fontSize: RFValue(20, 680),
        textAlign: 'center',
        margin: 10
    },
    teste:{
        backgroundColor: '#fff',
        height: 200
    }
});

export default styles;