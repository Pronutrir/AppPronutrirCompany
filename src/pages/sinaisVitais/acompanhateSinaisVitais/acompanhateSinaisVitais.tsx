import {
    Dimensions,
    Keyboard,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContextData } from '../../../contexts/themeContext';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import PessoaFisicaComponent from '../components/pessoaFisicaComponent/pessoaFisicaComponent';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/routeDashboard';
import { InputStandard } from 'react-native-input-outline';
import useTheme from '../../../hooks/useTheme';
import BtnCentered from '../../../components/buttons/BtnCentered';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Loading, { LoadHandles } from '../../../components/Loading/Loading';
import NotificationGlobalContext from '../../../contexts/notificationGlobalContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { valicacaoCPF } from '../../../services/validacaoCpf';
import { cpfMask } from '../../../services/validacoes';
import Checkbox from '../../../components/checkbox/checkbox';
import SelectedDropdown from '../../../components/selectedDropdown/SelectedDropdown';

type ProfileScreenRouteProp = RouteProp<
    RootStackParamList,
    'AcompanhateSinaisVitais'
>;
interface Props {
    route: ProfileScreenRouteProp;
}

interface form {
    Name: string;
    CPF: string;
    RG: string;
    Parentesco: string;
    Sexo: string;
}

const parentesco = [
    { label: 'Amigo' },
    { label: 'Avô(ó)' },
    { label: 'Cônjuge/Companheira(o)' },
    { label: 'Cunhado(a)' },
    { label: 'Irmã(o)' },
    { label: 'Mãe' },
    { label: 'Pai' },
    { label: 'Primo(a)' },
    { label: 'Sobrinho(a)' },
    { label: 'Tio(a)' },
];

const sexo = [
    { label: 'Feminino' },
    { label: 'Inderterminado' },
    { label: 'Masculino' },
];

const AcompanhanteSinaisVitais = ({ route }: Props) => {
    const navigation = useNavigation();
    const { addAlert } = useContext(NotificationGlobalContext);

    const [document, setDocument] = useState<string | undefined>('CPF');
    const nameRef = useRef<string | undefined>(undefined);

    const theme = useTheme();
    const styles = useThemeAwareObject(createStyle);

    const refModal = useRef<LoadHandles>(null);

    const addAcompanhante = (values: form) => {
        console.log(values);
        refModal.current?.openModal();
        setTimeout(() => {
            console.log('acompanhante adicionado!');
            refModal.current?.closeModal();
            addAlert({
                message: 'Acompanhante adicionado com sucesso!',
                status: 'sucess',
            });
            navigation.goBack();
        }, 2000);
    };

    const setCheckBox = (isChecked: boolean, text?: string) => {
        switch (text) {
            case 'CPF':
                setDocument(text);
                break;
            case 'RG':
                setDocument(text);
                break;
            default:
                break;
        }
    };

    const FormSchema = Yup.object().shape({
        Name: Yup.string()
            .required('Nome é obrigatório!')
            .matches(/(\w.+\s).+/, 'Insira ooo nome e sobrenome'),
        CPF: Yup.lazy(() => {
            switch (document) {
                case 'CPF':
                    return Yup.string()
                        .required('CPF é obrigatório!')
                        .test(
                            'validationCPF',
                            'CPF inválido',
                            (value) =>
                                Boolean(value) &&
                                valicacaoCPF(value?.replace(/[.-]/g, '')),
                        );
                    break;
                default:
                    return Yup.string().optional();
                    break;
            }
        }),
        RG: Yup.lazy(() => {
            switch (document) {
                case 'RG':
                    return Yup.string()
                        .required('RG é obrigatório!')
                        .max(18, 'Verifique a quantidade de caracteres');
                    break;
                default:
                    return Yup.string().optional();
                    break;
            }
        }),
    });

    useEffect(() => {
        setCheckBox(true, 'CPF');
    }, []);

    const MyReactNativeForm = () => (
        <Formik
            initialValues={{
                Name: '',
                CPF: '',
                RG: '',
                Parentesco: '',
                Sexo: '',
            }}
            onSubmit={(values) => addAcompanhante(values)}
            validationSchema={FormSchema}>
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldValue,
                setTouched
            }) => (
                <>
                    <View style={styles.containerForm}>
                        <View style={styles.boxForm}>
                            <Text style={styles.title}>
                                Dados do acompanhante
                            </Text>
                            <InputStandard
                                error={
                                    errors.Name && touched.Name
                                        ? errors.Name
                                        : undefined
                                }
                                placeholder={'Nome completo'}
                                style={styles.inputText}
                                activeColor={theme.colors.TEXT_PRIMARY}
                                fontSize={theme.typography.SIZE.fontysize14}
                                fontColor={theme.colors.TEXT_SECONDARY}
                                onChangeText={handleChange('Name')}
                                onEndEditing={(item) => { setTouched({...touched, ['Name']: true}), nameRef.current = item.nativeEvent.text } }
                                value={nameRef.current}
                            />
                        </View>
                        <View style={styles.boxForm}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginBottom: 10,
                                }}>
                                <Checkbox
                                    isChecked={document === 'CPF'}
                                    text="CPF"
                                    onPress={(isChecked, text) => {
                                        setCheckBox(isChecked, text);
                                    }}
                                />
                                <Checkbox
                                    isChecked={document === 'RG'}
                                    text="RG"
                                    onPress={(isChecked, text) => {
                                        setCheckBox(isChecked, text);
                                    }}
                                />
                            </View>
                            {document === 'CPF' && (
                                <InputStandard
                                    error={
                                        errors.CPF && touched.CPF
                                            ? errors.CPF
                                            : undefined
                                    }
                                    placeholder={'Documento de indentificação'}
                                    style={styles.inputText}
                                    activeColor={theme.colors.TEXT_PRIMARY}
                                    fontSize={theme.typography.SIZE.fontysize14}
                                    fontColor={theme.colors.TEXT_SECONDARY}
                                    onChangeText={(e) =>
                                        setFieldValue('CPF', cpfMask(e))
                                    }
                                    keyboardType={'numeric'}
                                    onEndEditing={handleBlur('CPF')}
                                    value={values.CPF}
                                />
                            )}
                            {document === 'RG' && (
                                <InputStandard
                                    error={
                                        errors.RG && touched.RG
                                            ? errors.RG
                                            : undefined
                                    }
                                    placeholder={'Documento de indentificação'}
                                    style={styles.inputText}
                                    activeColor={theme.colors.TEXT_PRIMARY}
                                    fontSize={theme.typography.SIZE.fontysize14}
                                    fontColor={theme.colors.TEXT_SECONDARY}
                                    onChangeText={(e) => setFieldValue('RG', e)}
                                    keyboardType={'numeric'}
                                    onEndEditing={handleBlur('RG')}
                                    value={values.RG}
                                />
                            )}
                        </View>
                        <View style={styles.boxSelect}>
                        {(touched.Parentesco && errors.Parentesco) && <Text style={styles.Error}>{errors.Parentesco}</Text>}
                            <SelectedDropdown
                                data={parentesco}
                                placeholder="Parentesco"
                                maxHeight={RFPercentage(25)}
                                DropDownStyle={styles.SelectedDropdown}
                                onChange={(value) =>
                                    setFieldValue('Parentesco', value.label)
                                }
                            />
                            <SelectedDropdown
                                data={sexo}
                                placeholder="Sexo"
                                maxHeight={RFPercentage(15)}
                                DropDownStyle={styles.SelectedDropdown}
                                onChange={(value) =>
                                    setFieldValue('Sexo', value.label)
                                }
                            />
                        </View>
                        <View style={styles.btnContainer}>
                            <BtnCentered
                                SizeText={18}
                                labelBtn={'Adicionar'}
                                onPress={() => handleSubmit()}
                                enabled={true}
                            />
                        </View>
                    </View>
                </>
            )}
        </Formik>
    );

    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.box}>
                <Text style={styles.title}>Paciente</Text>
                <PessoaFisicaComponent
                    PessoaFisica={route.params.PessoaFisica}
                />
            </View>
            <View style={styles.box}>
                <MyReactNativeForm />
            </View>
            <Loading ref={refModal} />
        </Pressable>
    );
};

export default AcompanhanteSinaisVitais;

const createStyle = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: theme.colors.BACKGROUND_2,
        },
        box: {
            width: '100%',
            backgroundColor: theme.colors.BACKGROUND_1,
            padding: RFPercentage(1),
            paddingVertical: RFPercentage(2),
            marginTop: RFPercentage(2),
        },
        containerForm: {
            width: '100%',
            paddingHorizontal: RFPercentage(3),
            justifyContent: 'space-between',
        },
        boxForm: {
            marginVertical: 20,
        },
        boxSelect: {
            flexDirection: 'row',
            justifyContent: 'center',
        },
        title: {
            margin: 10,
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
            textAlign: 'center',
        },
        btnContainer: {
            width: '100%',
            marginTop: RFPercentage(5),
            alignSelf: 'flex-end',
            height: RFPercentage(10),
        },
        inputText: {
            marginBottom: 20,
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
        },
        text: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
        },
        SelectedDropdown: {
            width: (Dimensions.get('screen').width / 10) * 4,
        },
        Error:{
            color:'red',
            fontSize: RFValue(14, 680)
        },
    });
    return styles;
};
