import { Button, Form, Input, message } from "antd";
import { csrfToken, signIn } from "next-auth/client";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/actions/auth/authAction";
import Link from "next/link";

const Login = (props) => {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const vals = {
        login: values.username.trim(),
        password: values.password,
      };
      const userData = await dispatch(userLogin(vals));
      console.log("cheffyCredentials", userData);

      if (userData && userData.token) {
        let callbackUrl = "/";
        if (userData.data.userResponse.user_type == "user") {
          callbackUrl = "/food";
        } else if (userData.data.userResponse.user_type == "chef") {
          callbackUrl = "/chef";
        } else if (userData.data.userResponse.user_type == "admin") {
          callbackUrl = "/kitchen";
        } else if (userData.data.userResponse.user_type == "driver") {
          callbackUrl = "/driver";
        }
        const user = {
          apiToken: userData.token,
          id: userData.data.userResponse.id,
          name: userData.data.userResponse.name,
          email: userData.data.userResponse.email,
          role: userData.data.userResponse.user_type,
          image: userData.data.userResponse.imagePath,
          callbackUrl: `${process.env.NEXTAUTH_URL}${callbackUrl}`,
        };
        console.log("user", user);
        signIn("cheffyCredentials", user);
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  return (
    <>
      <div className="bg-white dark:bg-gray-800 w-full max-w-sm rounded-lg shadow-md overflow-hidden mx-auto my-auto">
        <div className="py-4 px-6">
          <h3 className="mt-1 text-center font-medium text-gray-600 dark:text-gray-200 text-xl">
            Welcome {props.userType}
          </h3>
          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
            Login or create account
          </p>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
              username: "",
              password: "",
            }}
            onFinish={onFinish}
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input placeholder="Email" className="mt-2 py-2" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                type="password"
                placeholder="Password"
                className="mt-2 py-2"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="flex items-center justify-center py-4 bg-gray-100 dark:bg-gray-700 text-center">
          <span className="text-gray-600 dark:text-gray-200 text-sm">
            Don't have an account?{" "}
          </span>
          <Link href={"/" + props.userType +"/signup"}>
            <a
              className="text-blue-600 dark:text-blue-400 font-bold mx-2 text-sm hover:text-blue-500"
              style={{color: "#d73d36"}}
            >
              Register
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
