import { configSettingsFileVersion0_1 } from 'cspell-lib/dist/Settings/CSpellSettingsServer';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ThemeContextData } from '../../../contexts/themeContext';
import useTheme from '../../../hooks/useTheme';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
//import { WebView } from 'react-native-webview';

const sizeCheckbox = RFPercentage(5);

const optionsBolsa = [
    { id: 0, name: 'Manipulada' },
    { id: 1, name: 'Pronta' },
];

const optionsProgramacao = [
    { id: 0, name: 'Contínua' },
    { id: 1, name: 'Desmame' },
    { id: 2, name: 'Cíclica' },
];

const opstionsAcesso = [
    { id: 1, name: 'Veia jugular direita' },
    { id: 2, name: 'Veia jugular esquerda' },
    { id: 3, name: 'Veia subclávia direita' },
    { id: 4, name: 'Veia subclávia esquerda' },
    { id: 5, name: 'Veia femoral direita' },
    { id: 6, name: 'CVeia femoral esquerdaclica' },
    { id: 7, name: 'PICC membro superior direito' },
    { id: 8, name: 'PICC membro superior esquerdo' },
    { id: 9, name: 'Port-a-cath na região subclávia direita' },
    { id: 10, name: 'Port-a-cath na região subclávia esquerda' },
]

const optionsCurativo = [
    { id: 1, name: 'Filme' },
    { id: 2, name: 'Convencional' },
    { id: 3, name: 'Íntegro' },
    { id: 4, name: 'Comprometido' },
]

const optionsHospital = [
    { id: 1, name: 'Gênesis' },
    { id: 2, name: 'São Camilo' },
    { id: 3, name: 'Prontocárdio' },
    { id: 4, name: 'Monte Klinikum' },
    { id: 5, name: 'Gastroclínica' },
    { id: 6, name: 'Exército' },
    { id: 7, name: 'São Carlos' },
    { id: 8, name: 'Domicílio (especificar empresa)' },
]

const EvolucaoEnfermagem = () => {
    const styles = useThemeAwareObject(createStyles);
    const theme = useTheme();

    const [checkboxState, setCheckboxState] = useState(false);

    const collorCheckbox = theme.colors.TEXT_PRIMARY;
    const unfillColor = theme.colors.WHITE;
    return (
        <ScrollView style={styles.container}>
            {/* <Text style={styles.Titulo}>Notas clínicas</Text> */}
            <View style={styles.box}>
                <View style={styles.itemLabel}>
                    <Text style={styles.textLabel}>Bolsa:</Text>
                </View>
                <View style={styles.itensCheckBoxs}>
                    {optionsBolsa.map((item) => {
                        return (
                            <BouncyCheckbox
                                key={item.id}
                                size={sizeCheckbox}
                                fillColor={collorCheckbox}
                                unfillColor={unfillColor}
                                text={item.name}
                                textStyle={styles.text}
                                iconImageStyle={styles.iconImageStyle}
                                iconStyle={{ borderColor: collorCheckbox }}
                                style={styles.checkbox}
                                //textStyle={{ fontFamily: 'JosefinSans-Regular' }}
                                onPress={(isChecked: boolean) => {
                                    setCheckboxState(isChecked);
                                }}
                            />
                        );
                    })}
                </View>
            </View>
            <View style={styles.box}>
                <View style={styles.itemLabel}>
                    <Text style={styles.textLabel}>Programação:</Text>
                </View>
                <View style={styles.itensCheckBoxs}>
                    {optionsProgramacao.map((item) => {
                        return (
                            <BouncyCheckbox
                                key={item.id}
                                size={sizeCheckbox}
                                fillColor={collorCheckbox}
                                unfillColor={unfillColor}
                                text={item.name}
                                textStyle={styles.text}
                                iconImageStyle={styles.iconImageStyle}
                                iconStyle={{ borderColor: collorCheckbox }}
                                style={styles.checkbox}
                                //textStyle={{ fontFamily: 'JosefinSans-Regular' }}
                                onPress={(isChecked: boolean) => {
                                    setCheckboxState(isChecked);
                                }}
                            />
                        );
                    })}
                </View>
            </View>
            <View style={styles.box}>
                <View style={styles.itemLabel}>
                    <Text style={styles.textLabel}>Tipo de acesso:</Text>
                </View>
                <View style={styles.itensCheckBoxs}>
                    {opstionsAcesso.map((item) => {
                        return (
                            <BouncyCheckbox
                                key={item.id}
                                size={sizeCheckbox}
                                fillColor={collorCheckbox}
                                unfillColor={unfillColor}
                                text={item.name}
                                textStyle={styles.text}
                                iconImageStyle={styles.iconImageStyle}
                                iconStyle={{ borderColor: collorCheckbox }}
                                style={styles.checkbox}
                                //textStyle={{ fontFamily: 'JosefinSans-Regular' }}
                                onPress={(isChecked: boolean) => {
                                    setCheckboxState(isChecked);
                                }}
                            />
                        );
                    })}
                </View>
            </View>
            <View style={styles.box}>
                <View style={styles.itemLabel}>
                    <Text style={styles.textLabel}>Curativo:</Text>
                </View>
                <View style={styles.itensCheckBoxs}>
                    {optionsCurativo.map((item) => {
                        return (
                            <BouncyCheckbox
                                key={item.id}
                                size={sizeCheckbox}
                                fillColor={collorCheckbox}
                                unfillColor={unfillColor}
                                text={item.name}
                                textStyle={styles.text}
                                iconImageStyle={styles.iconImageStyle}
                                iconStyle={{ borderColor: collorCheckbox }}
                                style={styles.checkbox}
                                //textStyle={{ fontFamily: 'JosefinSans-Regular' }}
                                onPress={(isChecked: boolean) => {
                                    setCheckboxState(isChecked);
                                }}
                            />
                        );
                    })}
                </View>
            </View>
            <View style={styles.box}>
                <View style={styles.itemLabel}>
                    <Text style={styles.textLabel}>Hospital:</Text>
                </View>
                <View style={styles.itensCheckBoxs}>
                    {optionsHospital.map((item) => {
                        return (
                            <BouncyCheckbox
                                key={item.id}
                                size={sizeCheckbox}
                                fillColor={collorCheckbox}
                                unfillColor={unfillColor}
                                text={item.name}
                                textStyle={styles.text}
                                iconImageStyle={styles.iconImageStyle}
                                iconStyle={{ borderColor: collorCheckbox }}
                                style={styles.checkbox}
                                //textStyle={{ fontFamily: 'JosefinSans-Regular' }}
                                onPress={(isChecked: boolean) => {
                                    setCheckboxState(isChecked);
                                }}
                            />
                        );
                    })}
                </View>
            </View>
            <View style={styles.box}>
                <View style={styles.itemLabel}>
                    <Text style={styles.textLabel}>Observação:</Text>
                </View>
                <View style={{ flexWrap: 'wrap',width: '100%', height: 300, }}>
                    <TextInput style={{flex: 1, width: '100%', height: 300, borderWidth: 5, borderColor: 'red', textAlign: 'justify', flexWrap: 'wrap'}}/>
                </View>
            </View>
        </ScrollView>
    );
};

export default EvolucaoEnfermagem;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.BACKGROUND_1,
        },
        Titulo: {
            textAlign: 'center',
            fontSize: theme.typography.SIZE.fontysize20,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
        },
        box: {
            marginHorizontal: 5,
        },
        itensCheckBoxs: {
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
        },
        checkbox: {
            width: '50%',
            padding: 10,
            marginVertical: 5,
            alignItems: 'center',
            alignContent: 'center',
        },
        itemLabel: {
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 10,
        },
        textLabel: {
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: theme.typography.SIZE.fontysize18,
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
        },
        text: {
            maxWidth: RFPercentage(17),
            fontSize: theme.typography.SIZE.fontysize14,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            flexWrap: 'wrap',
        },
        iconImageStyle: {
            width: sizeCheckbox - 15,
            height: sizeCheckbox - 15,
        },
        iconStyle: {
            borderColor: theme.colors.TEXT_PRIMARY,
        },
    });
    return styles;
};
