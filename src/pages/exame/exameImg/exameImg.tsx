import React, { useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/routeDashboard';
import Image_Zoom from '../../../components/image-zoom/imageZoom';
import { useGetImgExame } from '../../../hooks/useGetImagesFirebase';
import MenuPopUp from '../../../components/menuPopUp/menuPopUp';
import { useQueryClient, InfiniteData } from 'react-query';
import { IExame, useUpdateCacheExame } from '../../../hooks/useExames';
import ModalCentralize, {
    ModalHandles,
} from '../../../components/Modais/ModalCentralize';
import CardObservacao from '../../../components/Cards/cardlObservacao';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ExameImg'>;
interface Props {
    route: ProfileScreenRouteProp;
}

const ExameImgZoom: React.FC<Props> = ({ route }: Props) => {
    const { exameFiles, filter } = route.params;

    const { data } = useGetImgExame(exameFiles.guidFileStorage);

    const navigation = useNavigation();

    const queryClient = useQueryClient();

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
        <View style={styles.centeredView}>
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
            <View style={styles.modalView}>
                <Image_Zoom ImageBase64={data} loading={Boolean(!data)} />
            </View>
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

export default ExameImgZoom;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
