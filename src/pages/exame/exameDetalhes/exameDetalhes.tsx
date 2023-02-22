import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/routeDashboard';
import { IExame, IFilesExames } from '../../../hooks/useExames';
import CardSimples from '../../../components/Cards/CardSimples';
import { ThemeContextData } from '../../../contexts/themeContext';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import moment from 'moment';
import { RFPercentage } from 'react-native-responsive-fontsize';
import useTheme from '../../../hooks/useTheme';
import ExameSvg from '../../../components/svgComponents/ExameSvg';
import RenderItemEmpty from '../../../components/renderItem/renderItemEmpty';
import Btnprosseguir from '../../../components/buttons/Btnprosseguir';
import { InfiniteData, useQueryClient } from 'react-query';
import { useIsFocused } from '@react-navigation/native';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ExameDetalhes'>;
interface Props {
    route: ProfileScreenRouteProp;
}

const ExameDetalhes: React.FC<Props> = ({
    route: {
        params: { exames },
    },
}: Props) => {
    const navigation = useNavigation();

    const theme = useTheme();
    const styles = useThemeAwareObject(createStyles);

    const isFocused = useIsFocused();

    const queryClient = useQueryClient();

    const filesExames = () => {
        const resultExames = queryClient
            .getQueryData<InfiniteData<IExame[]>>(['exame', 'infinite'])
            ?.pages.map((item) => item)
            .flat();

        return resultExames?.find(
            (elem) => elem.id_examination === exames.id_examination,
        )?.filesExames;
    };

    const redirectpage = (item: IFilesExames) => {
        switch (item.type) {
            case 'application/pdf':
                navigation.navigate('ExamePdf', {
                    guidFileStorage: item.guidFileStorage,
                });
                break;
            case 'image/png':
                navigation.navigate('ExameImg', {
                    guidFileStorage: item.guidFileStorage,
                });
                break;
            default:
                break;
        }
    };

    const renderItem = ({
        index,
        item,
    }: {
        index: number;
        item: IFilesExames;
    }) => {
        const fillSelected = (value: string) => {
            switch (value) {
                case 'E':
                    return theme.colors.BUTTON_SECUNDARY;
                case 'A':
                    return theme.colors.WARNING;
                default:
                    return theme.colors.BUTTON_SECUNDARY;
            }
        };

        return (
            <CardSimples
                key={index.toString()}
                styleCardContainer={styles.cardStyle}>
                <TouchableOpacity
                    key={index.toString()}
                    onPress={() => redirectpage(item)}
                    style={styles.containerCard}>
                    <View style={styles.box1Card}>
                        <ExameSvg
                            width={RFPercentage(4)}
                            height={RFPercentage(4)}
                            fill={theme.colors.FILL_ICONE}
                            fillSecondary={fillSelected(item.status)}
                        />
                    </View>
                    <View style={styles.box2Card}>
                        <View style={styles.item}>
                            <Text style={styles.textLabel}>Exame: </Text>
                            <Text style={styles.text}>{`${item?.name}`}</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.textLabel}>
                                Data do envio:{' '}
                            </Text>
                            <Text style={styles.text}>
                                {moment(item.dt_reg).format('DD-MM-YYYY')}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </CardSimples>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                nestedScrollEnabled={true}
                data={filesExames()}
                renderItem={({ item, index }) => renderItem({ index, item })}
                scrollEnabled
                keyExtractor={(item, index) => `key-${index}`}
                ListEmptyComponent={() => (
                    <RenderItemEmpty text="Nenhum exame encontrado!" />
                )}
                onEndReachedThreshold={0.3}
            />
            <Btnprosseguir
                valueText="Atualizar"
                onPress={() => {
                    ('');
                }}
            />
        </View>
    );
};

export default ExameDetalhes;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        containerCard: {
            flex: 1,
            flexDirection: 'row',
            paddingVertical: 10,
            justifyContent: 'space-around',
        },
        box1Card: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 3,
        },
        box2Card: {
            flex: 8,
            justifyContent: 'center',
            alignItems: 'flex-start',
            margin: 3,
        },
        textStyle: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
            textAlign: 'center',
        },
        cardStyle: {
            flex: 1,
            padding: 10,
        },
        item: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        textLabel: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
            fontSize: theme.typography.SIZE.fontysize16,
            textAlignVertical: 'center',
        },
        text: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
            textAlignVertical: 'center',
        },
    });
    return styles;
};
