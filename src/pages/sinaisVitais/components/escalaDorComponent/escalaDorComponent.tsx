import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AnimatedLottieView from 'lottie-react-native';
import { useThemeAwareObject } from '../../../../hooks/useThemedStyles';
import { ThemeContextData } from '../../../../contexts/themeContext';
import LinearGradient from 'react-native-linear-gradient';
interface Props {
    onpress(value: number): void;
    disabled?: boolean;
}
interface IEscalaDor {
    id: number;
    label: string;
    uri: string;
    gradient: string[];
    btn: number[];
}

const escalaDeDor: IEscalaDor[] = [
    {
        id: 1,
        label: 'Sem dor',
        uri: require('../../../../assets/Animacoes/emoji-semDor.json'),
        gradient: ['#25B8D9', '#25B8D9'],
        btn: [0],
    },
    {
        id: 2,
        label: 'Leve',
        uri: require('../../../../assets/Animacoes/emoji-leve.json'),
        gradient: ['#25B8D9', '#03A64A'],
        btn: [1, 2, 3],
    },
    {
        id: 3,
        label: 'Moderada',
        uri: require('../../../../assets/Animacoes/emoji-moderada.json'),
        gradient: ['#03A64A', '#D9B811'],
        btn: [4, 5, 6],
    },
    {
        id: 4,
        label: 'Intensa',
        uri: require('../../../../assets/Animacoes/emoji-intensa.json'),
        gradient: ['#D9B811', '#F28C0F'],
        btn: [7, 8, 9],
    },
    {
        id: 5,
        label: 'Insuportável',
        uri: require('../../../../assets/Animacoes/emoji-insuportavel.json'),
        gradient: ['#F28C0F', '#BF2A2A'],
        btn: [10],
    },
];

const EscalaDorComponent: React.FC<Props> = ({
    onpress,
    disabled = false,
}: Props) => {
    const styles = useThemeAwareObject(createStyles);

    const CardEscalaDor = ({ item }: { item: IEscalaDor }) => {
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={item.gradient}
                style={styles.card}>
                <View style={styles.box1}>
                    <AnimatedLottieView
                        source={item.uri}
                        autoPlay={true}
                        loop={true}
                        style={styles.emoji}
                    />
                </View>
                <View style={styles.box2}>
                    {item.btn.map((element, index) => {
                        return (
                            <TouchableOpacity
                                key={index.toString()}
                                disabled={disabled}
                                style={styles.btn}
                                onPress={() => onpress(element)}>
                                <Text style={styles.number}>{element}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <View style={styles.box3}>
                    <Text style={styles.textGrau}>{item.label}</Text>
                </View>
            </LinearGradient>
        );
    };

    return (
        <View style={styles.container}>
            {escalaDeDor.map((item) => {
                return <CardEscalaDor key={item.id.toString()} item={item} />;
            })}
        </View>
    );
};

export default React.memo(EscalaDorComponent);

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            //justifyContent: 'space-around',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: RFPercentage(1),
        },
        card: {
            backgroundColor: 'green',
            width: RFPercentage(13),
            margin: RFPercentage(0.2),
            alignItems: 'center',
            flexDirection: 'column',
        },
        box1: {
            padding: RFPercentage(1),
        },
        box2: {
            flexDirection: 'row',
        },
        box3: {
            backgroundColor: 'transparent',
            width: '100%',
            paddingVertical: RFPercentage(0.5),
        },
        emoji: {
            width: RFPercentage(6),
            height: RFPercentage(6),
        },
        btn: {
            width: RFPercentage(3.5),
            height: RFPercentage(3.5),
            backgroundColor: 'white',
            margin: RFPercentage(0.2),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
        },
        textGrau: {
            textAlign: 'center',
            fontSize: theme.typography.SIZE.fontysize12,
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.WHITE,
        },
        number: {
            fontSize: theme.typography.SIZE.fontysize12,
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.BLACK,
        },
    });
    return styles;
};
