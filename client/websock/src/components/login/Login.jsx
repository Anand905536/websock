import { Form, Input, Button, Typography, Card } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import "./login.css";
import { login } from "../../services/services";
import { useNavigate } from 'react-router-dom'
import { message } from "antd";
const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const { email, password } = values;
      if (!email || !password) {
        return alert("Credentials are missing");
      }
      const response = await login(email, password);
      if (response.data.status == 1) {
        message.success(response.data.message || "Login successful");
        navigate("/dashboard");
      }
      else {
        message.error(response.data.message || "Login failed");
      }
    }
    catch (err) {
      message.error(
        err.response?.data?.message || "Invalid email or password"
      );
    }
  };


  return (
    <div className="auth-container">
      <Card className="auth-card">
        <Title level={3} className="auth-title">Welcome Back</Title>
        <Text className="auth-subtext">Login to your account</Text>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Enter password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block >
            Login
          </Button>

          <Text className="auth-footer">
            Don’t have an account? <a href="/signup">Sign up</a>
          </Text>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
