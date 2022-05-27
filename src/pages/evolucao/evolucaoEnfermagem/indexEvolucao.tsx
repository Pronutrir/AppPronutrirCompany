import {
    Dimensions,
    FlatList,
    ListRenderItem,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SearchPessoaFisica from './searchPessoaFisica';
import HistoryEvolucao from './historyEvolucao';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import { ThemeContextData } from '../../../contexts/themeContext';

interface PagesSinaisVitais {
    Index: number;
    Name: string;
    Ref: React.RefObject<TouchableOpacity>;
}

type scroll = 'scrollToIndex' | 'scrollToIndexMenu';

const IndexEvolucao: React.FC = () => {

    const styles = useThemeAwareObject(createStyles);

    const refFlatlistMenu = useRef<FlatList>(null);
    const refFlatlist = useRef<FlatList>(null);
    const refView0 = useRef<TouchableOpacity>(null);
    const refView1 = useRef<TouchableOpacity>(null);

    const [pages] = useState<PagesSinaisVitais[]>([
        {
            Index: 0,
            Name: 'Evolução',
            Ref: refView0,
        },
        {
            Index: 1,
            Name: 'Histórico',
            Ref: refView1,
        },
    ]);

    const getItemLayout = (data: PagesSinaisVitais[] | null | undefined, index: number) => {
        return {
            length: Dimensions.get('screen').width,
            offset: Dimensions.get('screen').width * index,
            index,
        };
    };

    const scrollToIndex = (index: number) => {
        refFlatlist.current?.scrollToIndex({ animated: true, index: index });
    };

    const scrollToIndexMenu = (index: number) => {
        refFlatlistMenu.current?.scrollToIndex({
            animated: true,
            index: index,
        });
    };

    const selected = useCallback((index: number, type: scroll) => {
        if (type === 'scrollToIndex') {
            scrollToIndex(index);
        }
        //if (type === 'scrollToIndexMenu') {
        scrollToIndexMenu(index);
        //}

        if (index === 0) {
            refView0.current?.setNativeProps({ style: styles.btnSelected });
            refView1.current?.setNativeProps({ style: styles.btn });
        }
        if (index === 1) {
            refView0.current?.setNativeProps({ style: styles.btn });
            refView1.current?.setNativeProps({ style: styles.btnSelected });
        }
    }, []);

    const renderItemMenu: ListRenderItem<PagesSinaisVitais> = ({
        item: { Name, Index, Ref },
    }) => (
        <TouchableOpacity
            ref={Ref}
            style={styles.btn}
            onPress={() => selected(Index, 'scrollToIndex')}>
            <Text style={styles.textBtn}>{Name}</Text>
        </TouchableOpacity>
    );

    const renderPagesItem: ListRenderItem<PagesSinaisVitais> = ({
        item: { Name },
    }) => {
        if (Name === 'Evolução') {
            return <SearchPessoaFisica />;
        }
        if (Name === 'Histórico') {
            return <HistoryEvolucao />;
        } else {
            return null;
        }
    };
    
    useEffect(() => {
        selected(0, 'scrollToIndex');
    }, [selected]);

    return (
        <View style={styles.container}>
            <View style={styles.box1}>
                <FlatList
                    ref={refFlatlistMenu}
                    data={pages}
                    keyExtractor={(item) => item.Index.toString()}
                    renderItem={renderItemMenu}
                    horizontal={true}
                    contentContainerStyle={{
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        width: Dimensions.get('window').width,
                    }}
                    // pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    //onViewableItemsChanged={onViewableItemsChangedMenu}
                    // viewabilityConfig={viewabilityConfig.current}
                    // initialNumToRender={3}
                    // ListEmptyComponent={EmptyComponent}
                    // getItemLayout={getItemLayout}
                />
            </View>
            <View style={styles.box2}>
                <FlatList
                    ref={refFlatlist}
                    data={pages}
                    keyExtractor={(item) => item.Name}
                    renderItem={renderPagesItem}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    //onViewableItemsChanged={onViewableItemsChanged}
                    //viewabilityConfig={viewabilityConfig.current}
                    //initialNumToRender={3}
                    //ListEmptyComponent={EmptyComponent}
                    getItemLayout={getItemLayout}
                    //scrollEnabled={false}
                    //refreshing={refresh}
                    /* onRefresh={() => {
                setRefresh(true);
                GetExames();
            }} */
                />
            </View>
        </View>
    );
};

export default IndexEvolucao;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.BACKGROUND_1,
        },
        box1: {
            width: Dimensions.get('screen').width,
            height: RFPercentage(8),
            flexDirection: 'row',
            justifyContent: 'center',
        },
        box2: {
            flex: 1,
        },
        btn: {
            //flex: 1,
            width: (Dimensions.get('screen').width / 100) * 45,
            backgroundColor: theme.colors.BUTTON_SECUNDARY,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 5,
            borderColor: theme.colors.BUTTON_SECUNDARY,
            margin: RFPercentage(0.5),
            borderRadius: 5,
            paddingHorizontal: 5,
        },
        textBtn: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_TERTIARY,
            fontSize: theme.typography.SIZE.fontysize18,
            padding: RFPercentage(1),
            paddingHorizontal: RFPercentage(2),
        },
        btnSelected: {
            borderColor: theme.colors.GREENPRIMARY,
        },
    });
    return styles;
};

