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
        GetConsultas,
        dispatchConsultas,
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
        nM_GUERRA: null,
        dS_ESPECIALIDADE: null,
    });

    const FilterConsultas = async (item?: IFilterConsultas | null) => {
        if (item) {
            if (item.nM_GUERRA) {
                selectFilter.current = {
                    ...selectFilter.current,
                    dS_ESPECIALIDADE: null,
                };
            }
            if (item.dS_ESPECIALIDADE) {
                selectFilter.current = {
                    ...selectFilter.current,
                    nM_GUERRA: null,
                };
            }
            dispatchConsultas({
                type: 'setConsultas',
                payload: {
                    flag: false,
                },
            });
            setActiveModal(false);
            selectFilter.current = { ...selectFilter.current, ...item };
            refModalBottom.current?.closeModal();
            GetConsultas(item);
        } else {
            dispatchConsultas({
                type: 'setConsultas',
                payload: {
                    flag: false,
                },
            });
            selectFilter.current = {
                ...selectFilter.current,
                dS_ESPECIALIDADE: null,
                nM_GUERRA: null,
            };
            refModalBottom.current?.closeModal();
            GetConsultas();
        }
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
                        onPress={(value) => FilterConsultas(value)}
                        selectedFilter={selectFilter.current}
                    />
                );
            case 'Médico':
                return (
                    <MedicosConsultasComponent
                        onPress={(value) => FilterConsultas(value)}
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
                selectedFilter={selectFilter.current}
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
