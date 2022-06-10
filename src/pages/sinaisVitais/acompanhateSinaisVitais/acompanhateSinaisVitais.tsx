import { StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import { ThemeContextData } from '../../../contexts/themeContext';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import PessoaFisicaComponent from '../components/pessoaFisicaComponent/pessoaFisicaComponent';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/routeDashboard';

type ProfileScreenRouteProp = RouteProp<
    RootStackParamList,
    'AcompanhateSinaisVitais'
>;

interface Props {
    route: ProfileScreenRouteProp;
}

const AcompanhateSinaisVitais = ({ route }: Props) => {
    const styles = useThemeAwareObject(createStyle);
    
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Paciente</Text>
                <PessoaFisicaComponent
                    PessoaFisica={route.params.PessoaFisica}
                />
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>Dados do acompanhante</Text>

            </View>
        </View>
    );
};

export default AcompanhateSinaisVitais;

const createStyle = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: theme.colors.BACKGROUND_2,
            marginHorizontal: 10,
        },
        box: {
            width: '100%',
            backgroundColor: theme.colors.BACKGROUND_1,
            padding: 10,
            marginTop: 10,
        },
        title: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
            textAlign: 'center',
        },
    });
    return styles;
};
