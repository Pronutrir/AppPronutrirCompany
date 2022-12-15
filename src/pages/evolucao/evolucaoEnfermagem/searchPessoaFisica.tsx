import React from 'react';
import { View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SearchBarPessoaFisica from '../../../components/searchBarPessoaFisica/searchBarPessoaFisica';

const SearchPessoaFisica = () => {
    return (
        <View
            style={{
                flex: 1,
                paddingTop: RFPercentage(0.5),
            }}>
            <SearchBarPessoaFisica />
        </View>
    );
};

export default SearchPessoaFisica;
