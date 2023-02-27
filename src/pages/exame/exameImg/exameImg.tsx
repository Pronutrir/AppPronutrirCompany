import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/routeDashboard';
import Image_Zoom from '../../../components/image-zoom/imageZoom';
import { useGetImgExame } from '../../../hooks/useGetImagesFirebase';
import MenuPopUp from '../../../components/menuPopUp/menuPopUp';
import { useQueryClient, InfiniteData } from 'react-query';
import { IExame, useUpdateCacheExame } from '../../../hooks/useExames';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ExameImg'>;
interface Props {
    route: ProfileScreenRouteProp;
}

const ExameImgZoom: React.FC<Props> = ({ route }: Props) => {
    const { guidFileStorage, filter } = route.params;

    const { data } = useGetImgExame(guidFileStorage);

    const queryClient = useQueryClient();

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
                onpress={(label) => {
                    switch (label) {
                        case 'Validar exame':
                            queryClient.setQueryData<
                                InfiniteData<IExame[]> | undefined
                            >(['exame', filter], (item) =>
                                useUpdateCacheExame(item, guidFileStorage, 'E'),
                            );
                            break;
                        case 'Recusar exame':
                            queryClient.setQueryData<
                                InfiniteData<IExame[]> | undefined
                            >(['exame', filter], (item) =>
                                useUpdateCacheExame(item, guidFileStorage, 'C'),
                            );
                            break;
                        default:
                            break;
                    }
                }}
            />
            <View style={styles.modalView}>
                <Image_Zoom ImageBase64={data} loading={Boolean(!data)} />
            </View>
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
