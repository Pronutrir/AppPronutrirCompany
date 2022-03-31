import {
    KeyboardAvoidingView,
    ScrollView,
    //StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import {
    RichToolbar,
    actions,
    RichEditor,
} from 'react-native-pell-rich-editor';
import { RFPercentage } from 'react-native-responsive-fontsize';
//import { useThemeAwareObject } from '../../../../hooks/useThemedStyles';
//import { ThemeContextData } from '../../../../contexts/themeContext';

const templetExemplo = "<html tasy=\"html5\"><head><title>Editor HTML Online</title><meta content=\"width=device-width, initial-scale=1.0\" name=\"viewport\" /></head><body><p style=\"text-align: center;\"><strong><span style=\"font-size:20px;\">&#x200B;</span><span style=\"font-size:16px;\">EVOLUÇÃO DE ENFERMAGEM</span></strong></p><p style=\"text-align: center;\"><span style=\"font-size:16px;\">&#x200B;</span></p><p><span style=\"font-size:16px;\">&#x200B;<strong>BOLSA</strong>: </span></p>\n<table class=\"wrichedit-table\" data-height=\"21px\" data-width=\"px\"><tbody><tr data-height=\"25px\" data-width=\"609px\"><td data-height=\"25px\" data-width=\"369.406px\" style=\"max-width: 305px; overflow: overlay;\"><span style=\"font-size:18px;\"><input contenteditable=\"true\" type=\"checkbox\" /> Manipulada </span></td><td data-height=\"25px\" data-width=\"239.594px\" style=\"max-width: 305px; overflow: overlay;\"><span style=\"font-size:18px;\"><input checked=\"checked\" type=\"checkbox\" /> Pronta </span></td></tr></tbody></table>\n\n<p><span style=\"font-size:16px;\"><strong>&#x200B;PROGRAMAÇÃO</strong>:            </span></p>\n\n<table class=\"wrichedit-table\" data-height=\"21px\" data-width=\"px\"><tbody><tr data-height=\"25px\" data-width=\"609px\"><td data-height=\"25px\" data-width=\"212.5px\" style=\"max-width: 203.333px; overflow: overlay;\"><span style=\"font-size:18px;\"><input contenteditable=\"true\" type=\"checkbox\" /> Contínua </span></td><td data-height=\"25px\" data-width=\"228.203px\" style=\"max-width: 203.333px; overflow: overlay;\"><span style=\"font-size:18px;\"><input contenteditable=\"true\" type=\"checkbox\" /> Desmame </span></td><td data-height=\"25px\" data-width=\"168.297px\" style=\"max-width: 203.333px; overflow: overlay;\"><p><span style=\"font-size:18px;\"><input contenteditable=\"true\" type=\"checkbox\" /> Cíclica </span></p></td></tr></tbody></table>\n\n<p> </p>\n\n<table class=\"wrichedit-table\" data-height=\"21px\" data-width=\"px\" style=\"max-width: 451px;\"><tbody><tr data-height=\"25px\" data-width=\"609px\"><td data-height=\"25px\" data-width=\"63px\" style=\"max-width: 63px; overflow: overlay; width: 63px;\"><span style=\"font-size:18px;\"><strong>VAZÃO</strong>: </span></td><td data-height=\"25px\" data-width=\"151px\" style=\"max-width: 151px; overflow: overlay; width: 151px;\"><span style=\"font-size:18px;\">&#x200B;115 ML/H </span></td><td data-height=\"25px\" data-width=\"136px\" style=\"max-width: 136px; overflow: overlay; width: 136px;\"><span style=\"font-size:18px;\"><strong>VOLUME TOTAL</strong>: </span></td><td data-height=\"25px\" data-width=\"98px\" style=\"max-width: 98px; overflow: overlay; width: 98px;\"><p><span style=\"font-size:18px;\">1300 ML </span></p></td></tr></tbody></table>\n\n<p><span style=\"font-size:16px;\"><strong>&#x200B;</strong></span></p>\n<p><span style=\"font-size:16px;\"><strong>TIPO DE ACESSO</strong>:</span></p>\n\n<table class=\"wrichedit-table\" data-height=\"21px\" data-width=\"px\"><tbody><tr data-height=\"20px\" data-width=\"609px\"><td data-height=\"20px\" data-width=\"296.391px\" style=\"max-width: 610px; overflow: overlay;\"><span style=\"font-size:18px;\"><input contenteditable=\"true\" type=\"checkbox\" /> Veia jugular direita </span></td><td data-height=\"20px\" data-width=\"312.609px\" style=\"max-width: 610px; overflow: overlay;\"><span style=\"font-size:18px;\"><input contenteditable=\"true\" type=\"checkbox\" /> Veia jugular esquerda </span></td></tr><tr data-height=\"20px\" data-width=\"609px\"><td data-height=\"20px\" data-width=\"296.391px\" style=\"max-width: 610px; overflow: overlay;\"><span style=\"font-size:18px;\">&#x200B;<input contenteditable=\"true\" type=\"checkbox\" /> Veia subclávia direita </span></td><td data-height=\"20px\" data-width=\"312.609px\" style=\"max-width: 610px; overflow: overlay;\"><span style=\"font-size:18px;\"><input contenteditable=\"true\" type=\"checkbox\" /> Veia subclávia esquerda </span></td></tr><tr data-height=\"20px\" data-width=\"609px\"><td data-height=\"20px\" data-width=\"296.391px\" style=\"max-width: 610px; overflow: overlay;\"><span style=\"font-size:18px;\"><input contenteditable=\"true\" type=\"checkbox\" /> Veia femoral direita </span></td><td data-height=\"20px\" data-width=\"312.609px\" style=\"max-width: 610px; overflow: overlay;\"><span style=\"font-size:18px;\"><input contenteditable=\"true\" type=\"checkbox\" /> Veia femoral esquerda </span></td></tr><tr data-height=\"20px\" data-width=\"609px\"><td data-height=\"20px\" data-width=\"296.391px\" style=\"max-width: 610px; overflow: overlay;\"><span style=\"font-size:18px;\"><input contenteditable=\"true\" type=\"checkbox\" /> PICC membro superior direito </span></td><td data-height=\"20px\" data-width=\"312.609px\" style=\"max-width: 610px; overflow: overlay;\"><span style=\"font-size:18px;\"><input contenteditable=\"true\" type=\"checkbox\" /> PICC membro superior esquerdo </span></td></tr><tr data-height=\"25px\" data-width=\"609px\"><td data-height=\"25px\" data-width=\"296.391px\" style=\"max-width: 610px; overflow: overlay;\"><span style=\"font-size:18px;\"><input contenteditable=\"true\" type=\"checkbox\" /> Port-a-cath na região subclávica direita &#x200B; </span></td><td data-height=\"25px\" data-width=\"312.609px\" style=\"max-width: 610px; overflow: overlay;\"><span style=\"font-size:18px;\"><input contenteditable=\"true\" type=\"checkbox\" /> Port-a-cath na região subclávica esquerda</span></td></tr></tbody></table>\n\n<p><strong><span style=\"\"><span style=\"\"><span style=\"\"><span style=\"\"><span style=\"font-size:16px;\">&#x200B;CURATIVO:</span></span></span></span></span></strong></p>\n\n<table class=\"wrichedit-table\" data-height=\"41px\" data-width=\"px\"><tbody><tr data-height=\"28px\" data-width=\"609px\"><td data-height=\"28px\" data-width=\"217.344px\" style=\"max-width: 305px; overflow: overlay;\"><span style=\"font-size:18px;\"><strong><input contenteditable=\"true\" type=\"checkbox\" /> Filme</strong> </span></td><td data-height=\"28px\" data-width=\"391.656px\" style=\"max-width: 305px; overflow: overlay;\"><span style=\"font-size:18px;\"><strong><input contenteditable=\"true\" type=\"checkbox\" /> Convencional</strong> </span></td></tr><tr data-height=\"28px\" data-width=\"609px\"><td data-height=\"28px\" data-width=\"217.344px\" style=\"max-width: 305px; overflow: overlay;\"><span style=\"font-size:18px;\"><strong><input contenteditable=\"true\" type=\"checkbox\" /> Íntegro</strong> </span></td><td data-height=\"28px\" data-width=\"391.656px\" style=\"max-width: 305px; overflow: overlay;\"><span style=\"font-size:18px;\"><strong><input contenteditable=\"true\" type=\"checkbox\" /> Comprometido</strong></span></td></tr></tbody></table>\n\n<p><strong><span style=\"\"><span style=\"\"><span style=\"\"><span style=\"\"><span style=\"font-size:16px;\">&#x200B;HOSPITAL:</span></span></span></span></span></strong></p>\n\n<table class=\"wrichedit-table\" data-height=\"41px\" data-width=\"px\"><tbody><tr data-height=\"28px\" data-width=\"609px\"><td data-height=\"28px\" data-width=\"188.859px\" style=\"max-width: 305px; overflow: overlay;\"><span style=\"font-size:18px;\"><strong>&#x200B;<input contenteditable=\"true\" type=\"checkbox\" /> Gênesis</strong> </span></td><td data-height=\"28px\" data-width=\"420.141px\" style=\"max-width: 305px; overflow: overlay;\"><span style=\"font-size:18px;\"><input contenteditable=\"true\" type=\"checkbox\" /> <strong>São Camilo</strong> </span></td></tr><tr data-height=\"28px\" data-width=\"609px\"><td data-height=\"28px\" data-width=\"188.859px\" style=\"max-width: 305px; overflow: overlay;\"><span style=\"font-size:18px;\"><strong><input type=\"checkbox\" /> Prontocárdio</strong> </span></td><td data-height=\"28px\" data-width=\"420.141px\" style=\"max-width: 305px; overflow: overlay;\"><span style=\"font-size:18px;\"><input type=\"checkbox\" /> <strong>Monte Klinikum</strong> </span></td></tr><tr data-height=\"28px\" data-width=\"609px\"><td data-height=\"28px\" data-width=\"188.859px\" style=\"max-width: 305px; overflow: overlay;\"><span style=\"font-size:18px;\"><strong><input contenteditable=\"true\" type=\"checkbox\" /> Gastroclínica</strong> </span></td><td data-height=\"28px\" data-width=\"420.141px\" style=\"max-width: 305px; overflow: overlay;\"><span style=\"font-size:18px;\"><strong><input contenteditable=\"true\" type=\"checkbox\" /> Exército</strong> </span></td></tr><tr data-height=\"28px\" data-width=\"609px\"><td data-height=\"28px\" data-width=\"188.859px\" style=\"max-width: 305px; overflow: overlay;\"><span style=\"font-size:18px;\"><input contenteditable=\"true\" type=\"checkbox\" /> <strong>São Carlos</strong> </span></td><td data-height=\"28px\" data-width=\"420.141px\" style=\"max-width: 305px; overflow: overlay;\"><span style=\"font-size:18px;\"><strong><input contenteditable=\"true\" type=\"checkbox\" /> Domicílio ( especificar empresa )</strong></span><strong style=\"background-color: initial; color: var(--color-gray-75); font-size: var(--font-size-subtitle); letter-spacing: 0.1px; font-family: CentraleSansCndBook;\">&#x200B;</strong></td></tr></tbody></table>\n\n<p> </p>\n<p><strong><span style=\"\"><span style=\"\"><span style=\"\"><span style=\"\"><span style=\"font-size:16px;\">&#x200B;OBSERVAÇÃO: </span></span></span></span></span></strong></p>\n<p><span style=\"\"><span style=\"\"><span style=\"\"><span style=\"\"><span style=\"font-size:18px;\">&#x200B;Não houve intercorrências na instalação</span><span style=\"font-size:16px;\">. </span></span></span></span></span></p></body></html>";

interface Props {
    initialContentHTML?: string;
}

const RichComponent: React.FC<Props> = ({
    initialContentHTML = templetExemplo,
}: Props) => {
    //const styles = useThemeAwareObject(createStyles);
    const richText = useRef<any>(); // eslint-disable-line

    return (
        <View style={{ flex: 1 }}>
            <RichToolbar
                iconSize={RFPercentage(2.5)}
                editor={richText}
                actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.insertBulletsList,
                    actions.insertOrderedList,
                    actions.insertLink,
                    actions.keyboard,
                    actions.setStrikethrough,
                    actions.setUnderline,
                    actions.checkboxList,
                    actions.undo,
                    actions.redo,
                ]}
                iconMap={{
                    [actions.heading1]: (
                        { tintColor }, // eslint-disable-line
                    ) => <Text style={[{ color: tintColor }]}>H1</Text>,
                }}
            />
            <ScrollView style={{ flex: 1 }}>
                <KeyboardAvoidingView>
                    <RichEditor
                        editorStyle={{ cssText: 'color:red' }}
                        ref={richText}
                        initialContentHTML={initialContentHTML}
                        onChange={(descriptionText) => {
                            console.log('descriptionText:', descriptionText);
                        }}
                    />
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};

export default RichComponent;
