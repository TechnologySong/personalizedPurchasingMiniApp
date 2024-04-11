import Taro from '@tarojs/taro';

/**
 * 消息通知，因taro机制，!!!必须在页面引入 <AtMessage />
 * @param {string} message 消息内容
 * @param {('info' | 'success' | 'error' | 'warning')} [type='success'] 消息类型，默认success
 * @param {number} [duration=2000] 消息持续时间，默认2000
 */
function showMessage(
  message,
  type= 'success',
  duration = 2000
) {
  Taro.atMessage({
    message,
    type,
    duration,
  });
}

/**
 * 错误通知，因taro机制，!!!必须在页面引入 <AtMessage />
 * @param err
 */
function showError(err) {
  showMessage((err.data ? err.data.message : err.errMsg) || '请求失败', 'error');
}

/**
 * 提示框
 * @param {string} title
 * @param {('success' | 'loading' | 'none')} [icon='none']
 */
function showToast(title, icon= 'none') {
  Taro.showToast({
    title,
    icon,
    duration: 2000,
  });
}

export { showMessage, showError, showToast };
