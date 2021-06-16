export const initialStateConvenios = {
    Convenios: []
}

export const UserReducerConvenios = (state, action) => {
    switch (action.type) {
        case 'setConvenios':
            return { ...state, Convenios: action.conveniosTasy };
            break;
        case 'setConvenio':
            return { ...state, AddConvenios: [action.convenio] };
            break;
        case 'delConvenio':
            return { ...state, AddConvenios: [] };
            break;
        default:
            break;
    }
}