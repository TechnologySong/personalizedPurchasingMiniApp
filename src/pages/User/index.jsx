import {View} from "@tarojs/components";
import {AtAvatar, AtList, AtListItem} from "taro-ui";
import avater from '../../assets/boy.png';

import './index.scss'
import {Pages} from "../../config/router";
import {pushTo} from "../../utils/router";
import {useEffect, useMemo, useState} from "react";
import Taro from "@tarojs/taro";


function User() {
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(Taro.getStorageSync("user"));
  }, [])

  console.log('user', user)
  const toCollection = () => {
    let to = Pages.COLLECTION;
    let params = {
      id: user.id
    };
    pushTo(to, params);
  }

  return (
    <View className='user-wrap'>
      <View className='at-row avatar-wrap'>
        <View className='at-col at-col-1 at-col--auto avatar'>
          <AtAvatar circle size='large' image={avater}/>
        </View>
        <View className='at-col user-info'>
          <View className='username'>{user ? user.nickname : '昵称'}</View>
        </View>
      </View>
      <AtList>
        <AtListItem
          title='我的收藏'
          arrow='right'
          iconInfo={{size: 25, color: '#1e90ff', value: 'iconfont icon-shoucang1'}}
          onClick={toCollection}
        />

      </AtList>

    </View>
  )
}

export default User
