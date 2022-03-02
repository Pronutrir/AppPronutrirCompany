import React, { useRef, useState, useEffect, useContext } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';
import MyModal from './MyModal';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import NotificationGlobalContext from '../contexts/notificationGlobalContext';

const { width: screenWidth } = Dimensions.get('window');

export default function Carousel_text() {

    const { addNotification } = useContext(NotificationGlobalContext);
    const [post, setPost] = useState(null);
    const [modalActive, setModalActive] = useState(false);
    const carouselRef = useRef(null);
    const [imagens, setImagens] = useState([]);
    const [postagens, setPostagens] = useState([]);

    const getImgUrl = async (item) => {
        const url = await storage().ref(item).getDownloadURL();
        return { title: item, UrlImg: url };
    }

    const getImagens = async (ListItem) => {
        return Promise.all(ListItem.map(async item => { return getImgUrl(item.fullPath) }))
    }

    const listFilesAndDirectories = async (reference, pageToken) => {
        storage().ref('postagemInicial').list({ pageToken }).then(result => {
            getImagens(result.items).then(result => {
                setImagens(result);
            })
        }).catch(error => {
            addNotification(`Não foi possivel acessar os posts do instram tente mais tarde! - ${error.message}`);
        })
    }

    async function getPostagens() {
        firestore().collection('Postagens').get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                setPostagens(itens => [...itens, { post: documentSnapshot.id, item: documentSnapshot.data() }])
            })
        });
    }

    useEffect(() => {
        getPostagens();
        listFilesAndDirectories();
    }, []);

    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <TouchableOpacity style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.UrlImg }}
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
        <View style={styles.container}>
            <Carousel
                layout={'default'}
                ref={carouselRef}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 70}
                data={imagens}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                hasParallaxImages={true}
                autoplayInterval={10000}
                autoplay={true}
                enableMomentum={false}
            />
            {post && <MyModal modalActive={modalActive} mudarState={setModalActive} postagem={post} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        //width: screenWidth - 60,
        //height: screenWidth - 60,
        alignItems: 'center'
    },
    imageContainer: {
        width: '90%',
        height: '100%',
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'transparent',
        borderRadius: 20,
    },
    image: {
        resizeMode: 'contain',
        ...StyleSheet.absoluteFillObject,
    },
    btnNext: {

    }
});
