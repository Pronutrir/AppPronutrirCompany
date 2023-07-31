import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/routeDashboard';
import Pdf from 'react-native-pdf';
import { useGetImgExame } from '../../../hooks/useGetImagesFirebase';
import MenuPopUp from '../../../components/menuPopUp/menuPopUp';
import { InfiniteData, useQueryClient } from 'react-query';
import { IExame, useUpdateCacheExame } from '../../../hooks/useExames';
import ModalCentralize, {
    ModalHandles,
} from '../../../components/Modais/ModalCentralize';
import CardObservacao from '../../../components/Cards/cardlObservacao';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ExamePdf'>;
interface Props {
    route: ProfileScreenRouteProp;
}

const ExamePdf: React.FC<Props> = ({ route }: Props) => {
    const { exameFiles, filter } = route.params;
    const queryClient = useQueryClient();
    const navigation = useNavigation();

    const { data } = useGetImgExame(exameFiles.guidFileStorage);
    const refmodalObservacoes = useRef<ModalHandles>(null);

    const setObservation = (text: string) => {
        queryClient.setQueryData<InfiniteData<IExame[]> | undefined>(
            ['exame', filter],
            (item) =>
                useUpdateCacheExame(
                    item,
                    exameFiles.guidFileStorage,
                    undefined,
                    text,
                ),
        );
        navigation.goBack();
    };

    const onpressMenuPopUp = (label: string) => {
        switch (label) {
            case 'Validar exame':
                queryClient.setQueryData<InfiniteData<IExame[]> | undefined>(
                    ['exame', filter],
                    (item) =>
                        useUpdateCacheExame(
                            item,
                            exameFiles.guidFileStorage,
                            'E',
                        ),
                );
                navigation.goBack();
                break;
            case 'Recusar exame':
                queryClient.setQueryData<InfiniteData<IExame[]> | undefined>(
                    ['exame', filter],
                    (item) =>
                        useUpdateCacheExame(
                            item,
                            exameFiles.guidFileStorage,
                            'C',
                        ),
                );
                setTimeout(
                    () => {
                        refmodalObservacoes.current?.openModal();
                    },
                    Platform.OS === 'ios' ? 500 : 0,
                );
                break;
        }
    };

    return (
        <View style={styles.container}>
            <MenuPopUp
                containerStyle={{
                    width: 20,
                    position: 'absolute',
                    right: 0,
                    zIndex: 1,
                }}
                btnLabels={['Validar exame', 'Recusar exame']}
                onpress={onpressMenuPopUp}
            />
            <Pdf
                trustAllCerts={false}
                source={{ uri: data }}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(filePath);
                    console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(numberOfPages);
                    console.log(`current page: ${page}`);
                }}
                onLoadProgress={(item) => {
                    console.log(item);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link presse: ${uri}`);
                }}
                style={styles.pdf}
            />
            <ModalCentralize ref={refmodalObservacoes}>
                <CardObservacao
                    observacao={exameFiles.observation}
                    onpress={(text) => {
                        setObservation(text);
                        refmodalObservacoes.current?.closeModal();
                    }}
                />
            </ModalCentralize>
        </View>
    );
};

export default ExamePdf;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 0,
        paddingHorizontal: 5,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#fafafa',
    },
});
