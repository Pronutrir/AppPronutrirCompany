import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from './style';
import MedicamentosContext from '../../../contexts/medicamentos';
import ComprimidoSvg from '../../../assets/svg/comprimido.svg';
import BtnCentered from '../../../components/buttons/BtnCentered';
import ModalMedicamentoAtivo from '../ModalMedicamentoAtivo/ModalMedicamentoAtivo';
import Loading from '../../../componentes/Loading';

const MedicamentosAtivos = ({ navigation }) => {

    const { stateMedicamentos, deleteMedicamento, activeLoading, getCalendarioMedicamentos } = useContext(MedicamentosContext);
    const [medicamentoSelected, setMedicamentoSelected] = useState();
    const [activeModal, setActiveModal] = useState(false);
    
    const delMedicamento = async (item) => {
        setActiveModal(false);
        await deleteMedicamento(item.nR_SEQUENCIA);
    }

    const setItem = (item) => {
        setMedicamentoSelected(item);
        setActiveModal(true);
    }

    const Item = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => setItem(item)}>
            <View style={styles.item1}>
                <ComprimidoSvg fill={'#748080'} width={40} height={40} />
            </View>
            <View style={styles.item2}>
                <Text style={styles.textLabel}>
                    {
                        item.dS_MEDICAMENTO ? item.dS_MEDICAMENTO : item.dS_MATERIAL
                    }
                </Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <View style={styles.box1}>
                <Text style={styles.textLabel}>Medicamentos</Text>
            </View>
            <View style={styles.box2}>
                <FlatList
                    data={stateMedicamentos.Medicamentos}
                    keyExtractor={(item, key) => item.nR_SEQUENCIA.toString()}
                    renderItem={Item}
                />
            </View>
            <View style={styles.box3}>
                <BtnCentered labelBtn={"Adicionar medicamento"} fontSize={16} onPress={() => navigation.navigate('AddMedicamentos')} />
            </View>
            <View>
                <ModalMedicamentoAtivo
                    activeModal={activeModal}
                    setActiveModal={setActiveModal}
                    item={medicamentoSelected}
                    action={delMedicamento}
                />
                <Loading activeModal={activeLoading}/>
            </View>
        </View>
    )
}

export default MedicamentosAtivos;
