import React, { useContext, useRef, useState } from 'react';
import { View } from 'react-native';
import styles from './style';
import CardConsultasComponent from '../components/cardConsultasComponent/cardConsultasComponent';
import SinaisVitaisContext from '../../../contexts/sinaisVitaisContext';
import FilterConsultasComponent from '../components/filterConsultasComponent/filterConsultasComponent';
import MedicosConsultasComponent from '../components/medicosConsultasComponent/medicosConsultasComponent';
import ModalBottom, {
    ModalHandles,
} from '../../../components/Modais/ModalBottom';
import { IFilterConsultas } from '../../../contexts/sinaisVitaisContext';
import EspecialidadeConsultasComponent from '../components/especialidadeConsultasComponent/especialidadeConsultasComponent';

const ConsultasSinaisVitais: React.FC = () => {
    const {
        stateConsultas: { consultas, flag },
        FilterConsultas,
    } = useContext(SinaisVitaisContext);
    const refModalBottom = useRef<ModalHandles>(null);
    const [selectedModal, setSelectedModal] = useState<string | null>(null);
    const [activeModal, setActiveModal] = useState(false);
    const selectFilter = useRef<IFilterConsultas>({
        codEspecialidade: null,
        codMedico: null,
        dataFinal: null,
        dataInicio: null,
        pagina: null,
    });

    const FilterExames = async (item: IFilterConsultas) => {
        refModalBottom.current?.openModal();
        setActiveModal(false);
        selectFilter.current = { ...selectFilter.current, ...item };
        refModalBottom.current?.closeModal();
        await FilterConsultas(item);
        //await getEvolucoesPepVinculadosFilter(selectFilter.current);
    };

    const selectedFilter = (value: string) => {
        setSelectedModal(value);
        setActiveModal(true);
        refModalBottom.current?.openModal();
    };

    const SelectedModal = ({ item }: { item: string | null }) => {
        switch (item) {
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
            <CardConsultasComponent
                dataSourceConsultas={flag ? consultas : null}
            />
            <ModalBottom
                activeModal={activeModal}
                ref={refModalBottom}
                animationType={'slide'}>
                <SelectedModal item={selectedModal} />
            </ModalBottom>
        </View>
    );
};

export default ConsultasSinaisVitais;
