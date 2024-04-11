import {useEffect, useState} from "react";
import {View} from "@tarojs/components";
import {AtMessage, AtSearchBar} from "taro-ui";
import Taro from "@tarojs/taro";
import {EPage} from "../../components/EPage";
import NoticeItem from "../../components/NoticeItem/NoticeItem";
import Header from "../../components/Header/Header";
import './index.scss'
import {getCollectList} from "../../api/collectionApi";





const Collection = () => {
  let user = Taro.getStorageSync("user");
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const onChange = e => {
    setSearchValue(e)
  }
  const onActionClick = () => {
    if (searchValue === ''){
      return;
    }
    const pattern = new RegExp(searchValue, 'i');
    const searchData = data.filter((value) => {
      return pattern.test(value.title)
    })
    setData(searchData);
  }
  const onClear = () => {
    setSearchValue('')
  };
  useEffect(() => {
    getCollectList({
      data:{
        id: user.id
      }
    }).then((res) => {
      setData(res.data.data)
    })
  }, []);
  const header = (
    <Header bgTop={-12}>
      <View className='conds-wrap'>
        <AtMessage />
        <AtSearchBar
          // showActionButton={false}
          placeholder='请输入关键字搜索'
          value={searchValue}
          onChange={onChange}
          onActionClick={onActionClick}
          onConfirm={onActionClick}
          onClear={onClear}
        />
      </View>
    </Header>
  );
  return (
    <EPage
      renderHeader={header}
      hasMoreText='加载中...'
    >
      <View className='main-container'>
        {Array.isArray(data) && data.length > 0 ?
          data.map(item => (
            <View className='notice-item' key={item.id}>
              <NoticeItem data={item} />
            </View>
          )) : '快去收藏吧！'

        }
      </View>
    </EPage>
  )
}

export default Collection;
