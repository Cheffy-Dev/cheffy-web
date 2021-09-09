import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Row, Typography } from 'antd';
import { signIn } from 'next-auth/client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLogin, userLoginSocial } from '../../../../redux/actions/auth/authAction';
import FacebookLoginComp from '../../../auth/facebookAuth';
import GoogleLoginComp from '../../../auth/googleAuth';

const LoginPage2 = ({ onClick, customer, goBack }) => {
	const [password, setType] = useState('password');
	const dispatch = useDispatch();
	const { Text } = Typography;

	const isPasswordVisible = () => {
		if ('password' === password) {
			setType(() => 'text');
		}
		if ('text' === password) {
			setType(() => 'password');
		}
	};

	const onFinish = async values => {
		try {
			const vals = {
				login: values.email.trim(),
				password: values.password
			};
			const userData = await dispatch(userLogin(vals));
			// console.log('cheffyCredentials', userData);

			if (userData && userData.token) {
				let callbackUrl = '/';
				if (userData.data.userResponse.user_type == 'user') {
					callbackUrl = '/food';
				} else if (userData.data.userResponse.user_type == 'chef') {
					callbackUrl = '/chef';
				} else if (userData.data.userResponse.user_type == 'admin') {
					callbackUrl = '/kitchen';
				} else if (userData.data.userResponse.user_type == 'driver') {
					callbackUrl = '/driver';
				}
				const user = {
					apiToken: userData.token,
					id: userData.data.userResponse.id,
					name: userData.data.userResponse.name,
					email: userData.data.userResponse.email,
					role: userData.data.userResponse.user_type,
					image: userData.data.userResponse.imagePath,
					callbackUrl: `${process.env.NEXTAUTH_URL}${callbackUrl}`
				};
				// console.log('user', user);
				signIn('cheffyCredentials', user);
			}
		} catch (err) {
			//console.log('err', err.toString());
			message.error(err.message);
		}
	};

	const googleHandler = async ({ profileObj }) => {
		try {
			const { email, googleId: provider_user_id } = profileObj;
			const userData = {
				email,
				provider_user_id,
				provider: 'google'
			};

			const res = await dispatch(userLoginSocial(userData));

			const user = {
				apiToken: res.token,
				id: res.data.id,
				name: res.data.name,
				email: res.data.email,
				role: res.data.user_type,
				image: res.data.imagePath,
				callbackUrl: `${process.env.NEXTAUTH_URL}`
			};
			signIn('cheffyCredentials', user);
		} catch (error) {
			message.error(error?.message);
		}
	};

	const facebookHandler = async ({ email, userID: provider_user_id }) => {
		try {
			const userData = {
				email,
				provider_user_id,
				provider: 'facebook'
			};

			const res = await dispatch(userLoginSocial(userData));

			const user = {
				apiToken: res.token,
				id: res.data.id,
				name: res.data.name,
				email: res.data.email,
				role: res.data.user_type,
				image: res.data.imagePath,
				callbackUrl: `${process.env.NEXTAUTH_URL}`
			};
			signIn('cheffyCredentials', user);
		} catch (error) {
			message.error(error?.message);
		}
	};

	return (
		<>
			<div className='flex flex-row justify-between align-center mb-6'>
				<Text className='text-4xl font-extrabold'>{customer} Sign In</Text>
				<img src='/images/close.png' alt='close' className='h-4 w-4 cursor-pointer' onClick={onClick} />
			</div>
			<Text className='my-8'>
				or<a href="/" className='text-red-500 ml-2'>Sign Up</a>
			</Text>
			<Form className='mt-10' layout='vertical' onFinish={onFinish}>
				<Form.Item name='email'>
					<Input className='signup-input' placeholder='Email' type='email' />
				</Form.Item>
				<Form.Item name='password' rules={[{ required: true, message: 'Please enter password' }]}>
					<Input.Password className='px-6 py-4 signup-input' placeholder='Password' />
				</Form.Item>
				<Form.Item>
					<Button
						htmlType='submit'
						className='py-6 flex flex-row justify-center items-center'
						block
						type='primary'
					>
						Sign In
					</Button>
				</Form.Item>
			</Form>
			<Text className='text-red-500'>Forgot Password ?</Text>
			<Text className='text-center block mt-8 mb-4 font-semibold text-base md:text-xl'>Or Sign In With</Text>
			<Row className='flex justify-center items-center gap-2 md:gap-4'>
				<FacebookLoginComp handler={facebookHandler} />
				<GoogleLoginComp handler={googleHandler} />
			</Row>
			<Button className='mt-4 flex flex-row justify-center mx-auto items-center' onClick={goBack}>
				<ArrowLeftOutlined /> Back
			</Button>
		</>
	);
};

export default LoginPage2;
