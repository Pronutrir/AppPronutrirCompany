
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

const UnidadeMedicamento = (unidadeMedicamento) => {
    switch (unidadeMedicamento) {
        case 'ad': return 'ADESIVO'
            break;
        case 'amp': return 'AMPOLA'
            break;
        case 'aplic': return 'APLICAÇÃO'
            break;
        case 'bs': return 'BOLSA'
            break;
        case 'bis': return 'BISNAGA'
            break;
        case 'cx': return 'CAIXA'
            break;
        case 'caps': return 'CÁPSULA'
            break;
        case 'com': return 'COMPRIMIDO'
            break;
        case 'csp': return 'COLHER DE SOPA'
            break;
        case 'do': return 'DOSE'
            break;
        case 'drg': return 'DRÁGEA'
            break;
        case 'siu': return 'ENDOCEPTIVO'
            break;
        case 'env': return 'ENVELOPE'
            break;
        case 'flac': return 'FLACONETE'
            break;
        case 'fr': return 'FRASCO'
            break;
        case 'fa': return 'FRASCO AMPOLA'
            break;
        case 'ga': return 'GARRAFA'
            break;
        case 'gts': return 'GOTAS'
            break;
        case 'g': return 'GRAMA(S)'
            break;
        case 'jato': return 'JATO'
            break;
        case 'Lt': return 'LATA'
            break;
        case 'meq': return 'MEQ'
            break;
        case 'mgcar': return 'MG CARBOPLATINA'
            break;
        case 'mcg/kg': return 'MICROGRAMA POR KG'
            break;
        case 'mcg/m2': return 'MICROGRAMA POR M2'
            break;
        case 'mcg': return 'MICROGRAMAS'
            break;
        case 'meq': return 'MILI EQUIVALENTE/M2'
            break;
        case 'mg/kg': return 'MILIGRAMA/PESO'
            break;
        case 'mg': return 'MILIGRAMAS,'
            break;
        case 'mg/m2': return 'MILIGRAMAS/M2'
            break;
        case 'ml': return 'MILILITROS'
            break;
        case 'pct': return 'PACOTE'
            break;
        case 'past': return 'PASTILHA'
            break;
        case 'sach': return 'SACHE'
            break;
        case 'ser': return 'SERINGA'
            break;
        case 'sup': return 'SUPOSITÓRIO'
            break;
        case 'tr': return 'TIRAS'
            break;
        case 'tbe': return 'TUBETE'
            break;
        case 'tb': return 'TUBO'
            break;
        case 'un': return 'UNIDADE'
            break;
        case 'ui': return 'UNIDADDE INTERNACIONAL'
            break;
        case 'vd': return 'VIDRO'
            break;
        default: return ''
            break;
    }
}

const ArrayUnidadeMedicamento = [

    { id: 'ad', name: 'ADESIVO(S)' },
    { id: 'amp', name: 'AMPOLA(S)' },
    { id: 'aplic', name: 'APLICAÇÃO' },
    { id: 'bis', name: 'BISNAGA' },
    { id: 'bs', name: 'BOLSA(S)' },
    { id: 'cx', name: 'CAIXA(S)' },
    { id: 'caps', name: 'CÁPSULA(S)' },
    { id: 'com', name: 'COMPRIMIDO(S)' },
    { id: 'csp', name: 'COLHER DE SOPA' },
    { id: 'do', name: 'DOSE(S)' },
    { id: 'drg', name: 'DRÁGEA(S)' },
    { id: 'siu', name: 'ENDOCEPTIVO(S)' },
    { id: 'env', name: 'ENVELOPE(S)' },
    { id: 'flac', name: 'FLACONETE(S)' },
    { id: 'fr', name: 'FRASCO(S)' },
    { id: 'fa', name: 'FRASCO(S) AMPOLA' },
    { id: 'ga', name: 'GARRAFA(S)' },
    { id: 'gts', name: 'GOTAS(S)' },
    { id: 'g', name: 'GRAMA(S)' },
    { id: 'jato', name: 'JATO (S)' },
    { id: 'lt', name: 'LATA (S)' },
    { id: 'meq', name: 'MEQ' },
    { id: 'mgcar', name: 'MG CARBOPLATINA' },
    { id: 'mcg/kg', name: 'MICROGRAMA(S) POR KG' },
    { id: 'mcg/m2', name: 'MICROGRAMA(S) POR M2' },
    { id: 'mcg', name: 'MICROGRAMAS(S)' },
    { id: 'mg/kg', name: 'MILIGRAMA(S)/PESO' },
    { id: 'mg', name: 'MILIGRAMAS(S)' },
    { id: 'mg/m2', name: 'MILIGRAMAS(S)/M2' },
    { id: 'ml', name: 'MILILITROS(S)' },
    { id: 'pct', name: 'PACOTE(S)' },
    { id: 'past', name: 'PASTILHA(S)' },
    { id: 'sach', name: 'SACHE(S)' },
    { id: 'ser', name: 'SERINGA(S)' },
    { id: 'sup', name: 'SUPOSITÓRIO(S)' },
    { id: 'tr', name: 'TIRAS(S)' },
    { id: 'tbe', name: 'TUBETE(S)' },
    { id: 'tb', name: 'TUBO(S)' },
    { id: 'un', name: 'UNIDADE(S)' },
    { id: 'vd', name: 'VIDRO(S)' },
]

const ArrayUnidadeMedicamentoTasy = [
    { id: 'ad', name: 'ADESIVO(S)' },
    { id: 'amp', name: 'AMPOLA(S)' },
    { id: 'Aplic', name: 'APLICAÇÃO' },
    { id: 'Bis', name: 'BISNAGA' },
    { id: 'Bs', name: 'BOLSA(S)' },
    { id: 'CX', name: 'CAIXA(S)' },
    { id: 'caps', name: 'CÁPSULA(S)' },
    { id: 'com', name: 'COMPRIMIDO(S)' },
    { id: 'csp', name: 'COLHER DE SOPA' },
    { id: 'DO', name: 'DOSE(S)' },
    { id: 'drg', name: 'DRÁGEA(S)' },
    { id: 'SIU', name: 'ENDOCEPTIVO(S)' },
    { id: 'env', name: 'ENVELOPE(S)' },
    { id: 'flac', name: 'FLACONETE(S)' },
    { id: 'Fr', name: 'FRASCO(S)' },
    { id: 'FA', name: 'FRASCO(S) AMPOLA' },
    { id: 'GA', name: 'GARRAFA(S)' },
    { id: 'gts', name: 'GOTAS(S)' },
    { id: 'g', name: 'GRAMA(S)' },
    { id: 'jato', name: 'JATO (S)' },
    { id: 'Lt', name: 'LATA (S)' },
    { id: 'Meq', name: 'MEQ' },
    { id: 'mgCar', name: 'MG CARBOPLATINA' },
    { id: 'mcg/kg', name: 'MICROGRAMA(S) POR KG' },
    { id: 'mcg/m2', name: 'MICROGRAMA(S) POR M2' },
    { id: 'mcg', name: 'MICROGRAMAS(S)' },
    { id: 'mg/kg', name: 'MILIGRAMA(S)/PESO' },
    { id: 'mg', name: 'MILIGRAMAS(S)' },
    { id: 'mg/m2', name: 'MILIGRAMAS(S)/M2' },
    { id: 'ml', name: 'MILILITROS(S)' },
    { id: 'pct', name: 'PACOTE(S)' },
    { id: 'Past', name: 'PASTILHA(S)' },
    { id: 'Sach', name: 'SACHE(S)' },
    { id: 'ser', name: 'SERINGA(S)' },
    { id: 'sup', name: 'SUPOSITÓRIO(S)' },
    { id: 'Tr', name: 'TIRAS(S)' },
    { id: 'tbe', name: 'TUBETE(S)' },
    { id: 'tb', name: 'TUBO(S)' },
    { id: 'un', name: 'UNIDADE(S)' },
    { id: 'VD', name: 'VIDRO(S)' },
]

const replaceString = (match, p1, p2, offset, string) => {
    return UnidadeMedicamento(match.toLowerCase());
}

const ConversorMedicamento = (apresentacao) => {
    var result = apresentacao.replace(/mg|com|rev|bl|al|sus|plas|amp|or|fr|sol|ct|trans|ml|got|opc|med|dos|lar|pvc|g|str|efer|cp|pvdc|ser|ad|po|l|bis|bs|env/gi, (match) => replaceString(match))
    return result.replace(/\s{2,}/g, ' ');
}

export { ConversorMedicamento, ArrayUnidadeMedicamento, ArrayUnidadeMedicamentoTasy }