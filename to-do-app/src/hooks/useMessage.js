import { message } from 'antd';
import { MESSAGE_KEY, MESSAGE_DURATION } from '../constants';

export const useMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  
  const showMessage = (type, content) => {
    messageApi.open({
      key: MESSAGE_KEY,
      type,
      content,
      duration: MESSAGE_DURATION,
    });
  };

  return { showMessage, contextHolder };
}; 