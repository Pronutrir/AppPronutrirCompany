/* eslint-disable */
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useCallback, useRef } from 'react';
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
    disabled?: boolean;
}

const RichComponent: React.FC<Props> = ({
    initialContentHTML,
    shimerPlaceHolder = false,
    onChanger,
    disabled = false,
}: Props) => {
    const richText = useRef<any>(); // eslint-disable-line

    // editor change data
    const handleChange = useCallback((html) => {
        // save html to content ref;
        //contentRef.current = html;
    }, []);

    // theme change to editor color
    const themeChange = useCallback(({ colorScheme }) => {
        //setTheme(colorScheme);
    }, []);

    const onTheme = useCallback(() => {
        //setTheme(theme === 'light' ? 'dark' : 'light');
    }, []);

    const onDisabled = useCallback(() => {
        //setDisable(!disabled);
    }, []);

    const editorInitializedCallback = useCallback(() => {
        /* richText.current.registerToolbar(function (items) {
            // console.log('Toolbar click, selected items (insert end callback):', items);
        }); */
    }, []);

    const onKeyHide = useCallback(() => {
        //console.log();
    }, []);

    const onKeyShow = useCallback(() => {
        //TextInput.State.currentlyFocusedInput() && setEmojiVisible(false)
    }, []);

    // editor height change
    const handleHeightChange = useCallback((height) => {
        //console.log('editor height change:', height);
    }, []);

    const handleInsertEmoji = useCallback((emoji) => {
        richText.current?.insertText(emoji);
        richText.current?.blurContentEditor();
    }, []);

    const handleEmoji = useCallback(() => {
        Keyboard.dismiss();
        richText.current?.blurContentEditor();
        // setEmojiVisible(!emojiVisible)
    }, []);

    const handleInsertVideo = useCallback(() => {
        richText.current?.insertVideo(
            'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4',
            'width: 50%;',
        );
    }, []);

    const handleInsertHTML = useCallback(() => {
        // this.richText.current?.insertHTML(
        //     `<span onclick="alert(2)" style="color: blue; padding:0 10px;" contenteditable="false">HTML</span>`,
        // );
        richText.current?.insertHTML(
            `<div style="padding:10px 0;" contentEditable="false">
                <iframe  width="100%" height="220"  src="https://www.youtube.com/embed/6FrNXgXlCGA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>`,
        );
    }, []);

    const onPressAddImage = useCallback(() => {
        // insert URL
        richText.current?.insertImage(
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png',
            'background: gray;',
        );
        // insert base64
        // this.richText.current?.insertImage(`data:${image.mime};base64,${image.data}`);
    }, []);

    const onInsertLink = useCallback(() => {
        // this.richText.current?.insertLink('Google', 'http://google.com');
        //linkModal.current?.setModalVisible(true);
    }, []);

    const onLinkDone = useCallback(({ title, url }) => {
        richText.current?.insertLink(title, url);
    }, []);

    const handleFontSize = useCallback(() => {
        // 1=  10px, 2 = 13px, 3 = 16px, 4 = 18px, 5 = 24px, 6 = 32px, 7 = 48px;
        // let size = [1, 2, 3, 4, 5, 6, 7];
        // richText.current?.setFontSize(size[XMath.random(size.length - 1)]);
    }, []);

    const handleForeColor = useCallback(() => {
        richText.current?.setForeColor('blue');
    }, []);

    const handleHiliteColor = useCallback(() => {
        richText.current?.setHiliteColor('red');
    }, []);

    const handlePaste = useCallback((data) => {
        console.log('Paste:', data);
    }, []);

    const handleInput = useCallback(({ data, inputType }) => {
        //console.log(inputType, data);
    }, []);

    const handleMessage = useCallback(({ type, id, data }) => {
        //let index = 0;
        /* switch (type) {
            case 'ImgClick':
                richText.current?.commandDOM(`$('#${id}').src="${imageList[XMath.random(imageList.length - 1)]}"`);
                break;
            case 'TitleClick':
                const color = ['red', 'blue', 'gray', 'yellow', 'coral'];

                // command: $ = document.querySelector
                richText.current?.commandDOM(`$('#${id}').style.color='${color[XMath.random(color.length - 1)]}'`);
                break;
            case 'SwitchImage':
                break;
        } */
        console.log('onMessage', type, id, data);
    }, []);

    const handleFocus = useCallback(() => {
        //console.log('editor focus');
    }, []);

    const handleBlur = useCallback(() => {
        //console.log('editor blur');
    }, []);

    const handleCursorPosition = useCallback((scrollY) => {
        // Positioning scroll bar
        //scrollRef.current.scrollTo({y: scrollY - 30, animated: true});
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {shimerPlaceHolder ? (
                <ShimmerPlaceHolderText />
            ) : (
                <>
                    <RichToolbar
                        style={styles.richBar}
                        flatContainerStyle={styles.flatStyle}
                        editor={richText}
                        disabled={disabled}
                        //iconTint={color}
                        selectedIconTint={'#2095F2'}
                        disabledIconTint={'#bfbfbf'}
                        onPressAddImage={onPressAddImage}
                        onInsertLink={onInsertLink}
                        iconSize={RFPercentage(2)}
                        iconGap={RFPercentage(3)}
                        actions={[
                            actions.undo,
                            actions.redo,
                            actions.setBold,
                            actions.setItalic,
                            actions.setStrikethrough,
                            actions.setUnderline,
                            actions.removeFormat,
                            actions.alignLeft,
                            actions.alignCenter,
                            actions.alignRight,
                            actions.checkboxList,
                            actions.insertOrderedList,
                            actions.heading1,
                            actions.heading2,
                            actions.heading3,
                            actions.heading4,
                            actions.blockquote,
                            actions.code,
                            actions.line,
                            actions.keyboard,
                            //actions.insertImage,
                            //actions.foreColor,
                            //actions.hiliteColor,
                            /* 'insertEmoji',
                    'insertHTML',
                    'fontSize', */
                        ]} // default defaultActions
                        iconMap={{
                            //insertEmoji: phizIcon,
                            [actions.foreColor]: ({ tintColor }) => (
                                <Text style={[styles.tib, { color: 'blue' }]}>
                                    FC
                                </Text>
                            ),
                            [actions.hiliteColor]: ({ tintColor }) => (
                                <Text
                                    style={[
                                        styles.tib,
                                        {
                                            color: tintColor,
                                            backgroundColor: 'red',
                                        },
                                    ]}>
                                    BC
                                </Text>
                            ),
                            [actions.heading1]: ({ tintColor, iconSize }) => (
                                <Text
                                    style={[
                                        styles.tib,
                                        {
                                            color: tintColor,
                                            fontSize: iconSize,
                                        },
                                    ]}>
                                    H1
                                </Text>
                            ),
                            [actions.heading2]: ({ tintColor, iconSize }) => (
                                <Text
                                    style={[
                                        styles.tib,
                                        {
                                            color: tintColor,
                                            fontSize: iconSize,
                                        },
                                    ]}>
                                    H2
                                </Text>
                            ),
                            [actions.heading3]: ({ tintColor, iconSize }) => (
                                <Text
                                    style={[
                                        styles.tib,
                                        {
                                            color: tintColor,
                                            fontSize: iconSize,
                                        },
                                    ]}>
                                    H3
                                </Text>
                            ),
                            [actions.heading4]: ({ tintColor, iconSize }) => (
                                <Text
                                    style={[
                                        styles.tib,
                                        {
                                            color: tintColor,
                                            fontSize: iconSize,
                                        },
                                    ]}>
                                    H4
                                </Text>
                            ),
                            //insertHTML: htmlIcon,
                        }}
                        insertEmoji={handleEmoji}
                        insertHTML={handleInsertHTML}
                        insertVideo={handleInsertVideo}
                        fontSize={handleFontSize}
                        foreColor={handleForeColor}
                        hiliteColor={handleHiliteColor}
                    />
                    <ScrollView>
                        <KeyboardAvoidingView
                            style={{ flex: 1 }}
                            behavior={
                                Platform.OS === 'ios' ? 'padding' : 'padding'
                            }
                            keyboardVerticalOffset={
                                Platform.OS === 'ios' ? 100 : -180
                            }>
                            <RichEditor
                                focusable={true}
                                //initialFocus={true}
                                disabled={disabled}
                                editorStyle={styles.contentStyle} // default light style
                                ref={richText}
                                style={styles.rich}
                                useContainer={true}
                                initialHeight={400}
                                enterKeyHint={'done'}
                                containerStyle={{ borderRadius: 24 }}
                                //placeholder={'please input content'}
                                initialContentHTML={initialContentHTML}
                                editorInitializedCallback={
                                    editorInitializedCallback
                                }
                                onChange={(descriptionText) => {
                                    onChanger(descriptionText);
                                }}
                                onHeightChange={handleHeightChange}
                                onPaste={handlePaste}
                                //onKeyUp={handleKeyUp}
                                //onKeyDown={handleKeyDown}
                                onInput={handleInput}
                                onMessage={handleMessage}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onCursorPosition={handleCursorPosition}
                                pasteAsPlainText={true}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </>
            )}
        </View>
    );
};

export default RichComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef',
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
    },
    rich: {
        minHeight: 300,
        flex: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e3e3e3',
    },
    topVi: {
        backgroundColor: '#fafafa',
    },
    richBar: {
        borderColor: '#efefef',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    richBarDark: {
        backgroundColor: '#191d20',
        borderColor: '#696969',
    },
    scroll: {
        backgroundColor: '#ffffff',
    },
    scrollDark: {
        backgroundColor: '#2e3847',
    },
    darkBack: {
        backgroundColor: '#191d20',
    },
    item: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e8e8e8',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 15,
    },

    input: {
        flex: 1,
    },

    tib: {
        textAlign: 'center',
        color: '#515156',
    },

    flatStyle: {
        paddingHorizontal: 12,
    },
    contentStyle: {
        backgroundColor: '#fff',
        color: '#000033',
        //caretColor: 'red', // initial valid// initial valid
        placeholderColor: '#a9a9a9',
        // cssText: '#editor {background-color: #f3f3f3}', // initial valid
        contentCSSText: 'font-size: 16px; min-height: 200px;', // initial valid
    },
});
