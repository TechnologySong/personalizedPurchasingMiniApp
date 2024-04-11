import {Button, Text, Textarea, View} from "@tarojs/components";
import { AtButton, AtMessage} from "taro-ui";
import Taro from "@tarojs/taro";
import {useEffect, useState} from "react";
import './index.scss'
import {getNoticeDetail} from "../../api/noticeApi";
import {cancelCollect, isCollected as isCollectedApi} from "../../api/collectionApi";
import {showError, showMessage} from "../../utils";


function Detail() {
  const {id} = Taro.getCurrentInstance().router.params;
  const [collected, setCollected] = useState(false);
  const [notice, setNotice] = useState();
  let user = Taro.getStorageSync("user");


  useEffect(()=> {
    getNoticeDetail({
      data:{
        id
      }
    }).then(res => {
        const {data} = res;
        setNotice(data.data);
    })
    isCollectedApi({
      data:{
        noticeId:id,
        userId:user.id
      }
    }).then(res => {
      const {data} = res;
      setCollected(data.data);
    })
  }, [id])
  const isCollected = () => {
    setCollected(!collected);
    let noticeIdArr = JSON.parse(user.collection);
    if (!collected){
      noticeIdArr.push(id);
    }else {
      noticeIdArr = noticeIdArr.filter(item => item!==id)
    }
    cancelCollect({
      data:{
        noticeIdArr:JSON.stringify(noticeIdArr),
        id:user.id
      }
    }).then(() => {
      user.collection = JSON.stringify(noticeIdArr);
      Taro.setStorageSync("user",user);
      if(!collected){
        showMessage('收藏成功！')
      }else {
        showMessage('取消收藏！')
      }
    }).catch(e => {
      showError(e)
    })


  }

  return (
    <View>
      <AtMessage />
      {notice && (
        <View className='detail-wrap'>
          <View className='header-wrap'>
            <View className='title'>{notice.title}</View>
            <View className='subtitle' style={{marginBottom: '10rpx'}}>
              <View className='notice-tag'>{notice.districtName}</View>
            </View>
            <View className='subtitle' style={{marginBottom: '12rpx'}}>
              发布日期：{notice.issueTime}
            </View>
            {notice.projectBudget && (
              <View className='subtitle money-wrap'>
                预算金额： <Text className='money'>￥{notice.projectBudget}</Text>
              </View>
            )}
            <View className='subtitle'>
              <Text className='number'>浏览量：{notice.readCount}</Text>
            </View>
            <Button className='share-btn' plain onClick={isCollected}>
              {/* <View className="at-icon at-icon-share-2"></View> */}
              <View
                className={`at-icon ${collected ? 'at-icon-star-2' : 'at-icon-star'}`}
              ></View>
              <View>{collected ? '已' : ''}收藏</View>
            </Button>

          </View>
          <View className='content-wrap'>
            <View className='block'>
              <View className='title'>公告详情</View>
              <Textarea value={notice.description} />
            </View>
            <View className='block'>
              <View className='title'>相关公告</View>
              {notice.url}
            </View>
          </View>
        </View>
      )}

    </View>
  )
}

export default Detail
