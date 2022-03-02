import { StyleSheet, Dimensions, Platform, PixelRatio } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ThemeContextData } from '../../contexts/themeContext';

const styles = (theme: ThemeContextData) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.BACKGROUND_2,
    },
    box1: {
        width: (Dimensions.get('screen').width),
        height: (Dimensions.get('screen').height / 100 * 35),
        alignItems: 'center',
        marginBottom: 10
    },
    box2: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    box3:{
        width: (Dimensions.get('screen').width),
        height: (Dimensions.get('screen').height / 100 * 20),
    },
    box_3_1:{
        width: (Dimensions.get('screen').width / 2),
        height: (Dimensions.get('screen').height / 100 * 30),
        padding: 5
    },
    btnHorizontal:{
        flex: 1
    },
    imgBtnHorizoltal:{
         width: '100%',
         height: '100%',
         borderRadius: 10
     },
    box4:{
        width: (Dimensions.get('screen').width),
        height: (Dimensions.get('screen').height / 100 * 7),
        flexDirection: 'row',
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
    },
    box4_1:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    box4_1_1:{
        width: '80%',
    },
    box4_1_2:{
        width: '20%',
    },
    box4_2:{
        width:'30%',
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 10,
        elevation: 3
    },
    box4_2_img:{
        backgroundColor: theme.colors.BACKGROUND_1,
        padding: 8,
        borderRadius: 30,
        elevation: 5,
        shadowOffset:{
            width: 0,
            height: 5
        },
        shadowOpacity: 0.2,
        shadowRadius: 2
    },
    Animatable:{
        elevation: 3,
        shadowOffset:{
            width: 0,
            height: 5
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        paddingStart: 10,
        paddingTop: 3,
        paddingBottom: 3,
        flexDirection: 'row',
        backgroundColor: theme.colors.BACKGROUND_1,
        borderTopRightRadius: 10,
        borderBottomEndRadius: 10,
    },
    imgPost: {
        width: '80%',
        height: '70%',
        borderRadius: 10
    },
    boxPost:{
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.BROWNDARK,
        borderBottomEndRadius: 5,
        alignSelf: 'flex-start',
        margin: 15,
    },
    textPost: {
        fontSize: theme.typography.SIZE.fontysize16,
        fontFamily: theme.typography.FONTES.Bold,
        color: theme.colors.TEXT_SECONDARY,
        borderRadius: 5,
        padding: 2,
    },
    text:{
        flex: 1,
        fontSize: theme.typography.SIZE.fontysize14,
        fontFamily: theme.typography.FONTES.Bold,
        color: theme.colors.TEXT_SECONDARY,
    },
    btn: {
        flex: 1,
        backgroundColor: theme.colors.BACKGROUND_1,
        margin: 5,
        paddingVertical: PixelRatio.get() < 2 ? 10 : 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios:{
                shadowOffset:{
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android:{
                elevation: 3,
            }
        })
    },
    btnDisabled: {
        flex: 1,
        backgroundColor: theme.colors.BACKGROUND_1,
        margin: 5,
        paddingVertical: PixelRatio.get() < 2 ? 10 : 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios:{
                shadowOffset:{
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android:{
                elevation: 3,
            }
        }),
        opacity: 0.3 
    },
    imgBtn: {
        width: 30,
        height: 30,
        marginBottom: 5
    },
    img_btnHotrizontal:{
        flex: 1,
        height: '40%',
    },
    box_btnHorizontal: {
        height: Dimensions.get('screen').height / 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5
    },
    text_btnHorizontal:{
        fontSize: theme.typography.SIZE.fontysize10,
        fontFamily: theme.typography.FONTES.Light,
        letterSpacing: theme.typography.LETTERSPACING.S,
        color: theme.colors.TEXT_SECONDARY,
        textAlign: 'center',
    },
    box4_text:{
        fontSize: theme.typography.SIZE.fontysize10,
    }
})

export default styles
