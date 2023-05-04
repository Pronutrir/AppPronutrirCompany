import { Dimensions, Platform, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box1: {
    flex: 3.5,
    justifyContent: 'center',
  },
  box2: {
    flex: 1,
  },
  cameraAndroid: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 2,
  },
  cameraAndroidFoto: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraElements: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    backgroundColor: '#2D2D2D',
  },
  cameraElements2: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
  },
  smartphoneImage: {
    width: 50,
    resizeMode: 'contain',
  },
  capture: {
    backgroundColor: '#10C0C6',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
    }),
    borderRadius: 60,
    padding: 5,
  },
  btn: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
    borderRadius: 60,
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 20,
    marginHorizontal: 40,
  },
  buttonText: {
    color: '#08948A',
    fontWeight: 'bold',
    fontSize: RFValue(16, 680),
    textAlign: 'center',
  },
  perfilImg: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 1000,
  },
  textLabel: {
    fontSize: RFValue(16, 680),
    color: '#666666',
    fontWeight: 'bold',
    margin: 10,
  },
  textBtn: {
    fontSize: RFValue(16, 680),
    color: '#08948A',
    fontWeight: '600',
  },
  buttonContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    padding: 20,
  },
  camButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    //ADD backgroundColor COLOR GREY
    backgroundColor: '#B2BEB5',

    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
});

export default styles;
