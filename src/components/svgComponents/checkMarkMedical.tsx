import * as React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Svg, { SvgProps, Path, NumberProp } from 'react-native-svg';
interface Props extends SvgProps {
  width?: NumberProp;
  height?: NumberProp;
  fill?: string;
  fillSecondary?: string;
}

const SvgComponent = ({
  width = RFPercentage(3.5),
  height = RFPercentage(3.5),
  fill = '#20c4cb',
  fillSecondary = '#fff',
  ...props
}: Props) => (
  <Svg
    data-name="Layer 1"
    viewBox="0 0 512 512"
    width={width}
    height={height}
    {...props}>
    <Path
      fill={fill}
      d="M0 256C0 114.61 114.61 0 256 0s256 114.63 256 256-114.62 256-256 256S0 397.39 0 256Z"
    />
    <Path
      fill={fillSecondary}
      fillRule="evenodd"
      d="m258.11 341.89 30.12-55.06-.47-.94-10.34-15.53-5.66-5.65c-19.29-17.88-44.24-22.11-56.47-23.05h-1.41l-32 58.35a41 41 0 0 0-5.17 22.59 42.92 42.92 0 0 0 22.58 36.24 43.83 43.83 0 0 0 58.82-16.94Z"
    />
    <Path
      fill={fillSecondary}
      fillRule="evenodd"
      d="m218.12 229.41 9.88 1.89c19.29 2.82 45.17 11.29 61.63 35.76l6.58 9.41 33.41-61.18a43.2 43.2 0 0 0 5.66-24 43.92 43.92 0 0 0-23.54-37.64 44.57 44.57 0 0 0-61.17 17.88Z"
    />
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M305.17 165.9a30.62 30.62 0 0 1 16.47 25.87c0 6.12-.94 11.77-3.76 16.94l-23.07 41.89c-16.94-19.29-38.58-27.76-55.06-31.53l22.58-40.95a31.24 31.24 0 0 1 42.83-12.22Z"
    />
  </Svg>
);
export default SvgComponent;
