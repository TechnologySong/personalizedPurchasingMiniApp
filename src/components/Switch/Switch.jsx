import { View } from '@tarojs/components';
import classNames from 'classnames';

import './Switch.scss';


const GmSwitch = (props) => {
  const { checked, onChange } = props;

  return <View onClick={onChange} className={classNames('gm-switch', { checked })}></View>;
};

export default GmSwitch;
