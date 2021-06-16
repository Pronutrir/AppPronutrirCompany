export const initialStateMedicamentos = {
    Medicamentos: []
}

export const MedicamentosReducer = (state, action) => {
    switch (action.type) {
        case 'setMedicamentos':
            return { ...state, Medicamentos: action.medicamentos };
            break;
        default:
            break;
    }
}