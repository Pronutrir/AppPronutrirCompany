import {
    Dimensions,
    Keyboard,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useContext, useRef, useState } from 'react';
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
import { Formik } from 'formik';
import * as Yup from 'yup';
import { valicacaoCPF } from '../../../services/validacaoCpf';
import { cpfMask } from '../../../services/validacoes';
import Checkbox from '../../../components/checkbox/checkbox';
import SelectedDropdown from '../../../components/selectedDropdown/SelectedDropdown';
import {
    IGetFamiliar,
    useAddFamiliar,
    useVincularFamiliar,
} from '../../../hooks/useFamiliar';
import AuthContext, { IPessoaFisica } from '../../../contexts/auth';
import ModalCentralizedOptions, {
    ModalHandles,
} from '../../../components/Modais/ModalCentralizedOptions';
import { useQueryClient } from 'react-query';
import NotificationGlobalContext from '../../../contexts/notificationGlobalContext';

type ProfileScreenRouteProp = RouteProp<
    RootStackParamList,
    'AcompanhateSinaisVitais'
>;
interface Props {
    route: ProfileScreenRouteProp;
}
interface Form {
    NOME: string;
    CPF: string;
    RG: string;
    PARENTESCO: {
        label: string,
        nR_SEQ_GRAU_PARENTESCO: number,
    };
    SEXO: string;
    SELECT: string;
}

const parentescoList = [
    { label: 'Amigo', nR_SEQ_GRAU_PARENTESCO: 2 },
    { label: 'Avô(ó)', nR_SEQ_GRAU_PARENTESCO: 5 },
    { label: 'Cônjuge/Companheira(o)', nR_SEQ_GRAU_PARENTESCO: 10 },
    { label: 'Cunhado(a)', nR_SEQ_GRAU_PARENTESCO: 9 },
    { label: 'Irmã(o)', nR_SEQ_GRAU_PARENTESCO: 1 },
    { label: 'Mãe', nR_SEQ_GRAU_PARENTESCO: 6 },
    { label: 'Pai', nR_SEQ_GRAU_PARENTESCO: 7 },
    { label: 'Primo(a)', nR_SEQ_GRAU_PARENTESCO: 4 },
    { label: 'Sobrinho(a)', nR_SEQ_GRAU_PARENTESCO: 8 },
    { label: 'Tio(a)', nR_SEQ_GRAU_PARENTESCO: 3 },
];

const sexoList = [
    { label: 'Feminino', iE_GENDER: 'F' },
    { label: 'Indeterminado', iE_GENDER: 'I' },
    { label: 'Masculino', iE_GENDER: 'M' },
];

const addAcompanhanteSinaisVitais = ({ route }: Props) => {
    const { addAlert } = useContext(NotificationGlobalContext);
    const {
        stateAuth: { usertasy },
        useGetFetchQuery,
    } = useContext(AuthContext);
    const { ConsultaCpfRg } = useContext(AuthContext);

    const queryClient = useQueryClient();
    const navigation = useNavigation();

    const { mutateAsync: mutateAsyncAddFamiliar } = useAddFamiliar();
    const { mutateAsync: mutateAsyncVincularFamiliar } = useVincularFamiliar();
    const [pessoaFisica, setPessoaFisica] = useState<
        IPessoaFisica | undefined
    >();
    const [valuesform, setValuesForm] = useState<Form | undefined>();

    const refModalOptions1 = useRef<ModalHandles>(null);
    const refModalOptions2 = useRef<ModalHandles>(null);

    const refSelected = useRef<string>('CPF');
    const refModal = useRef<LoadHandles>(null);

    const theme = useTheme();
    const styles = useThemeAwareObject(createStyle);

    

    const verifyAcompanhante = async (values: Form) => {
        refModal.current?.openModal();

        const listFamily = useGetFetchQuery<IGetFamiliar[]>('familiares');

        if (values.PARENTESCO.nR_SEQ_GRAU_PARENTESCO === 5) {
            let validationPartern = false;

            if (listFamily && listFamily?.length > 0) {
                validationPartern = !listFamily?.some(
                    (item) => item.nR_SEQ_GRAU_PARENTESCO === 7,
                );
            }
            if (validationPartern || !listFamily || listFamily?.length <= 0) {
                addAlert({
                    message:
                        'favor cadastrar um membro pai antes de cadastrar o avô/avó!',
                    status: 'info',
                });
                refModal.current?.closeModal();
                return;
            }
        }

        const result = await ConsultaCpfRg(values.CPF, values.RG);

        setValuesForm(values);
        refModal.current?.closeModal();
        if (result) {
            setPessoaFisica(result);
            refModalOptions1.current?.openModal();
        } else {
            refModalOptions2.current?.openModal();
        }
    };

    const addAcompanhante = async (values?: Form) => {
        try {
            if (values) {
                refModal.current?.openModal();
                await mutateAsyncAddFamiliar({
                    cD_PESSOA_FISICA:
                        route.params.PessoaFisica.cD_PESSOA_FISICA,
                    nR_CPF: values.CPF,
                    nR_IDENTIDADE: values.RG,
                    iE_GENDER: values.SEXO,
                    nM_PESSOA_FISICA: values.NOME,
                    nR_SEQ_GRAU_PARENTESCO: values.PARENTESCO.nR_SEQ_GRAU_PARENTESCO,
                });
                navigation.goBack();
                queryClient.invalidateQueries('familiares');
            }
        } catch (error) {
            refModal.current?.closeModal();
        } finally {
            refModal.current?.closeModal();
        }
    };

    const vincularAcompanhante = async (
        valuesform?: Form,
        pessoaFisica?: IPessoaFisica,
    ) => {
        try {
            if (valuesform && pessoaFisica) {
                refModal.current?.openModal();
                await mutateAsyncVincularFamiliar({
                    cD_PESSOA_FISICA:
                        route.params.PessoaFisica.cD_PESSOA_FISICA,
                    cD_PESSOA_FAMILIA: pessoaFisica.cD_PESSOA_FISICA,
                    cD_PROFESSIONAL: usertasy.cD_PESSOA_FISICA,
                    nM_USUARIO: 'AppMobile',
                    nR_SEQ_GRAU_PARENTESCO: valuesform.PARENTESCO.nR_SEQ_GRAU_PARENTESCO,
                    iE_GENDER: valuesform.SEXO,
                    nM_USUARIO_NREC: 'AppMobile',
                });
                refModal.current?.closeModal();
                queryClient.invalidateQueries('familiares');
                navigation.goBack();
            }
        } catch (error) {
            refModal.current?.closeModal();
        }
    };

    const FormSchema = Yup.object().shape({
        NOME: Yup.string()
            .required('Nome é obrigatório!')
            .matches(/(\w.+\s).+/, 'Insira o nome e sobrenome'),
        CPF: Yup.lazy(() => {
            switch (refSelected.current) {
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
            console.log(refSelected.current)
            switch (refSelected.current) {
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
        PARENTESCO: Yup.number()
            .required('Parentesco é obrigatório!')
            .test('validation', 'Parentesco é obrigatório!', (value) =>
                value ? value > 0 : false,
            ),
        SEXO: Yup.string().required('Sexo é obrigatório!'),
    });

    const MyReactNativeForm = () => (
        <Formik
            initialValues={{
                NOME: '',
                CPF: '',
                RG: '',
                PARENTESCO: {
                    label: '',
                    nR_SEQ_GRAU_PARENTESCO: 0,
                },
                TOUCHED: '', 
                SEXO: '',
                SELECT: 'CPF',
            }}
            onSubmit={(values) => verifyAcompanhante(values)}
            validationSchema={FormSchema}>
            {({
                handleSubmit,
                values,
                errors,
                touched,
                setFieldValue,
                setTouched,
            }) => (
                <>
                {console.log(errors.CPF)}
                    <View style={styles.containerForm}>
                        <View style={styles.boxForm}>
                            <Text style={styles.title}>
                                Dados do acompanhante
                            </Text>
                            <InputStandard
                                error={
                                    errors.NOME && touched.NOME
                                        ? errors.NOME
                                        : undefined
                                }
                                placeholder={'Nome completo'}
                                style={styles.inputText}
                                activeColor={theme.colors.TEXT_PRIMARY}
                                fontSize={theme.typography.SIZE.fontysize14}
                                fontColor={theme.colors.TEXT_SECONDARY}
                                onChangeText={(item) => {
                                    setFieldValue('NOME', item);
                                }}
                                onEndEditing={() => {
                                    setTouched({ ...touched, ['NOME']: true })
                                }}
                                value={values.NOME}
                            />
                        </View>
                        <View style={styles.boxForm}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginBottom: 10,
                                }}>
                                <Checkbox
                                    isChecked={values.SELECT === 'CPF'}
                                    text="CPF"
                                    onPress={(isChecked, text) => {
                                        setFieldValue('SELECT', text);
                                        if(text){
                                            refSelected.current = text;
                                        }
                                    }}
                                />
                                <Checkbox
                                    isChecked={values.SELECT === 'RG'}
                                    text="RG"
                                    onPress={(isChecked, text) => {
                                        setFieldValue('SELECT', text);
                                        if(text){
                                            refSelected.current = text;
                                        }
                                    }}
                                />
                            </View>
                            {values.SELECT === 'CPF' && (
                                <InputStandard
                                    error={
                                        errors.CPF && touched.CPF
                                            ? errors.CPF
                                            : undefined
                                    }
                                    placeholder={'Digite o CPF'}
                                    style={styles.inputText}
                                    activeColor={theme.colors.TEXT_PRIMARY}
                                    fontSize={theme.typography.SIZE.fontysize14}
                                    fontColor={theme.colors.TEXT_SECONDARY}
                                    onChangeText={(e) =>
                                        setFieldValue('CPF', cpfMask(e))
                                    }
                                    keyboardType={'numeric'}
                                    onEndEditing={() => {
                                        setTouched({
                                            ...touched,
                                            ['CPF']: true,
                                        })
                                    }}
                                    value={values.CPF}
                                />
                            )}
                            {values.SELECT === 'RG' && (
                                <InputStandard
                                    error={
                                        errors.RG && touched.RG
                                            ? errors.RG
                                            : undefined
                                    }
                                    placeholder={'Digite o RG'}
                                    style={styles.inputText}
                                    activeColor={theme.colors.TEXT_PRIMARY}
                                    fontSize={theme.typography.SIZE.fontysize14}
                                    fontColor={theme.colors.TEXT_SECONDARY}
                                    onChangeText={(e) => setFieldValue('RG', e)}
                                    keyboardType={'numeric'}
                                    onEndEditing={() => {
                                        setTouched({
                                            ...touched,
                                            ['RG']: true,
                                        })
                                    }}
                                    value={values.RG}
                                />
                            )}
                        </View>
                        <View style={styles.boxSelect}>
                            <SelectedDropdown
                                error={
                                    errors.PARENTESCO && touched.TOUCHED
                                        ? true
                                        : false
                                }
                                data={parentescoList}
                                placeholder="Parentesco"
                                maxHeight={RFPercentage(25)}
                                DropDownStyle={styles.SelectedDropdown}
                                onChange={(value) => {
                                    setFieldValue(
                                        'PARENTESCO',
                                        value,
                                    ),
                                        setTouched({
                                            ...touched,
                                            ['TOUCHED']: true,
                                        });
                                }}
                                //value={values.PARENTESCO}
                            />
                            <SelectedDropdown
                                error={
                                    errors.SEXO && touched.SEXO ? true : false
                                }
                                data={sexoList}
                                placeholder="Sexo"
                                maxHeight={RFPercentage(15)}
                                DropDownStyle={styles.SelectedDropdown}
                                onChange={(value) => {
                                    setFieldValue('SEXO', value.iE_GENDER),
                                        setTouched({
                                            ...touched,
                                            ['SEXO']: true,
                                        });
                                }}
                                //value={values.SEXO}
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
            <ModalCentralizedOptions
                ref={refModalOptions1}
                onpress={() => vincularAcompanhante(valuesform, pessoaFisica)}
                message={
                    'O acompanhante já possui cadastro, deseja vincular-lo ao paciente ?'
                }
            />
            <ModalCentralizedOptions
                ref={refModalOptions2}
                onpress={() => addAcompanhante(valuesform)}
                message={
                    'O acompanhante não possui cadastro, deseja cadastra-lo e vincular-lo ao paciente ?'
                }
            />
        </Pressable>
    );
};

export default addAcompanhanteSinaisVitais;

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
            backgroundColor: theme.colors.BACKGROUND_1,
        },
        Error: {
            color: 'red',
            fontSize: RFValue(14, 680),
        },
    });
    return styles;
};
