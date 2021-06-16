import { StyleSheet, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    box1:{
        flex: 4
    },
    box2:{
        flex: 1
    },
    label:{
        fontSize: RFPercentage(2.5),
        color: '#7A8888'
    }
});

export default styles;