import React, { useRef, useState, useEffect, useContext } from 'react';
import { useWindowDimensions, ListRenderItem } from 'react-native';
import Carousel, {
    ParallaxImage,
    AdditionalParallaxProps,
} from 'react-native-snap-carousel';
import {
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
    SafeAreaView,
} from 'react-native';
import ModalInstagram from '../Modais/ModalInstagram';
import Api from '../../services/api';
import NotificationGlobalContext from '../../contexts/notificationGlobalContext';
import { ModalHandles } from '../../components/Modais/ModalInstagram';

const { width: screenWidth } = Dimensions.get('screen');

export interface IInstagram {
    id: string;
    media_type: string;
    permalink: string;
    username: string;
    media_url: string;
    caption: string;
    timestamp: string;
    children: Idata;
}

interface Idata {
    data: IImgInsta[];
}

interface IImgInsta {
    id: string;
}

const MyCarousel: React.FC = () => {
    const { addNotification } = useContext(NotificationGlobalContext);
    const windowHeight = useWindowDimensions().height;

    const [post, setPost] = useState<IInstagram | null>(null);
    const carouselRef = useRef(null);
    const modalInstaRef = useRef<ModalHandles | null>(null);

    const [postagensInsta, setPostagensInsta] = useState<IInstagram[]>([]);

    const postMensagem = (item: IInstagram) => {
        setPost(item);
        modalInstaRef.current?.openModal();
    };

    const filterPostagens = (post: IInstagram) => {
        return post.caption.includes('#pronutrirparceiros');
    };

    const getPostagemInsta = () => {
        Api.get('Social/GetFeedsInst')
            .then((response) => {
                const { data } = response;
                if (data) {
                    setPostagensInsta(data.filter(filterPostagens));
                }
            })
            .catch(() => {
                addNotification({
                    message:
                        'Não foi possivel acessar os posts do instram tente mais tarde!',
                    status: 'error',
                });
            });
    };

    useEffect(() => {
        getPostagemInsta();
    }, []);

    const renderItem: ListRenderItem<IInstagram> = (
        { item },
        parallaxProps?: AdditionalParallaxProps,
    ) => {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => postMensagem(item)}>
                <ParallaxImage
                    source={{
                        uri: item.media_url,
                    }}
                    containerStyle={styles.imageContainer}
                    showSpinner={true}
                    style={styles.image}
                    parallaxFactor={0}
                    {...parallaxProps}
                />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Carousel
                layout={'default'}
                ref={carouselRef}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={(windowHeight / 100) * 35}
                data={postagensInsta}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                hasParallaxImages={true}
                autoplay={true}
                enableMomentum={false}
                lockScrollWhileSnapping={true}
                loop={true}
            />
            {post && <ModalInstagram ref={modalInstaRef} postagem={post} />}
        </SafeAreaView>
    );
};

export default MyCarousel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    item: {
        alignItems: 'center',
    },
    imageContainer: {
        width: '90%',
        height: '100%',
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 20,
    },
    image: {
        resizeMode: 'stretch',
        transform: [{ scale: 0.55 }],
        ...StyleSheet.absoluteFillObject,
    },
    btnNext: {},
});
