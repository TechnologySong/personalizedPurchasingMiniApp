import Taro from '@tarojs/taro';
import { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import { AtFloatLayout, AtRange } from 'taro-ui';

import { getMoneyText } from '../../utils/index';

import './MoneyRange.scss';


const { system } = Taro.getSystemInfoSync();

const hasBorder = system.indexOf('Android') === -1;

const MoneyRange = (props) => {
  const { isOpen, value, onClose, onChange } = props;
  const [money, setMoney] = useState(value || [0, 0]);

  useEffect(() => {
    setMoney(value);
  }, [value]);

  const handleClose = () => {
    onClose();
    const timer = setTimeout(() => {
      setMoney(value);
      clearTimeout(timer);
    }, 300);
  };

  const handleConfirm = () => {
    onChange(money);
  };

  return (
    <AtFloatLayout isOpened={isOpen} onClose={handleClose}>
      <View className='money-range'>
        <View className='range-header' style={{ borderBottomWidth: hasBorder ? '1px' : 0 }}>
          <View className='cancel' onClick={handleClose}>
            取消
          </View>
          <View className='confirm' onClick={handleConfirm}>
            确定
          </View>
        </View>
        <View className='money-content'>
          <View className='money-text'>金额范围：{getMoneyText(money)}</View>
          <AtRange
            max={1000}
            // blockSize={50}
            sliderStyle={{ backgroundColor: '#6190E8' }}
            value={money}
            onChange={setMoney}
          />
        </View>
      </View>
    </AtFloatLayout>
  );
};

export default MoneyRange;
