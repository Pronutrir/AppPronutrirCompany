import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/routeDashboard';
import { IFilesExames } from '../../../hooks/useExames';
import CardSimples from '../../../components/Cards/CardSimples';
import { ThemeContextData } from '../../../contexts/themeContext';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import moment from 'moment';
import { RFPercentage } from 'react-native-responsive-fontsize';
import ExameSvg from '../../../assets/svg/exame.svg';

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
    const styles = useThemeAwareObject(createStyles);

    const renderItem = ({
        index,
        item,
    }: {
        index: number;
        item: IFilesExames;
    }) => {
        return (
            <CardSimples
                key={index.toString()}
                styleCardContainer={styles.cardStyle}>
                <TouchableOpacity
                    key={index.toString()}
                    onPress={() =>
                        navigation.navigate('ExameDetalhes', { exames: item })
                    }
                    style={styles.containerCard}>
                    <View style={styles.box1Card}>
                        <ExameSvg
                            width={RFPercentage(5)}
                            height={RFPercentage(5)}>
                            Botão
                        </ExameSvg>
                    </View>
                    <View style={styles.box2Card}>
                        <View style={styles.item}>
                            <Text style={styles.textLabel}>Exame: </Text>
                            <Text style={styles.text}>{`${item?.name}`}</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.textLabel}>
                                Data Nascimento:{' '}
                            </Text>
                            <Text style={styles.text}>
                                {moment(item.dt_update).format('DD-MM-YYYY')}
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
                data={exames.filesExames}
                renderItem={({ item, index }) => renderItem({ index, item })}
                scrollEnabled
                keyExtractor={(item, index) => `key-${index}`}
                //ListEmptyComponent={renderItemEmpty}
                //onEndReached={LoadingSearch}
                onEndReachedThreshold={0.3}
                //ListFooterComponent={renderFooter}
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
