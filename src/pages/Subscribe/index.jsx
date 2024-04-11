import {useEffect, useMemo, useState} from "react";
import {Input, Form, Text, View, Switch} from "@tarojs/components";
import {
  AtActivityIndicator,
  AtButton, AtCheckbox,
  AtList, AtListItem,
  AtMessage,
} from "taro-ui";
import Taro from "@tarojs/taro";
import uniqueId from 'lodash/uniqueId';
import classNames from "classnames";
import uniq from 'lodash/uniq';
import every from 'lodash/every';
import './index.scss'
import {getMoneyText, showError, showToast} from "../../utils";
import MoneyRange from "../../components/MoneyRange/MoneyRange";
import {getUserSetting, setSetting} from "../../api/settingApi";


function Subscribe() {
  const loading = false;
  const [openPushFlag, setOpenPushFlag] = useState(false);
  // const [config, setConfig] = useState();
  const [isShowMoneyRange, setIsShowMoneyRange] = useState(false);
  const [keywordList, setKeywordList] = useState(['']);
  const [amount, setAmount] = useState([]);
  const [pushTypes, setPushTypes] = useState([]);

  let user = Taro.getStorageSync("user");
  const pushWayOptions = [
    {value: '1', label: '邮箱'},
  ];
  const handleInput = (e, index) => {
    const temp = [...keywordList];
    temp[index] = e.detail.value;
    setKeywordList(temp);
  };
  const removeKeyword = index => {
    const temp = [...keywordList];
    temp.splice(index, 1);
    setKeywordList(temp);
  };
  const addKeyword = () => {
    if (!every(keywordList)) {
      return showToast('请输入关键字');
    }
    if (keywordList.length === 10) {
      return showToast('只能添加10组关键字');
    }
    if (keywordList.filter(item => /,|，|。|、|\s/g.test(item)).length) {
      return showToast('请勿输入标点、空格');
    }
    if (uniq(keywordList).length !== keywordList.length) {
      return showToast('请勿输入相同的关键字');
    }
    // setFocusIndex(keywordList.length);
    setKeywordList([...keywordList, '']);
  };
  const onAmountChange = e => {
    setAmount(e)
    setIsShowMoneyRange(false)
  }
  const changePushWayOptions = e => {
    setPushTypes(e);
  }

  const onSubmit = e => {
    let setting = {
      keywords: keywordList,
      amount,
      pushTypes
    }
    const tempList = [...keywordList];
    // 最后一条为空时删除掉不检查，优化体验
    if (tempList.length > 1 && !tempList[tempList.length - 1]) {
      tempList.splice(tempList.length - 1, 1);
    }
    if (tempList.length === 1 && !tempList[0]) {
      return showToast('请至少输入一组关键字');
    }
    if (!every(tempList)) {
      return showToast('关键字不能为空');
    }
    if (tempList.filter(item => /,|，|。|、|\s/g.test(item)).length) {
      return showToast('关键字请勿输入标点、空格');
    }
    if (uniq(tempList).length !== tempList.length) {
      return showToast('请勿输入相同的关键字');
    }
    if (openPushFlag && (!pushTypes || !pushTypes.length)) {
      return showToast('请选择至少一种推送方式');
    }
    setSetting({
      data: {
        userId: user.id,
        setting: JSON.stringify(setting).toString(),
        openPushFlag
      }
    }).then(res => {
      if (res.data.code === 200) {
        showToast('保存成功')
      } else {
        showError('保存失败')
      }
    })
  }

  useEffect(() => {
    getUserSetting({
      data: {
        userId: user.id
      }
    }).then(res => {
      // setConfig(JSON.parse(res.data.data.config));
      if (!res.data.data){
        setPushTypes([]);
        setAmount([0,0] );
        setKeywordList([]);
        setOpenPushFlag(false);
        return
      }
      let config = JSON.parse(res.data.data.config);
      setPushTypes(config.pushTypes);
      setAmount(config.amount);
      setKeywordList(config.keywords);
      setOpenPushFlag(res.data.data.openPushFlag);
    })
  }, [user.id])

  return (
    <View>
      <AtMessage></AtMessage>
      {loading ? (
        <AtActivityIndicator mode='center'></AtActivityIndicator>
      ) : (
        <Form onSubmit={onSubmit}>
          <View className='panel subscribe-setting-wrap'>
            <View className='panel__title'>个性化设置</View>
            <View className='panel__content'>
              <AtList>
                <View className='panel__subtitle'>
                  关键字
                  <View className={classNames('keyword-num', {full: keywordList.length === 10})}>
                    {keywordList.length}/10
                  </View>
                </View>
                <View className='keyword-wrap'>
                  {keywordList.map((item, index) => (
                    <View className='keyword-item' key={uniqueId('keyword')}>
                      <Text className='order'>{index + 1}</Text>
                      <Input
                        className='input'
                        placeholder='请输入关键字，如：计算机'
                        maxLength={15}
                        value={item}
                        onInput={e => handleInput(e, index)}
                        // focus={focusIndex === index}
                      ></Input>
                      {keywordList.length > 1 ? (
                        <View
                          className='at-icon at-icon-subtract-circle'
                          onClick={() => removeKeyword(index)}
                        ></View>
                      ) : (
                        <View className='at-icon'></View>
                      )}
                    </View>
                  ))}
                  <View className='add-btn'>
                    <AtButton type='secondary' onClick={addKeyword}>
                      添加关键字
                    </AtButton>
                  </View>
                </View>
              </AtList>
              <AtList>
                <View className='panel__subtitle'>其他设置</View>
                <View className='subscribe-wrap'>
                  <AtListItem
                    hasBorder={false}
                    title='金额'
                    arrow='right'
                    extraText={getMoneyText(amount)}
                    onClick={() => setIsShowMoneyRange(true)}
                  />
                </View>
              </AtList>
              <View className='at-switch at-switch--without-border'>
                <View className='at-switch__title'>开启推送</View>
                <View className='at-switch__container'>
                  <Switch
                    checked={openPushFlag}
                    onChange={(e) => setOpenPushFlag(e.detail.value)}
                    color='#6190e8'
                  />
                </View>
              </View>
              {openPushFlag && (
                <AtList>
                  <View className='panel__subtitle'>推送方式</View>
                  <AtCheckbox
                    options={pushWayOptions}
                    selectedList={pushTypes || []}
                    onChange={changePushWayOptions}
                  />
                </AtList>
              )}
              <AtButton
                className='save-btn'
                type='primary'
                formType='submit'
                full
              >
                保存
              </AtButton>
            </View>
            <MoneyRange
              isOpen={isShowMoneyRange}
              onChange={onAmountChange}
              onClose={() => setIsShowMoneyRange(false)}
              value={amount}
            ></MoneyRange>
          </View>
        </Form>
      )}
    </View>
  );
}

export default Subscribe

