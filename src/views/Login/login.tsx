import React, { useEffect, useState } from "react";
import './login.scss';
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
const FormItem = Form.Item;
const Login: React.FC = (props:any) => {
  const { history } = props;
  const [admin, setAdmin] = useState({userName:'', password: ''});

  useEffect(() => {
    const user = admin || localStorage.getItem('user');
    if (user) {
      history.push('/home')
    }
  })
  const handleSubmit = (values: any) => {
    console.log('success', values);
    if (checkUser(values)) {
      setAdmin(values);
      localStorage.setItem('user', values);
    }
  };
  const handleSubmitFailed = (values: any) => {
    console.log('Failed', values)  
  }
  const checkUser = (user:any) => {
    return Object.keys(user).some((key) => user[key])
  }
  return (
    <div className="login vh_100 vertical_flex_center">
      <div className="login-form px_40 py_40">
        <div className="login-logo">
          <span>Amap-React</span>
        </div>
        <Form onFinish={handleSubmit} onFinishFailed={handleSubmitFailed} style={{ maxWidth: "300px" }}>
          <FormItem
            name="userName"
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input
              prefix={<UserOutlined size={13} />}
              placeholder="请输入用户名!"
            />
          </FormItem>
          <FormItem
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input
              prefix={<LockOutlined size={13} />}
              type="password"
              placeholder="请输入密码!"
            />
          </FormItem>
          <FormItem>
            <span className="login-form-forgot" style={{ float: "right" }}>
              忘记密码
            </span>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
            >
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default Login;
