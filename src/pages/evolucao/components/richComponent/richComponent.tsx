import {
    KeyboardAvoidingView,
    ScrollView,
    View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import {
    RichToolbar,
    actions,
    RichEditor,
} from 'react-native-pell-rich-editor';
import { RFPercentage } from 'react-native-responsive-fontsize';
import ShimmerPlaceHolderText from '../../../../components/shimmerPlaceHolder/shimerPlaceHolderText';
import ToggleSwitch from '../../../../components/Switch/ToggleSwitch';
//import { useThemeAwareObject } from '../../../../hooks/useThemedStyles';
//import { ThemeContextData } from '../../../../contexts/themeContext';
interface Props {
    initialContentHTML?: string;
    shimerPlaceHolder?: boolean;
}

const RichComponent: React.FC<Props> = ({
    initialContentHTML,
    shimerPlaceHolder = false,
}: Props) => {
    const [isEnabled, setIsEnabled] = useState(false);
    //const styles = useThemeAwareObject(createStyles);
    const richText = useRef<any>(); // eslint-disable-line

    return (
        <View style={{ flex: 1 }}>
            <RichToolbar
                iconSize={RFPercentage(2.5)}
                editor={richText}
                actions={[
                    'customAction',
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
                    customAction: (
                        { tintColor }, // eslint-disable-line
                    ) => (
                        <ToggleSwitch onpress={()=> {setIsEnabled(!isEnabled)}}/>
                    ),
                }}
                customAction={() => console.log('testando')}
            />
            {shimerPlaceHolder ? (
                <ShimmerPlaceHolderText />
            ) : (
                <ScrollView style={{ flex: 1 }}>
                    <KeyboardAvoidingView>
                        <RichEditor
                            disabled={!isEnabled}
                            editorStyle={{ cssText: 'color:red' }}
                            ref={richText}
                            initialContentHTML={initialContentHTML}
                            onChange={(descriptionText) => {
                                console.log(
                                    'descriptionText:',
                                    descriptionText,
                                );
                            }}
                        />
                    </KeyboardAvoidingView>
                </ScrollView>
            )}
        </View>
    );
};

export default RichComponent;
