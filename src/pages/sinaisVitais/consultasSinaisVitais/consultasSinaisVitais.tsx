import React, { useContext, useRef, useState, useEffect } from 'react';
import { View } from 'react-native';
import styles from './style';
import CardConsultasComponent from '../components/cardConsultasComponent/cardConsultasComponent';
import FilterConsultasComponent from '../components/filterConsultasComponent/filterConsultasComponent';
import MedicosConsultasComponent from '../components/medicosConsultasComponent/medicosConsultasComponent';
import ModalBottom, {
    ModalHandles,
} from '../../../components/Modais/ModalBottom';
import { IFilterConsultas } from '../../../contexts/sinaisVitaisContext';
import EspecialidadeConsultasComponent from '../components/especialidadeConsultasComponent/especialidadeConsultasComponent';
import { useGetAgendaConsultas, IAgendaConsulta, IResultAgendaConsultas } from '../../../hooks/useAgendaConsultas';
import AuthContext from '../../../contexts/auth';

const ConsultasSinaisVitais: React.FC = () => {

    const { data: listAgendasConsultas, isFetching } = useGetAgendaConsultas();
    const { useGetFetchQuery } = useContext(AuthContext);

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
    const [listConsultas, setListConsutas] = useState<IAgendaConsulta[] | null | undefined>(listAgendasConsultas?.result);

    const filterConsultas = (item?: IFilterConsultas): IAgendaConsulta[] | undefined => {
        const stateConsultas = useGetFetchQuery<IResultAgendaConsultas>('agendasConsultas');
        if(item){
            if (stateConsultas?.result && (item?.dS_ESPECIALIDADE)) {
                return stateConsultas.result.filter(
                    (element) => element.dS_ESPECIALIDADE === item.dS_ESPECIALIDADE,
                );
            }
            if (stateConsultas?.result && item?.nM_GUERRA) {
                return stateConsultas.result?.filter(
                    (element) => element.nM_GUERRA === item.nM_GUERRA,
                );
            }
        }else{
            return stateConsultas?.result;
        }
    };

    const _FilterConsultas = async (item?: IFilterConsultas | null) => {
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
            setActiveModal(false);
            selectFilter.current = { ...selectFilter.current, ...item };
            refModalBottom.current?.closeModal();
            setListConsutas(filterConsultas(item))
        } else {
            selectFilter.current = {
                ...selectFilter.current,
                dS_ESPECIALIDADE: null,
                nM_GUERRA: null,
            };
            refModalBottom.current?.closeModal();
            setListConsutas(filterConsultas());
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
                        onPress={(value) => _FilterConsultas(value)}
                        selectedFilter={selectFilter.current}
                        listMedicos={listAgendasConsultas?.medicos}
                    />
                );
            case 'Médico':
                return (
                    <MedicosConsultasComponent
                        onPress={(value) => _FilterConsultas(value)}
                        selectedFilter={selectFilter.current}
                        listMedicos={listAgendasConsultas?.medicos}
                    />
                );
            default:
                return null;
        }
    };

    useEffect(() =>{
        setListConsutas(listAgendasConsultas?.result);
    },[listAgendasConsultas]);

    return (
        <View style={styles.container}>
            <FilterConsultasComponent
                onpress={(item) => selectedFilter(item.name)}
                selectedFilter={selectFilter.current}
            />
            <CardConsultasComponent
                dataSourceConsultas={listConsultas}
                selectFilter={selectFilter}
                isFetching={isFetching}
                filterConsultas={filterConsultas}
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
