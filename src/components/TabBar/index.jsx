import {AtTabBar} from "taro-ui";
import {View} from "@tarojs/components";
import {useMemo, useState} from "react";
import {TabBar as TabBarValue} from '../../enums/tabBar'

const TabBar = () => {
  const [current, setCurrent] = useState();
  const realTabBarValue = useMemo(() => {
    return TabBarValue.map(v => ({title: v.label,value: v.value, iconType: v.iconType})
    )
  }, [])

  const changeCurrent = e => {
    setCurrent(e)
  }
  return (
    <View className='home-fab'>
      <AtTabBar
        fixed
        size='small'
        onClick={changeCurrent}
        tabList={realTabBarValue}
        current={current}
      >
      </AtTabBar>
    </View>
  )
}

export default TabBar;
