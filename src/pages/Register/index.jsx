import {AtButton, AtForm, AtInput, AtModal, AtModalAction, AtModalContent, AtModalHeader} from "taro-ui";
import {useEffect, useState} from "react";
import Taro from "@tarojs/taro";
import {Button, Form, Input, View} from "@tarojs/components";
import {register as wechat_register} from '../../api/Login/index'
import './index.scss'
import MyInput from "../../components/Input";
import {Pages, pushTo} from "../../utils/router";


const Register = () => {
  const [nickname, setNickname] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  useEffect(() => {
  }, [])
  const register = () => {

    wechat_register({
      data:{
        phoneNumber,
        password,
        nickname,
        email
      }
      ,
    }).then(res => {
      if (res.data.code === 200){
        Taro.setStorageSync("user", res.data.data)
        let to = Pages.INDEX;
        pushTo(to);
      }
    })
  }

  return (
    <View>
      <View className='title'>用户注册</View>
      <View className='registerWrapper'>
        <Form>
          <MyInput title='昵称' name='nickname' onChange={setNickname} />
          <MyInput title='电话号码' name='phoneNumber' onChange={setPhoneNumber} />
          <MyInput title='邮箱' name='email' onChange={setEmail} />
          <MyInput title='密码' name='password' onChange={setPassword} password />
        </Form>
      </View>
      <Button className='button' onClick={register}>注册</Button>
    </View>

  )
}
export default Register;
