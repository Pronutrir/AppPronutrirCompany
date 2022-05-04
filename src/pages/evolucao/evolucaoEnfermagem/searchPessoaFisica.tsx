import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SearchBarPessoaFisica from '../../../components/searchBarPessoaFisica/searchBarPessoaFisica';

const SearchPessoaFisica = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingTop: RFPercentage(2),
                backgroundColor: '#fff',
            }}>
            <SearchBarPessoaFisica/>
        </SafeAreaView>
    );
};

export default SearchPessoaFisica;
