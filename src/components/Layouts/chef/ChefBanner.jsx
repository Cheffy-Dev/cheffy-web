import React from 'react';
import { Row, Col, Typography } from 'antd';

const ChefBanner = () => {
	const { Text } = Typography;
	return (
		<Row className='chef-banner' align='middle' justify='start'>
			<Col className='ml-8'>
				<Text className='text-white text-xl mr-2'>Hey</Text>
				<Text className='text-white text-4xl mr-4'>Cheffy Bit</Text>
				<Text className='text-white mr-4'>|</Text>
				<Text className='text-white'>Welcome to your profile</Text>
			</Col>
		</Row>
	);
};

export default ChefBanner;
