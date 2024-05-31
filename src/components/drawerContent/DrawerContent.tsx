import React, { useContext, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading, { LoadHandles } from '../../components/Loading/Loading';
import AuthContext from '../../contexts/auth';
import auth from '@react-native-firebase/auth';
import SelectedDropdown from '../selectedDropdown/SelectedDropdown';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { ThemeContextData } from '../../contexts/themeContext';
import { DrawerContentComponentProps } from '@react-navigation/drawer/lib/typescript/src/types';
import { savePerfil, saveUnidade } from '../../utils';
import { IPerfis } from '../../reducers/UserReducer';
import NotificationMultOptions, {
  ModalHandles,
} from '../Notification/NotificationMultOptions';
import ModalCentralize, {
  ModalHandles as ModalHandlesSelect,
} from '../Modais/ModalCentralize';
import { IUnidade, useUnidades } from '../../hooks/useEstabelecimentos';
import { RFPercentage } from 'react-native-responsive-fontsize';
import VersionInfo from 'react-native-version-info';
import { useQueryClient } from 'react-query';
import ShimerPlaceHolderSelected from '../shimmerPlaceHolder/shimerPlaceHolderSelected';

const DrawerContent = (props: DrawerContentComponentProps) => {
  const styles = useThemeAwareObject(createStyles);

  const queryClient = useQueryClient();

  const loadingRef = useRef<LoadHandles>(null);
  const notificationRef = useRef<ModalHandles>(null);
  const modalSelectPerfisRef = useRef<ModalHandlesSelect>(null);
  const modaSelectUnidadelRef = useRef<ModalHandlesSelect>(null);

  const {
    stateAuth: {
      usertasy,
      usertasy: { usuariO_FUNCIONARIO_PERFIL },
      PerfilSelected,
      UnidadeSelected,
    },
    dispatchAuth,
  } = useContext(AuthContext);

  const { data: unidades } = useUnidades();

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        queryClient.clear();
        dispatchAuth({ type: 'delUser', payload: '' });
        loadingRef.current?.openModal();
      })
      .catch(() => {
        console.log('erro');
      });
  };

  const RefactoryPerfisData = () => {
    const result = usuariO_FUNCIONARIO_PERFIL.map(element => {
      return {
        index: element.cD_PERFIL.toString(),
        label: element.dS_PERFIL,
        value: element,
      };
    });
    return result.sort((a, b) => {
      return a.label < b.label ? -1 : a.label > b.label ? 1 : 0;
    });
  };

  const SelectedUnidadeApp = (item: IUnidade) => {
    modaSelectUnidadelRef.current?.closeModal();
    props.navigation.closeDrawer();
    dispatchAuth({ type: 'setUnidade', payload: item });
    saveUnidade(item);
  };

  const SelectedPerfilApp = (item: IPerfis) => {
    modalSelectPerfisRef.current?.closeModal();
    dispatchAuth({ type: 'setPerfilApp', payload: item });
    savePerfil(item);
    setTimeout(() => {
      loadingRef.current?.openModal();
    }, 500);

    setTimeout(() => {
      loadingRef.current?.closeModal();
      props.navigation.closeDrawer();
    }, 2000);
  };

  useEffect(() => {
    if (UnidadeSelected === null) {
      modaSelectUnidadelRef.current?.openModal();
    }
  }, []);

  useEffect(() => {
    if (UnidadeSelected && PerfilSelected === null) {
      modalSelectPerfisRef.current?.openModal();
    }
  }, [UnidadeSelected]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.box1}>
        <Image
          style={styles.imgLogo}
          source={require('../../assets/imagens/PRONUTRIR-preview.png')}
        />
        <Text style={styles.text1}>Bem Vindo</Text>
        <Text style={styles.text2}>
          {usertasy ? usertasy.nM_PESSOA_FISICA : null}
        </Text>
        <Text style={styles.text2}>
          {usertasy
            ? `*** . *** . ${usertasy.nR_CPF.substring(
              6,
              9,
            )}-${usertasy.nR_CPF.substring(9, 11)}`
            : null}
        </Text>
      </View>
      <View style={styles.box2}>
        {usuariO_FUNCIONARIO_PERFIL ? (
          <SelectedDropdown
            data={RefactoryPerfisData()}
            onChange={({ value }) => SelectedPerfilApp(value)}
            value={{
              index: PerfilSelected?.cD_PERFIL.toString(),
              label: PerfilSelected?.dS_PERFIL,
              value: PerfilSelected,
            }}
            placeholder={'Perfil do App'}
          />
        ) : (
          <ShimerPlaceHolderSelected />
        )}
      </View>
      <View style={styles.box3}>
        <TouchableOpacity
          style={styles.btnSair}
          onPress={() => notificationRef.current?.openNotification()}>
          <Text style={styles.text3}>Sair</Text>
        </TouchableOpacity>
        <Text style={styles.text2}>Versão {VersionInfo.appVersion}</Text>
      </View>
      <NotificationMultOptions
        ref={notificationRef}
        title={'Mensagem'}
        message={'Deseja Realmente sair?'}
        onpress={() => logout()}
      />
      <ModalCentralize ref={modaSelectUnidadelRef} disableTouchOff={true}>
        <View style={styles.boxModalPerfil}>
          <Text style={styles.textLabelModal}>Selecione a unidade!</Text>

          {unidades ? (
            <SelectedDropdown
              data={unidades}
              onChange={({ value }) => SelectedUnidadeApp(value)}
              value={{
                index: UnidadeSelected?.cD_ESTABELECIMENTO,
                label: UnidadeSelected?.dS_ESTABELECIMENTO
                  .replace('PRONUTRIR ', '')
                  .replace('- ', ''),
                value: UnidadeSelected,
              }}
              placeholder={'Selecione a unidade'}
              maxHeight={RFPercentage(20)}
              ContainerStyle={styles.ContainerStyle}
            />
          ) : (
            <ShimerPlaceHolderSelected />
          )}
        </View>
      </ModalCentralize>
      <ModalCentralize ref={modalSelectPerfisRef} disableTouchOff={true}>
        <View style={styles.boxModalPerfil}>
          <Text style={styles.textLabelModal}>
            Selecione o perfil de acesso!
          </Text>
          {usuariO_FUNCIONARIO_PERFIL ? (
            <SelectedDropdown
              data={RefactoryPerfisData()}
              onChange={({ value }) => SelectedPerfilApp(value)}
              value={{
                index: PerfilSelected?.cD_PERFIL.toString(),
                label: PerfilSelected?.dS_PERFIL,
                value: PerfilSelected,
              }}
              placeholder={'Perfil do App'}
            />
          ) : (
            <ShimerPlaceHolderSelected />
          )}
        </View>
      </ModalCentralize>
      <Loading ref={loadingRef} />
    </KeyboardAvoidingView>
  );
};

export default DrawerContent;

const createStyles = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    box1: {
      flex: 1.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    box2: {
      flex: 1,
      paddingHorizontal: 35,
    },
    box3: {
      flex: 1,
      paddingHorizontal: 35,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imgLogo: {
      width: RFPercentage(8),
      height: RFPercentage(8),
    },
    ContainerStyle: {
      //justifyContent: 'center',
      //alignItems:'center'
    },
    text1: {
      fontSize: theme.typography.SIZE.fontysize22,
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_PRIMARY,
    },
    text2: {
      fontSize: theme.typography.SIZE.fontysize14,
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_SECONDARY,
      padding: 15,
      textAlign: 'center',
    },
    text3: {
      fontSize: theme.typography.SIZE.fontysize18,
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_SECONDARY,
      marginHorizontal: 10,
    },
    btn: {
      width: '100%',
      height: '55%',
      alignItems: 'center',
      backgroundColor: theme.colors.BACKGROUND_1,
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
          elevation: 3,
        },
      }),
      flexDirection: 'row',
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    btnSair: {
      width: '50%',
      height: '45%',
      alignItems: 'center',
      backgroundColor: theme.colors.BACKGROUND_1,
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
          elevation: 3,
        },
      }),
      flexDirection: 'row',
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    boxModalPerfil: {
      width: (Dimensions.get('screen').width / 100) * 70,
      alignItems: 'center',
      padding: 10,
    },
    textLabelModal: {
      fontSize: theme.typography.SIZE.fontysize14,
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_PRIMARY,
      marginHorizontal: 10,
    },
  });

  return styles;
};
