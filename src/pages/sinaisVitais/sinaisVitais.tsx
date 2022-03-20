import React, {
    useState,
    useRef,
    useCallback,
    useEffect,
    useContext,
} from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    useWindowDimensions,
    ListRenderItem,
    ViewToken,
} from 'react-native';
import SinaisVitaisContext from '../../contexts/sinaisVitaisContext';
import ConsultasSinaisVitais from './consultasSinaisVitais/consultasSinaisVitais';
import { HistorySinaisVitais } from './historySinaisVitais/historySinaisVitais';
import OncologiaSinaisVitais from './oncologiaSinaisVitais/oncologiaSinaisVitais';
import SinaisVitaisGerais from './sinaisVItaisGerais/sinaisVitaisGerais';
import styles from './style';
interface PagesSinaisVitais {
    Index: number;
    Name: string;
    Ref: React.RefObject<TouchableOpacity>;
}

type scroll = 'scrollToIndex' | 'scrollToIndexMenu';

const SinaisVitais: React.FC = () => {
    const {
        GetConsultasQT,
        stateConsultasQT: { consultasQT, flagQT },
    } = useContext(SinaisVitaisContext);
    const refFlatlist = useRef<FlatList>(null);
    const refFlatlistMenu = useRef<FlatList>(null);
    const refView0 = useRef<TouchableOpacity>(null);
    const refView1 = useRef<TouchableOpacity>(null);
    const refView2 = useRef<TouchableOpacity>(null);
    const refView3 = useRef<TouchableOpacity>(null);
    const deviceWidth = useWindowDimensions();
    //const {getEvolucoesPepVinculados} = useContext(ExamesContext);
    const [pages] = useState<PagesSinaisVitais[]>([
        {
            Index: 0,
            Name: 'Consultas',
            Ref: refView0,
        },
        {
            Index: 1,
            Name: 'Tratamento',
            Ref: refView1,
        },
        {
            Index: 2,
            Name: 'Geral',
            Ref: refView2,
        },
        {
            Index: 3,
            Name: 'Histórico',
            Ref: refView3,
        },
    ]);

    const getItemLayout = (data: PagesSinaisVitais[] | null | undefined, index: number) => {
        return {
            length: deviceWidth.width,
            offset: deviceWidth.width * index,
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

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
        waitForInteraction: true,
        minimumViewTime: 5,
    });

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
            refView2.current?.setNativeProps({ style: styles.btn });
            refView3.current?.setNativeProps({ style: styles.btn });
        }
        if (index === 1) {
            refView0.current?.setNativeProps({ style: styles.btn });
            refView1.current?.setNativeProps({ style: styles.btnSelected });
            refView2.current?.setNativeProps({ style: styles.btn });
            refView3.current?.setNativeProps({ style: styles.btn });
        }
        if (index === 2) {
            refView0.current?.setNativeProps({ style: styles.btn });
            refView1.current?.setNativeProps({ style: styles.btn });
            refView2.current?.setNativeProps({ style: styles.btnSelected });
            refView3.current?.setNativeProps({ style: styles.btn });
        }
        if (index === 3) {
            refView0.current?.setNativeProps({ style: styles.btn });
            refView1.current?.setNativeProps({ style: styles.btn });
            refView2.current?.setNativeProps({ style: styles.btn });
            refView3.current?.setNativeProps({ style: styles.btnSelected });
        }
    }, []);

    /* const onViewableItemsChangedMenu = React.useCallback(
        (info: { viewableItems: ViewToken[]; changed: ViewToken[] }): void => {
            const { changed } = info;
            const [viewableItem] = changed;
            const { index } = viewableItem;
            if (index) {
                selected(index, 'scrollToIndexMenu');
            }
        },
        [selected],
    ); */

    /* const onViewableItemsChanged = React.useCallback(
        (info: { viewableItems: ViewToken[]; changed: ViewToken[] }): void => {
            const { changed } = info;
            const [viewableItem] = changed;
            const { index, isViewable } = viewableItem;
            if (index) {
                selected(index, 'scrollToIndexMenu');
            }
        },
        [selected],
    ); */

    const renderPagesItem: ListRenderItem<PagesSinaisVitais> = ({
        item: { Name },
    }) => {
        if (Name === 'Consultas') {
            return <ConsultasSinaisVitais />;
        }
        if (Name === 'Tratamento') {
            return <OncologiaSinaisVitais />;
        }
        if (Name === 'Geral') {
            return <SinaisVitaisGerais />;
        }
        if (Name === 'Histórico') {
            return <HistorySinaisVitais />;
        } else {
            return null;
        }
    };

    const EmptyComponent = () => (
        <View style={styles.viewEmpty}>
            <Text style={styles.textEmpty}>
                Você ainda não possui exame anexado.
            </Text>
        </View>
    );

    useEffect(() => {
        if (consultasQT.length === 0 && !flagQT) {
            GetConsultasQT();
        }
    }, [GetConsultasQT, flagQT, consultasQT]);

    useEffect(() => {
        selected(0, 'scrollToIndex');
    }, [selected]);

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

    return (
        <View style={styles.container}>
            <View style={styles.box1}>
                <FlatList
                    ref={refFlatlistMenu}
                    data={pages}
                    keyExtractor={(item) => item.Index.toString()}
                    renderItem={renderItemMenu}
                    horizontal={true}
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
                    viewabilityConfig={viewabilityConfig.current}
                    initialNumToRender={3}
                    ListEmptyComponent={EmptyComponent}
                    getItemLayout={getItemLayout}
                    scrollEnabled={false}
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

export default SinaisVitais;
