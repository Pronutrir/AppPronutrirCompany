import React, { useContext, useRef, useState } from 'react';
import { View } from 'react-native';
import styles from './style';
import CardSinaisVitais from '../components/cardSinaisVitais';
import SinaisVitaisContext from '../../../contexts/sinaisVitaisContext';
import FilterConsultasComponent from '../components/filterConsultasComponent/filterConsultasComponent';
import MedicosConsultasComponent from '../components/medicosConsultasComponent/medicosConsultasComponent';
import ModalBottom, {
    ModalHandles,
} from '../../../components/Modais/ModalBottom';
import { FilterConsultas } from '../sinaisVitais';
import EspecialidadeConsultasComponent from '../components/especialidadeConsultasComponent/especialidadeConsultasComponent';

const ConsultasSinaisVitais: React.FC = () => {
    const { consultas } = useContext(SinaisVitaisContext);
    const refModalBottom = useRef<ModalHandles>(null);
    const [selectedModal, setSelectedModal] = useState<string | null>(null);
    const selectFilter = useRef<FilterConsultas>({
        codEspecialidade: null,
        codMedico: null,
        dataFinal: null,
        dataInicio: null,
        pagina: null,
    });

    const FilterExames = async (item: FilterConsultas) => {
        refModalBottom.current?.openModal();
        selectFilter.current = { ...selectFilter.current, ...item };
        //refModalBottom.current?.closeModal();
        //await getEvolucoesPepVinculadosFilter(selectFilter.current);
    };

    const selectedFilter = (value: string) => {
        setSelectedModal(value);
        refModalBottom.current?.openModal();
    };

    const SelectedModal = ({ item }: { item: string | null }) => {
        switch (item) {
            /* case 'Periodos':
                return (
                    <PeriodosExamesComponent
                        onPressOK={(value) => FilterExames(value)}
                        onPressCancel={() =>
                            refModalBottom.current?.closeModal()
                        }
                        onPressClear={() => {
                            FilterExames({
                                dataFinal: null,
                                dataInicio: null,
                            });
                        }}
                        selectedFilter={selectFilter.current}
                    />
                ); */
            case 'Especialidade':
                return (
                    <EspecialidadeConsultasComponent
                        onPress={(value) => FilterExames(value)}
                        selectedFilter={selectFilter.current}
                    />
                );
            case 'Médico':
                return (
                    <MedicosConsultasComponent
                        onPress={(value) => FilterExames(value)}
                        selectedFilter={selectFilter.current}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <FilterConsultasComponent
                onpress={(item) => selectedFilter(item.name)}
            />
            <CardSinaisVitais dataSource={consultas} />
            <ModalBottom ref={refModalBottom} animationType={'slide'}>
                <SelectedModal item={selectedModal} />
            </ModalBottom>
        </View>
    );
};

export default ConsultasSinaisVitais;
