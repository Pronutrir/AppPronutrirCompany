import React, { useRef, useState, useEffect, useContext } from 'react';
import {useWindowDimensions} from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
    SafeAreaView
} from 'react-native';

import MyModal from './MyModal';
import Api from '../services/api';
import ErrorContext from '../contexts/errorNotification';

const { width: screenWidth } = Dimensions.get('screen');

const MyCarousel = () => {

    const { addError } = useContext(ErrorContext);
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    const [post, setPost] = useState(null);
    const [modalActive, setModalActive] = useState(false);
    const carouselRef = useRef(null);
    
    const [postagensInsta, setPostagensInsta] = useState([]); 

    const postMensagem = item => {
        const _post = postagensInsta.find(element => element.id === item.id);
        if (_post) {
            setPost(_post);
            setModalActive(true);
        }
    }

    const filterPostagens = post => {
        return post.caption.includes("#pronutrironcologia") && post.media_type === "IMAGE"
    }

    const getPostagemInsta = () => {
        Api.get('Social/GetFeedsInst').then(response =>{
            const { data } = response;
            if(data){
                setPostagensInsta(data.filter(item => filterPostagens(item)));
            }
        }).catch(error =>{
            addError(`Não foi possivel acessar os posts do instram tente mais tarde! - ${error.message}`);
        })
    }

    useEffect(() => {
        getPostagemInsta();
    }, []);

    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => postMensagem(item)}>
                <ParallaxImage
                    source={{ uri: item.media_url }}
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
                itemWidth={windowHeight / 100 * 35}
                data={postagensInsta}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                hasParallaxImages={true}
                autoplay={true}
                enableMomentum={false}
            />
            {
                post &&
                <MyModal modalActive={modalActive} mudarState={setModalActive} postagem={post}/>
            }

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
        alignItems: 'center'
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
        transform: [{ scale : 0.55}],
        ...StyleSheet.absoluteFillObject,
    },
    btnNext: {

    }
});