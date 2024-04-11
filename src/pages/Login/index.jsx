import Taro from "@tarojs/taro";
import { View} from "@tarojs/components";
import {AtButton, AtForm , AtInput} from "taro-ui";
import {useEffect, useState} from "react";
import {login as wechat_login} from '../../api/Login/index'
import './index.scss'
import {Pages, pushTo} from "../../utils/router";


const Login = () => {
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  useEffect(() => {
  }, [])


  const  login = async () => {
    // const loginRes = await Taro.login();
    wechat_login({
      data:{
        phoneNumber,
        password
      }
    }).then(res => {
      Taro.setStorageSync("user", res.data.data)
      let to = Pages.INDEX;
      pushTo(to);
    })
  }


  const register = () => {
    let to = Pages.REGISTER;
    pushTo(to);
  }
  return (
    <View id='login'>
      {/*<View className='title'>用户登陆</View>*/}
      {/*<View className='loginWrapper'>*/}
      {/*  <Form>*/}
      {/*    <MyInput title='电话号码' name='phoneNumber' onChange={setPhoneNumber} />*/}
      {/*    <MyInput title='密码' name='password' onChange={setPassword} password />*/}
      {/*  </Form>*/}
      {/*</View>*/}
      {/*<AtInput*/}
      {/*  name='value'*/}
      {/*  title='标准五个字'*/}
      {/*  placeholder='标准五个字'*/}
      {/*  value='`1221212'*/}
      {/*/>*/}
      {/*<Button className='button' onClick={login}>登陆</Button>*/}
      {/*<Button className='button' onClick={register} style={{marginTop:'20px'}}>注册</Button>*/}
      <AtForm>
        <AtInput
          name='phoneNumber'
          title='电话号码'
          type='text'
          placeholder='单行文本'
        />
        <AtInput
          name='password'
          title='密码'
          type='text'
          placeholder='单行文本'
        />
        <AtButton formType='submit' type='primary' size='small' className='button'>提交</AtButton>
        <AtButton formType='reset' type='primary' size='small' className='button'>重置</AtButton>
      </AtForm>
    </View>





  )
}
export default Login;
