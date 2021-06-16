import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform } from 'react-native';
import ComprimidoSvg from '../assets/svg/comprimido.svg';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ConversorMedicamento } from '../services/conversorUnidadeMedicamento';

export default function CardMedicamentos({ medicamento, onPress }) {

    const ViaAplicacao = (aplicacao) => {
        switch (aplicacao) {
            case 'AURIC': return 'AURIC IMP'
                break;
            case 'BC': return 'BLOQUEIO DE CAMPO'
                break;
            case 'BNP': return 'BLOQUEIO DE NERVO PERIFÉRICO'
                break;
            case 'BIE': return 'BLOQUEIO INTERESCALÊNICO'
                break;
            case 'BNC': return 'BLOQUEIO NEURAL CENTRAL CAUDAL'
                break;
            case 'BRB': return 'BLOQUEIO RETROBULAR'
                break;
            case 'BLS': return 'BLOQUEIO SIMPÁTICO'
                break;
            case 'BSA': return 'BLOQUEIO SUBARACNÓIDE (ANESTESIA ESPINHAL)'
                break;
            case 'BL': return 'BOLUS'
                break;
            case 'BUC': return 'BUCAL'
                break;
            case 'CAPI': return 'CAPILAR'
                break;
            case 'DERM': return 'DERMATOLOGICA'
                break;
            case 'ED': return 'ENDOTRAQUEAL'
                break;
            case 'EV': return 'ENDOVENOSO'
                break;
            case 'Ent': return 'ENTERAL'
                break;
            case 'EPI': return 'EPIDURAL'
                break;
            case 'ESP': return 'ESPINHAL'
                break;
            case 'IA': return 'IA IMP'
                break;
            case 'IN': return 'INALATÓRIA'
                break;
            case 'INF': return 'INFILTRAÇÃO LOCAL'
                break;
            case 'TM': return 'INJEÇÃO DIRETA EM TECIDOS MOLES'
                break;
            case 'IAR': return 'INTRA ARTERIAL'
                break;
            case 'IAT': return 'INTRA ARTICULAR'
                break;
            case 'IBR': return 'INTRA - BRONQUIAL'
                break;
            case 'IB': return 'INTRABÚRSICA'
                break;
            case 'IC': return 'INTRACORONÁRIO'
                break;
            case 'ID': return 'INTRADÉRMICA'
                break;
            case 'IL': return 'INTRALESIONAL'
                break;
            case 'VIL': return 'INTRALINFÁTICA'
                break;
            case 'IM': return 'INTRAMUSCULAR'
                break;
            case 'IMI': return 'INTRAMUSCULAR INFANTIL'
                break;
            case 'IMN': return 'INTRAMUSCULAR NEONATAL'
                break;
            case 'IO': return 'INTRAOCULAR'
                break;
            case 'IP': return 'INTRA - PERITONIAL'
                break;
            case 'IR': return 'INTRA - RETAL'
                break;
            case 'IT': return 'INTRATECAL'
                break;
            case 'ITR': return 'INTRA - TRAQUEAL'
                break;
            case 'ITU': return 'INTRAUTERINA'
                break;
            case 'ITV': return 'INTRAVAGINAL'
                break;
            case 'IV': return 'INTRAVENOSA'
                break;
            case 'IVI': return 'INTRAVENOSA INFANTIL'
                break;
            case 'IVNC': return 'INTRAVENOSA NEO CENTRAL'
                break;
            case 'IVN': return 'INTRAVENOSA NEONATAL'
                break;
            case 'IVE': return 'INTRAVESICAL'
                break;
            case 'IVIT': return 'INTRAVÍTREA'
                break;
            case 'IRR': return 'IRRIGAÇÃO'
                break;
            case 'NAS': return 'NASAL'
                break;
            case 'NBZ': return 'NBZ IMP'
                break;
            case 'OFT': return 'OFTÁLMICA'
                break;
            case 'VO': return 'ORAL'
                break;
            case 'Sonda': return 'ORAL PSOLOGIA: FAZER VIA SONDA'
                break;
            case 'OTO': return 'OTOLÓGICA'
                break;
            case 'PA': return 'PERIARTICULAR'
                break;
            case 'PB': return 'PERIBULAR'
                break;
            case 'PD': return 'PERIDURAL'
                break;
            case 'Ret': return 'RET IMP'
                break;
            case 'RET': return 'RETAL'
                break;
            case 'SL': return 'SL IMP'
                break;
            case 'SC': return 'SUBCUTÂNEA'
                break;
            case 'SUBL': return 'SUBLINGUAL'
                break;
            case 'tr': return 'TRANSDÉRMICA'
                break;
            case 'URET': return 'URETRAL'
                break;
            case 'UT': return 'USO TÓPICO'
                break;
            case 'Vag': return 'VAGINAL'
                break;
            case 'VN': return 'VN IMP'
                break;
            default: return ''
                break;
        }
    }

    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(medicamento)}>
            <View style={styles.item1}>
                <ComprimidoSvg fill={'#748080'} width={40} height={40} />
            </View>
            <View style={styles.item2}>
                <Text style={styles.textLabel}>
                    {
                        medicamento.dS_MEDICAMENTO ? medicamento.dS_MEDICAMENTO : medicamento.dS_MATERIAL
                    }
                </Text>
                <Text style={styles.text}>{`${medicamento.qT_DOSE} ${ConversorMedicamento(medicamento.cD_UNID_MED)} ${ViaAplicacao(medicamento.iE_VIA_APLICACAO)}`}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '80%',
        height: Dimensions.get('screen').height / 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        borderRadius: 10,
        margin: 10,
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            }
        })
    },
    item1: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 3,
        borderRightColor: '#b5dfdc'
    },
    item2: {
        flex: 2,
        alignItems: 'flex-start',
        marginLeft: 15
    },
    item3: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLabel: {
        fontSize: RFValue(16, 680),
        color: '#666666'
    },
    text: {
        fontSize: RFValue(12, 680),
        color: '#84cac5'
    }
})
