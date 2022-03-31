import React from 'react';
import { SafeAreaView } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SearchBarPessoaFisica from '../../../components/searchBarPessoaFisica/searchBarPessoaFisica';
import { IPFSinaisVitais } from '../../../contexts/sinaisVitaisContext';

export interface IParamConsulta {
    query: string | null | undefined;
    isLoading: boolean;
    refreshing: boolean;
    dataSource: IPFSinaisVitais[];
    spinnerVisibility: boolean;
    page: number;
    loadingScrow: boolean;
    continue: boolean;
    showRequest: boolean;
}

const SearchPessoaFisica = () => {

  return (
      <SafeAreaView style={{flex: 1, paddingTop: RFPercentage(2), backgroundColor: '#fff'}}>
          <SearchBarPessoaFisica/>
      </SafeAreaView>
  )
}

export default SearchPessoaFisica;
