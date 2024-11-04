import {
    Dimensions,
    Platform,
    ScrollView,
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
import { cpfMask, DateMask, foneMask } from '../../../services/validacoes';
import Checkbox from '../../../components/checkbox/checkbox';
import SelectedDropdown from '../../../components/selectedDropdown/SelectedDropdown';
import {
    IFamiliarSimples,
    useAddFamiliar,
    useVincularFamiliar,
} from '../../../hooks/useFamiliar';
import AuthContext from '../../../contexts/auth';
/* import { useQueryClient } from 'react-query'; */
import moment from 'moment';
import ModalCentralize, {
    ModalHandles,
} from '../../../components/Modais/ModalCentralize';
import CardDuplicidadeAcompanhante from '../components/cardDuplicidadeAcompanhante/cardDuplicidadeAcompanhante';

type ProfileScreenRouteProp = RouteProp<
    RootStackParamList,
    'AcompanhateSinaisVitais'
>;
interface Props {
    route: ProfileScreenRouteProp;
}
interface Form {
    NOME: string;
    NASCIMENTO: string;
    FONE?: string;
    CPF?: string;
    RG?: string;
    PARENTESCO?: {
        label: string | null;
        nR_SEQ_GRAU_PARENTESCO: number;
    };
    TOUCHED: '';
    SEXO?: {
        label: string | null;
        iE_GENDER: string;
    };
    SELECT: string;
}

const parentescoList = [
    { value: 1, label: 'Pai', nR_SEQ_GRAU_PARENTESCO: 1 },
    { value: 2, label: 'Mãe', nR_SEQ_GRAU_PARENTESCO: 2 },
    { value: 3, label: 'Filho', nR_SEQ_GRAU_PARENTESCO: 3 },
    { value: 4, label: 'Primo(a)', nR_SEQ_GRAU_PARENTESCO: 4 },
    { value: 5, label: 'Tio(a)', nR_SEQ_GRAU_PARENTESCO: 5 },
    { value: 6, label: 'Avô(ó)', nR_SEQ_GRAU_PARENTESCO: 6 },
    { value: 7, label: 'Irmã(o)', nR_SEQ_GRAU_PARENTESCO: 7 },
    { value: 8, label: 'Cunhado(a)', nR_SEQ_GRAU_PARENTESCO: 8 },
    { value: 9, label: 'Sobrinho(a)', nR_SEQ_GRAU_PARENTESCO: 9 },
    { value: 10, label: 'Amigo', nR_SEQ_GRAU_PARENTESCO: 10 },
    { value: 11, label: 'Bisavô(ó)', nR_SEQ_GRAU_PARENTESCO: 11 },
    { value: 12, label: 'Neto(a)', nR_SEQ_GRAU_PARENTESCO: 12 },
    { value: 13, label: 'Bisneto(a)', nR_SEQ_GRAU_PARENTESCO: 13 },
    { value: 14, label: 'Sogro(a)', nR_SEQ_GRAU_PARENTESCO: 14 },
    { value: 15, label: 'Genro(a)', nR_SEQ_GRAU_PARENTESCO: 15 },
    { value: 16, label: 'Cônjuge/Companheira(o)', nR_SEQ_GRAU_PARENTESCO: 16 },
];

const sexoList = [
    { label: 'Feminino', iE_GENDER: 'F' },
    { label: 'Indeterminado', iE_GENDER: 'I' },
    { label: 'Masculino', iE_GENDER: 'M' },
];

const AddAcompanhanteSinaisVitais = ({ route }: Props) => {
    const {
        stateAuth: { usertasy },
    } = useContext(AuthContext);

    /* const queryClient = useQueryClient(); */
    const navigation = useNavigation();

    const { mutateAsync: mutateAsyncAddFamiliar } = useAddFamiliar();
    const { mutateAsync: mutateAsyncVincularFamiliar } = useVincularFamiliar();

    const refModalOptions1 = useRef<ModalHandles>(null);
    const [dadosDuplicidade, SetDadosDuplicidade] =
        useState<IFamiliarSimples | null>(null);

    const refSelected = useRef<string>('CPF');
    const refModal = useRef<LoadHandles>(null);

    const theme = useTheme();
    const styles = useThemeAwareObject(createStyle);

    const refValuesform = useRef<Form>({
        NOME: '',
        NASCIMENTO: '',
        FONE: '',
        CPF: '',
        RG: '',
        SELECT: 'CPF',
        PARENTESCO: {
            label: null,
            nR_SEQ_GRAU_PARENTESCO: 0,
        },
        TOUCHED: '',
        SEXO: {
            label: null,
            iE_GENDER: '',
        },
    });

    const addAcompanhante = async (values?: Form) => {
        try {
            if (values) {
                refValuesform.current = values;
                refModal.current?.openModal();
                const { MSG, DADOS } = await mutateAsyncAddFamiliar({
                    cod_Pf_Paciente: route.params.PessoaFisica.cD_PESSOA_FISICA,
                    cod_Pf_Profissional: usertasy.cD_PESSOA_FISICA,
                    dt_Nascimento: moment(
                        values.NASCIMENTO,
                        'DD-MM-YYYY',
                    ).format('YYYY-MM-DD'),
                    nm_Pessoa_Fisica: values.NOME.trim(),
                    nr_CPF: values.CPF ? values.CPF.replace(/[.-]/g, '') : null,
                    nr_Identidade: values.RG ? values.RG : null,
                    ie_Sexo: values.SEXO ? values.SEXO.iE_GENDER : null,
                    nr_Ddd: values.FONE
                        ? values.FONE.replace(/[() -]/g, '').substring(0, 2)
                        : null,
                    nr_Telefone_Celular: values.FONE
                        ? values.FONE.replace(/[() -]/g, '').substring(2, 12)
                        : null,
                    cod_Grau_Parentesco: values?.PARENTESCO
                        ?.nR_SEQ_GRAU_PARENTESCO
                        ? values?.PARENTESCO?.nR_SEQ_GRAU_PARENTESCO
                        : null,
                    nm_Usuario: 'AppMobile',
                });
                refModal.current?.closeModal();
                if (
                    MSG ===
                    'A Pessoa fisica já possui cadastro na base de dados!' &&
                    DADOS
                ) {
                    SetDadosDuplicidade({ ...DADOS });
                    setTimeout(
                        () => {
                            refModalOptions1.current?.openModal();
                        },
                        Platform.OS === 'android' ? 0 : 500,
                    );
                } else {
                    navigation.goBack();
                }
            }
        } catch (error) {
            refModal.current?.closeModal();
        }
    };

    const VincularAcompanhante = async (valuesform: Form) => {
        setTimeout(
            () => {
                refModalOptions1.current?.closeModal();
            },
            Platform.OS === 'android' ? 0 : 500,
        );
        if (dadosDuplicidade?.id_Pessoa_Fisica) {
            refModal.current?.openModal();
            await mutateAsyncVincularFamiliar({
                cod_Pf_Familiar: dadosDuplicidade?.id_Pessoa_Fisica,
                cod_Grau_Parentesco:
                    valuesform.PARENTESCO?.nR_SEQ_GRAU_PARENTESCO,
                cod_Pf_Paciente: route.params.PessoaFisica.cD_PESSOA_FISICA,
                cod_Pf_Profissional: usertasy.cD_PESSOA_FISICA,
                nm_Usuario: 'AppMobile',
                ie_Sexo: valuesform.SEXO?.iE_GENDER,
            });
            refModal.current?.closeModal();
            navigation.goBack();
        }
    };

    const validacaoTelefone = (telefone: string | null | undefined) => {
        if (!telefone) {
            return false;
        }
        const regex = /^\([1-9]{2}\) 9[0-9]{4}-[0-9]{4}$/;
        return regex.test(telefone);
    };

    const FormSchema = Yup.object().shape({
        SELECT: Yup.string(),
        NOME: Yup.string()
            .required('Nome é obrigatório!')
            .max(30, "Limite maximo de caracteres!")
            .matches(/(\w.+\s).+/, 'Insira o nome e sobrenome'),
        NASCIMENTO: Yup.string()
            .required('Data de nascimento é obrigatória!')
            .matches(
                /([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[0-9]{4}/,
                'Insira uma data valida',
            )
            .test('validation', 'Insira uma data valida', (value) => {
                return value ? Boolean(!(value.length > 10)) : false;
            }),
        FONE: Yup.string()
            .required("Telefone é obrigatório!")
            .test(
                'validationTelefone',
                'Telefone inválido',
                (value) => (value !== undefined ? validacaoTelefone(value) : true),
            ),
        CPF: Yup.string().test('validationCpf', 'CPF inválido', (value) => {
            return value !== undefined
                ? valicacaoCPF(value?.replace(/[.-]/g, ''))
                : true;
        }),
        RG: Yup.string().max(18, 'Verifique a quantidade de caracteres'),
    });

    const MyReactNativeForm = () => (
        <Formik
            initialValues={refValuesform.current}
            onSubmit={(values) => addAcompanhante(values)}
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
                    <View style={styles.containerForm}>
                        <View>
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
                                    setTouched({ ...touched, ['NOME']: true });
                                }}
                                value={values.NOME}
                            />
                            <View style={styles.boxInput}>
                                <InputStandard
                                    error={
                                        errors.NASCIMENTO && touched.NASCIMENTO
                                            ? errors.NASCIMENTO
                                            : undefined
                                    }
                                    placeholder={'Data de nascimento'}
                                    style={styles.inputTextRow}
                                    activeColor={theme.colors.TEXT_PRIMARY}
                                    fontSize={theme.typography.SIZE.fontysize14}
                                    fontColor={theme.colors.TEXT_SECONDARY}
                                    keyboardType={'numeric'}
                                    onChangeText={(item) => {
                                        setFieldValue(
                                            'NASCIMENTO',
                                            DateMask(item),
                                        );
                                    }}
                                    onEndEditing={() => {
                                        setTouched({
                                            ...touched,
                                            ['NASCIMENTO']: true,
                                        });
                                    }}
                                    value={values.NASCIMENTO}
                                />
                                <InputStandard
                                    error={
                                        errors.FONE && touched.FONE
                                            ? errors.FONE
                                            : undefined
                                    }
                                    placeholder={'Telefone'}
                                    style={styles.inputTextRow}
                                    activeColor={theme.colors.TEXT_PRIMARY}
                                    fontSize={theme.typography.SIZE.fontysize14}
                                    fontColor={theme.colors.TEXT_SECONDARY}
                                    keyboardType={'numeric'}
                                    onChangeText={(item) => {
                                        setFieldValue('FONE', foneMask(item));
                                    }}
                                    onEndEditing={() => {
                                        setTouched({
                                            ...touched,
                                            ['FONE']: true,
                                        });
                                    }}
                                    value={values.FONE}
                                />
                            </View>
                        </View>
                        <View>
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
                                        if (text) {
                                            refSelected.current = text;
                                        }
                                    }}
                                />
                                <Checkbox
                                    isChecked={values.SELECT === 'RG'}
                                    text="RG"
                                    onPress={(isChecked, text) => {
                                        setFieldValue('SELECT', text);
                                        if (text) {
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
                                    onChangeText={(e) => {
                                        setFieldValue('CPF', cpfMask(e), true);
                                        setFieldValue('RG', '');
                                    }}
                                    keyboardType={'numeric'}
                                    onEndEditing={() => {
                                        setTouched({
                                            ...touched,
                                            ['CPF']: true,
                                        });
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
                                    onChangeText={(e) => {
                                        setFieldValue('RG', e, true);
                                        setFieldValue('CPF', '');
                                    }}
                                    keyboardType={'numeric'}
                                    onEndEditing={() => {
                                        setTouched({
                                            ...touched,
                                            ['RG']: false,
                                        });
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
                                placeholder={
                                    refValuesform.current.PARENTESCO?.label
                                        ? refValuesform.current.PARENTESCO.label
                                        : 'Parentesco'
                                }
                                maxHeight={RFPercentage(25)}
                                DropDownStyle={styles.SelectedDropdown}
                                onChange={(value) => {
                                    setFieldValue('PARENTESCO', value),
                                        setTouched({
                                            ...touched,
                                            ['TOUCHED']: true,
                                        });
                                }}
                            />
                            <SelectedDropdown
                                error={
                                    errors.SEXO && touched.SEXO ? true : false
                                }
                                data={sexoList}
                                placeholder={
                                    refValuesform.current.SEXO?.label
                                        ? refValuesform.current.SEXO?.label
                                        : 'Sexo'
                                }
                                maxHeight={RFPercentage(15)}
                                DropDownStyle={styles.SelectedDropdown}
                                onChange={(value) => {
                                    setFieldValue('SEXO', value),
                                        setTouched({
                                            ...touched,
                                            ['SEXO']: true,
                                        });
                                }}
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
        <ScrollView style={styles.container}>
            <View style={styles.boxCard}>
                <Text style={styles.title}>Paciente</Text>
                <PessoaFisicaComponent
                    PessoaFisica={route.params.PessoaFisica}
                />
            </View>
            <View style={styles.box}>
                <MyReactNativeForm />
            </View>
            <Loading ref={refModal} />
            <ModalCentralize ref={refModalOptions1}>
                <CardDuplicidadeAcompanhante
                    historicoSinaisVitais={dadosDuplicidade}
                    onPressOK={() =>
                        VincularAcompanhante(refValuesform.current)
                    }
                    onPressCancel={() => refModalOptions1.current?.closeModal()}
                />
            </ModalCentralize>
        </ScrollView>
    );
};

export default AddAcompanhanteSinaisVitais;

const createStyle = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.BACKGROUND_2,
        },
        boxCard: {
            flex: 0.5,
            width: '100%',
            backgroundColor: theme.colors.BACKGROUND_1,
            padding: RFPercentage(1),
            marginTop: RFPercentage(1),
            justifyContent: 'center',
        },
        box: {
            flex: 2,
            width: '100%',
            backgroundColor: theme.colors.BACKGROUND_1,
            padding: RFPercentage(1),
            paddingVertical: RFPercentage(5),
            marginTop: RFPercentage(1),
        },
        boxInput: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        containerForm: {
            width: '100%',
            paddingHorizontal: RFPercentage(1),
            justifyContent: 'space-between',
        },
        boxSelect: {
            flexDirection: 'row',
            justifyContent: 'center',
        },
        title: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
            textAlign: 'center',
        },
        btnContainer: {
            width: '100%',
            marginTop: RFPercentage(2),
            alignSelf: 'flex-end',
            height: RFPercentage(10),
        },
        inputText: {
            marginVertical: RFPercentage(2),
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
        },
        inputTextRow: {
            width: (Dimensions.get('screen').width / 100) * 45,
            paddingHorizontal: RFPercentage(1),
            marginVertical: RFPercentage(2),
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
        textMenssage: {
            fontSize: theme.typography.SIZE.fontysize16,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            padding: 20,
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
