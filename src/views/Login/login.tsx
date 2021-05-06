import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { GithubOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
const FormItem = Form.Item;

const Login: React.FC = () => {
  const handleSubmit = (values: any) => {};
  const gitHub = () => {};
  return (
    <div className="login vh_100 vertical_flex_center">
      <div className="login-form px_40 py_40">
        <div className="login-logo">
          <span>React Admin</span>
        </div>
        <Form onFinish={handleSubmit} style={{ maxWidth: "300px" }}>
          <FormItem
            name="userName"
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input
              prefix={<UserOutlined size={13} />}
              placeholder="管理员输入admin, 游客输入guest"
            />
          </FormItem>
          <FormItem
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input
              prefix={<LockOutlined size={13} />}
              type="password"
              placeholder="管理员输入admin, 游客输入guest"
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
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <span>或 现在就去注册!</span>
              <span onClick={gitHub}>
                <GithubOutlined />
                (第三方登录)
              </span>
            </p>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default Login;
