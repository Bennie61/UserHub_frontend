import {message, Tabs} from 'antd';
import React, {useState} from 'react';
import {history} from 'umi';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
// import {SYSTEM_LOGO} from "@/constants";
import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';
import styles from './index.less';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
// Note: ctrl+ Alt+ O 自动去除所有没用到的引入

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');

  // Note：handleSubmit 表单提交的逻辑实现
  const handleSubmit = async (values: API.RegisterParams) => {
    const { userPassword, checkPassword} = values;
    // 校验
    if(userPassword !== checkPassword){
      message.error('两次输入的密码不一致 ')
    }
    try {
      // 注册
      const id = await register(values);
      if (id > 0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);

        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;

        // Note：用户注册成功后跳转到登录界面
        history.push({
          pathname: '/user/login',
          query,
        });
        return;
      }else{
        throw new Error(`register error id = ${id}`);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig:{
              submitText:'注册'
            }
          }}
          // logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="UserHub 用户注册"
          subTitle={'UserHub 用户注册  '}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账户密码注册'} />
          </Tabs>
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '密码长度不小于8！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '密码长度不小于8！',
                  },
                ]}
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
