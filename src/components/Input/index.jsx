import {Input, View} from "@tarojs/components";
import './index.css'

const MyInput = (props) => {
  const {title,name,onChange,password} = props
  const placeholder = `请输入${title}`
  const onInput = (e) => {
    onChange(e.detail.value)
  }
return (
  <View className='wrapper'>
    <View className='label'>{title}：</View>
    <Input placeholder={placeholder} name={name} onInput={onInput} password={password} />
  </View>
)
}
export default MyInput;
