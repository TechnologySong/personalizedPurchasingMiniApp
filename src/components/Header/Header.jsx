import { View, Image } from '@tarojs/components';
// @ts-ignore
import bgPng from '../../assets/header-bg.png';
import './Header.scss';



const Header = props => {
  return (
    <View className='header-container'>
      <Image
        mode='widthFix'
        className='header-bg'
        src={bgPng}
        style={{ top: `${props.bgTop === undefined ? -85 : props.bgTop}rpx` }}
      ></Image>
      <View className='header-content'>{props.children}</View>
    </View>
  );
};

export default Header;
