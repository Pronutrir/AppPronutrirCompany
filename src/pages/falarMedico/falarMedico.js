import React, { useState, useEffect, useContext } from 'react'
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    TouchableHighlight,
    Image,
    FlatList,
    SafeAreaView
} from 'react-native';

import Loading from '../../componentes/Loading';
import Api from '../../services/api';
import styles from './style';
import AuthContext from '../../contexts/auth';


export default function falarMedico() {

    const { stateAuth } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [medicamentos, setMedicamentos] = useState();
    const [medInteracao, setMedInteracao] = useState([]);
    const [filtrados, setFiltrados] = useState([]);
    const [interationPar, setInterationPar] = useState([]);
    const [displayAutoComplete, setDisplayAutoComplete] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const interacaoMedicamentosa = () => {

        if (medInteracao.length >= 2) {

            setLoading(true);

            let item;

            medInteracao.forEach(element => {
                item = item ? `${item}+${element.rxcui}` : element.rxcui
            });

            Api.get(`Medicamentos/interacao?interacao=${item}`).then(response => {

                const { result } = response.data;

                if (result) {
                    const fullinteractionPair = [];

                    result.map((item) => {
                        const itens = item.interactionConcept.map(item => {
                            const { minConceptItem } = item;
                            return minConceptItem.name;
                        })

                        fullinteractionPair.push({
                            descricao: item.description,
                            item: itens
                        })
                    })

                    const uniqueArr = [... new Set(fullinteractionPair.map(data => data))]

                    setInterationPar(uniqueArr);

                    setLoading(false);
                }
                
            }).catch(error => {
                setLoading(false);
                console.log(error)
            })
        } else {
            setLoading(false);
            setInterationPar([])
        }
    }

    const AddMedicamento = (medicamento) => {
        setInputValue("");
        setFiltrados("");
        setMedInteracao(old => [...old, medicamento]);
    }

    const filter = (word) => {

        setInputValue(word)

        if (word.length >= 4) {

            Api.get(`Medicamentos/DisplayNameFilter?word=${word}`).then(response => {
                setFiltrados(response.data)
                setDisplayAutoComplete(true)
            }).catch(error => {
                console.log(error)
            })

        } else {
            setFiltrados("");
        }
    }

    useEffect(() => {
        interacaoMedicamentosa();
    }, [medInteracao])

    const removerItem = indice => {
        if (indice != undefined) {
            setMedInteracao(filtrados => filtrados.filter((x, index) => index != indice))
        } else {
            setMedInteracao([])
        }
    }

    const Item = ({ title }) => (
        <TouchableOpacity style={styles.item} onPress={() => AddMedicamento(title)}>
            <Text style={styles.title}>{title.nome}</Text>
        </TouchableOpacity>
    )

    const renderItem = ({ item }) => (
        <Item title={item} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.box1}>
                <TextInput
                    value={inputValue}
                    autoCapitalize={'none'}
                    style={styles.input}
                    onChangeText={text => filter(text)}
                    placeholder={'Pesquisar Medicamento'}
                />
            </View>
            {displayAutoComplete &&
                <View on style={styles.containerAutoComplete}>
                    <FlatList
                        style={styles.AutoComplete}
                        data={filtrados}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            }
            <View style={styles.box2}>
                <View style={styles.item1}>
                    <Text style={styles.TextDescription}>Medicamentos</Text>
                    <TouchableOpacity style={styles.btnClear} onPress={() => removerItem()}>
                        <Text style={styles.textBtn}>Limpar Tudo</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.item2}>
                    {medInteracao.map((item, index) => {
                        return (
                            <View key={item.rxcui} style={styles.cardMedicamento}>
                                <Text style={styles.nameMedicamento}>{item.nome.toUpperCase()}</Text>
                                <TouchableHighlight onPress={() => removerItem(index)}>
                                    <Image style={styles.btnImg} source={require('../../assets/imagens/fechar.png')} />
                                </TouchableHighlight>
                            </View>
                        )
                    })}
                </View>
            </View>
            <ScrollView style={styles.box3}>
                {medInteracao.length == 0 ?

                    < View style={styles.cardDescription} >
                        <Text style={styles.TextMsn}>Nenhum medicamento selecionado</Text>
                    </View >

                    :

                    interationPar.length >= 1 ?

                        interationPar.map((item, index) => {
                            return (
                                <View key={index.toString()} style={styles.cardDescription}>
                                    <View style={styles.cardBox1}>
                                        <Text style={styles.TextDescriptionlabel}>{item.item.map(i => { return i + " - " })}</Text>
                                    </View>
                                    <View style={styles.cardBox2}>
                                        <Text style={styles.TextDescription}>{item.descricao}</Text>
                                    </View>
                                </View>
                            )
                        })

                        :

                        interationPar.length <= 0 && medInteracao.length == 1 ? null :

                            < View style={styles.cardDescription} >
                                <Text style={styles.TextMsn}>Nenhuma interação encontrada</Text>
                            </View >
                }
            </ScrollView>
            <Loading activeModal={loading} />
        </SafeAreaView>
    )
}
