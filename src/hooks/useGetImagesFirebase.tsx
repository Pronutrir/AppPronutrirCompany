import storage from '@react-native-firebase/storage';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import NotificationGlobalContext from '../contexts/notificationGlobalContext';

const useGetImgExame = (guidFileStorage: string) => {
    const { addAlert } = useContext(NotificationGlobalContext);
    return useQuery(
        ['allMedicosImg', guidFileStorage],
        async () => {
            const resultStorageImages = await storage()
                .refFromURL(
                    `gs://apppronutrir-e0737.appspot.com/exames/${guidFileStorage}`,
                )
                .getDownloadURL();

            return resultStorageImages;
        },
        {
            staleTime: 60 * 30000,
            //enabled: Boolean(item.length > 0),
            onError: () => {
                addAlert({
                    message:
                        'Error ao carregar as imagens dos médicos, tentar mais tarde!',
                    status: 'error',
                });
            },
        },
    );
};

export { useGetImgExame };
