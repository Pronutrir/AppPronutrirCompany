import {
    KeyboardAvoidingView,
    ScrollView,
    View,
} from 'react-native';
import React, { useRef } from 'react';
import {
    RichToolbar,
    actions,
    RichEditor,
} from 'react-native-pell-rich-editor';
import { RFPercentage } from 'react-native-responsive-fontsize';
import ShimmerPlaceHolderText from '../../../../components/shimmerPlaceHolder/shimerPlaceHolderText';
interface Props {
    initialContentHTML?: string;
    shimerPlaceHolder?: boolean;
    onChanger(textHtml: string): void;
}

const RichComponent: React.FC<Props> = ({
    initialContentHTML,
    shimerPlaceHolder = false,
    onChanger,
}: Props) => {
    
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
            />
            {shimerPlaceHolder ? (
                <ShimmerPlaceHolderText />
            ) : (
                <ScrollView style={{ flex: 1 }}>
                    <KeyboardAvoidingView>
                        <RichEditor
                            editorStyle={{ cssText: 'color:red' }}
                            ref={richText}
                            initialContentHTML={initialContentHTML}
                            onChange={(descriptionText) => {
                                onChanger(descriptionText)
                            }}
                        />
                    </KeyboardAvoidingView>
                </ScrollView>
            )}
        </View>
    );
};

export default RichComponent;
