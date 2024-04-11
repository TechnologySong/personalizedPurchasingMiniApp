import { View, Text } from '@tarojs/components';
import { formatDate, formatCurrency } from '../../utils/index';
import './NoticeItem.scss';
import {Pages, pushTo} from "../../utils/router";


const NoticeItem = (props) => {
  const {title, districtName, projectBudget, issueTime,id, userId } = props.data

  const toDetail = () => {
    let to = Pages.DETAIL;
    let params = {
      id,
      userId:userId
    };
    pushTo(to, params);

  }
  return (
    <View className='notice-item__wrap' onClick={toDetail}>
      <View className='ellipsis notice-title'>
        <Text>{title}</Text>
      </View>
      <View>
        <View className='at-row'>
          <View className='at-col at-col-6'>
            <View className='tags-wrap'>
              <View className='notice-tag'>
                <View className='ellipsis'>{districtName}</View>
              </View>
            </View>
          </View>
          <View className='at-col at-col-6'>
            <View className='money-tag ellipsis'>
              {formatCurrency(projectBudget,'￥', 2)}
            </View>
          </View>
        </View>
        <View className='notice-info-wrap'>
          <View className='notice-info'>
            <Text className='left'>发布时间</Text>
            <Text className='time'>{formatDate(issueTime, 'YYYY-MM-DD')}</Text>
          </View>
        </View>
      </View>

    </View>
  );
};

NoticeItem.options = {
  addGlobalClass: true,
};

export default NoticeItem;
