import { CheckCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

const Step3 = ({ onClick }) => {
	return (
		<>
			<div className='flex flex-row justify-end align-center mb-6'>
				<img src='/images/close.png' alt='close' onClick={onClick} className='h-4 w-4 cursor-pointer' />
			</div>
			<div className='flex justify-center items-center mb-8'>
				<CheckCircleOutlined style={{ fontSize: '5em', color: 'green' }} />
			</div>
			<div className='text-center'>
				<Text className='text-4xl block font-extrabold'>Signed up Successfully!</Text>
				<Text className='my-8 text-lg block'>Please login to continue.</Text>
			</div>
		</>
	);
};

export default Step3;
