import { Dimensions, Image, StyleSheet } from 'react-native';
import React from 'react';
import ImageZoom from 'react-native-image-pan-zoom';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  ImageBase64?: string;
  loading?: boolean;
};

const Image_Zoom = ({ ImageBase64, loading = false }: Props) => {
  const styles = useThemeAwareObject(createStyles);

  return !loading ? (
    <ImageZoom
      cropWidth={Dimensions.get('window').width}
      cropHeight={Dimensions.get('window').height}
      imageWidth={Dimensions.get('window').width}
      imageHeight={Dimensions.get('window').height}
      panToMove={true}>
      <Image
        style={styles.imagem}
        source={{ uri: ImageBase64 }}
        resizeMode="contain"
      />
    </ImageZoom>
  ) : (
    <ShimmerPlaceholder
      width={Dimensions.get('screen').width}
      height={Dimensions.get('screen').height / 1.5}
      LinearGradient={LinearGradient}
    />
  );
};

export default Image_Zoom;

const createStyles = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    imagem: {
      flex: 1,
      backgroundColor: theme.colors.BACKGROUND_2,
      resizeMode: 'contain',
    },
  });
  return styles;
};
