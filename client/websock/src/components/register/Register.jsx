import { Form, Input, Button, Typography, Card } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  HomeOutlined
} from "@ant-design/icons";
import "./register.css";
import { register } from "../../services/services";
import { useNavigate } from 'react-router-dom'
import { message } from "antd";

const { Title, Text } = Typography;

const Signup = () => {
  const navigate=useNavigate()

  const onFinish = async (values) => {
    try {
      const { name, email, password, address, phoneNumber } = values;

      if (!name || !email || !password || !address || !phoneNumber) {
        return alert("Credentials are missing");
      }
      const response = await register(name, email, password, address, phoneNumber);
      if (response.data.status == 1) {
        message.success(response.data.message || "Signup Successful");
         navigate("/");
      }
      else {
        message.error(response.data.message || "Already registered");
      }
    }
    catch (err) {
      message.error(
        console.log("inside catch statement"),
        err.response?.data?.message || "Invalid data"
      );
    }
  };

  return (
    <div className="auth-container register-container">
      <Card className="auth-card">
        <Title level={3} className="auth-title">
          Create Account
        </Title>
        <Text className="auth-subtext">
          Join WebSock
        </Text>

        <Form layout="vertical" onFinish={onFinish}>

          {/* Name */}
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your name"
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" }
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter your email"
            />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter your phone number" },
              { min: 10, message: "Phone number must be at least 10 digits" }
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Enter phone number"
            />
          </Form.Item>

          {/* Address */}
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input
              prefix={<HomeOutlined />}
              placeholder="Enter address"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter password"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>

          <Text className="auth-footer">
            Already have an account? <a href="/">Login</a>
          </Text>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
