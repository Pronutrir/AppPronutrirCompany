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
import OncologiaSinaisVitais from './oncologiaSinaisVitais/oncologiaSinaisVitais';
import styles from './style';
interface PagesSinaisVitais {
    Name: string;
}

export interface FilterConsultas {
    codMedico?: number | null;
    nM_GUERRA?: string | null;
    codEspecialidade?: number | null;
    dataInicio?: string | null;
    dataFinal?: string | null;
    pagina?: number | null;
}

const SinaisVitais: React.FC = () => {
    const {
        GetConsultasQT,
        GetConsultas,
        GetMedicosConsultas,
        stateConsultas: { consultas, flag, medicos },
        stateConsultasQT: { consultasQT, flagQT },
    } = useContext(SinaisVitaisContext);
    const refFlatlist = useRef<FlatList>(null);
    const refView1 = useRef<TouchableOpacity>(null);
    const refView2 = useRef<TouchableOpacity>(null);
    const deviceWidth = useWindowDimensions();
    //const {getEvolucoesPepVinculados} = useContext(ExamesContext);
    const [pages] = useState<PagesSinaisVitais[]>([
        {
            Name: 'Consultas',
        },
        {
            Name: 'Oncologia',
        },
    ]);
    //const [refresh, setRefresh] = useState(false);

    const getItemLayout = (data: any, index: any) => {
        return {
            length: deviceWidth.width,
            offset: deviceWidth.width * index,
            index,
        };
    };

    const scrollToIndex = (index: number) => {
        refFlatlist.current?.scrollToIndex({ animated: true, index: index });
    };

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
        waitForInteraction: true,
        minimumViewTime: 5,
    });

    const selected = useCallback((index: number) => {
        scrollToIndex(index);
        if (index === 0) {
            refView1.current?.setNativeProps({ style: styles.btnSelected });
            refView2.current?.setNativeProps({ style: styles.btn });
        } else {
            refView1.current?.setNativeProps({ style: styles.btn });
            refView2.current?.setNativeProps({ style: styles.btnSelected });
        }
    }, []);

    const onViewableItemsChanged = React.useCallback(
        (info: { viewableItems: ViewToken[]; changed: ViewToken[] }): void => {
            const { changed } = info;
            const [viewableItem] = changed;
            if (viewableItem) {
                const { key } = changed[0];
                key === 'Consultas' && selected(0);
                key === 'Oncologia' && selected(1);
            }
        },
        [selected],
    );

    const renderPagesItem: ListRenderItem<PagesSinaisVitais> = ({
        item: { Name },
    }) => {
        if (Name === 'Consultas') {
            return <ConsultasSinaisVitais />;
        } else {
            return <OncologiaSinaisVitais />;
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
        if (consultas?.length === 0 && !flag) {
            GetConsultas();
        }
    }, [GetConsultas, consultas, consultasQT, flag, flagQT]);

    useEffect(() => {
        if (consultasQT.length === 0 && !flagQT) {
            GetConsultasQT();
        }
    }, [GetConsultasQT, flagQT, consultasQT]);

    useEffect(() => {
        if (medicos?.length === 0 && !flag) {
            GetMedicosConsultas();
        }
    }, [GetMedicosConsultas, medicos, consultasQT, flag, flagQT]);

    useEffect(() => {
        selected(0);
    }, [selected]);

    return (
        <View style={styles.container}>
            <View style={styles.box1}>
                <TouchableOpacity
                    ref={refView1}
                    style={styles.btn}
                    onPress={() => selected(0)}>
                    <Text style={styles.textBtn}>Consultas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    ref={refView2}
                    style={styles.btn}
                    onPress={() => selected(1)}>
                    <Text style={styles.textBtn}>Oncologia</Text>
                </TouchableOpacity>
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
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig.current}
                    initialNumToRender={2}
                    ListEmptyComponent={EmptyComponent}
                    getItemLayout={getItemLayout}
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
