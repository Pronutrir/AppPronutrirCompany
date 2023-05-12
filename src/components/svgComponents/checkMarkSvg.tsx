import * as React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Svg, { SvgProps, Rect, Path, NumberProp } from 'react-native-svg';

interface Props extends SvgProps {
  width?: NumberProp;
  height?: NumberProp;
  fill?: string;
  fillSecondary?: string;
}

const CheckMarkSvg = ({
  width = RFPercentage(3.5),
  height = RFPercentage(3.5),
  fill = '#20c4cb',
  fillSecondary = '#fff',
  ...props
}: Props) => (
  <Svg width={width} height={height} {...props}>
    <Rect width={42} height={42} x={0.928} y={0.671} fill={fill} rx={21} />
    <Path
      fill={fillSecondary}
      d="M26.338 32.171h-8.82c-1.89 0-2.94 0-3.78-.42-.84-.42-1.47-1.05-1.785-1.785-.525-.945-.525-1.995-.525-3.885v-8.82c0-1.89 0-2.94.42-3.78.42-.84 1.05-1.47 1.785-1.785.945-.525 1.995-.525 3.885-.525h8.82c1.89 0 2.94 0 3.78.42.84.42 1.47 1.05 1.785 1.785.525.945.525 1.995.525 3.885v8.82c0 1.89 0 2.94-.42 3.78-.42.84-1.05 1.47-1.785 1.785-.945.525-1.995.525-3.885.525Zm-8.82-18.9c-1.575 0-2.415 0-2.835.21a2.06 2.06 0 0 0-.945.945c-.21.42-.21 1.26-.21 2.835v8.82c0 1.575 0 2.415.21 2.835.21.42.525.735.945.945.42.21 1.26.21 2.835.21h8.82c1.575 0 2.415 0 2.835-.21.42-.21.735-.525.945-.945.21-.42.21-1.26.21-2.835v-8.82c0-1.575 0-2.415-.21-2.835a2.06 2.06 0 0 0-.945-.945c-.42-.21-1.26-.21-2.835-.21h-8.82Zm2.835 12.6c-.315 0-.525-.105-.735-.315l-3.15-3.15c-.42-.42-.42-1.05 0-1.47.42-.42 1.05-.42 1.47 0l2.415 2.415 5.565-5.565c.42-.42 1.05-.42 1.47 0 .42.42.42 1.05 0 1.47l-6.3 6.3c-.21.21-.42.315-.735.315Z"
    />
  </Svg>
);

export default CheckMarkSvg;
