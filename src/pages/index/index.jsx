import { View} from "@tarojs/components";
import { AtSearchBar} from "taro-ui";
import {useEffect, useState} from "react";
import Taro from "@tarojs/taro";
import {EPage} from "../../components/EPage";
import Header from "../../components/Header/Header";
import NoticeItem from "../../components/NoticeItem/NoticeItem";
import './index.scss'
import {getNoticeList} from "../../api/noticeApi";



function Index() {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  let userId = Taro.getStorageSync("userId");
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
    setSearchValue('');
  };


  useEffect(() => {
    getNoticeList().then(res => {
      setData(res.data.data)
    })
  }, [])


  const header = (
    <Header bgTop={-12}>
      <View className='conds-wrap'>
        <View className='address-wrap'>
        </View>
        <AtSearchBar
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
      <View className='main-container' >
        {
          data.map(item => (
            <NoticeItem key={item.id} data={item} userId={userId} style={{ margin: 0 }} />
          ))
        }
      </View>
    </EPage>
  )
}

export default Index
