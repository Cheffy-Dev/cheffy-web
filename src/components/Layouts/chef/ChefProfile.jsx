import { Button, Col, Divider, Row, Typography } from 'antd';
import React from 'react';
import ChefProfileTab from './ChefProfileTab';

const ChefProfile = () => {
	const { Text } = Typography;

	return (
		<>
			<Row justify='space-between w-2/3 mx-auto mt-16' align='middle'>
				<Col className='flex flex-row'>
					<img src='/images/user-24.png' className='h-3 w-3 mr-2 mt-2' alt='user' />
					<Text className='text-lg font-extrabold'>My Profile</Text>
				</Col>
				<Col>
					<Row gutter={16}>
						<Col>
							<Button className='mr-3'>View Profile</Button>
							<Button>Edit</Button>
						</Col>
					</Row>
				</Col>
				<Divider className='bg-gray-400' />
			</Row>
			<ChefProfileTab />
		</>
	);
};

export default ChefProfile;
