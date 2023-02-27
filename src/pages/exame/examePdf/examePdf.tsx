import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/routeDashboard';
import Pdf from 'react-native-pdf';
import { useGetImgExame } from '../../../hooks/useGetImagesFirebase';
import MenuPopUp from '../../../components/menuPopUp/menuPopUp';
import { InfiniteData, useQueryClient } from 'react-query';
import { IExame, useUpdateCacheExame } from '../../../hooks/useExames';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ExamePdf'>;

interface Props {
    route: ProfileScreenRouteProp;
}

const ExamePdf: React.FC<Props> = ({ route }: Props) => {
    const queryClient = useQueryClient();

    const { data } = useGetImgExame(route.params.guidFileStorage);

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
                onpress={(label) => {
                    switch (label) {
                        case 'Validar exame':
                            queryClient.setQueryData<
                                InfiniteData<IExame[]> | undefined
                            >(['exame', 'infinite', null], (item) =>
                                useUpdateCacheExame(
                                    item,
                                    route.params.guidFileStorage,
                                    'E',
                                ),
                            );
                            break;
                        case 'Recusar exame':
                            queryClient.setQueryData<
                                InfiniteData<IExame[]> | undefined
                            >(['exame', 'infinite', null], (item) =>
                                useUpdateCacheExame(
                                    item,
                                    route.params.guidFileStorage,
                                    'A',
                                ),
                            );
                            break;
                        default:
                            break;
                    }
                }}
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
