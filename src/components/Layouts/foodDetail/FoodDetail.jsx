import { Col, Divider, Row, Typography } from 'antd';
import React from 'react';

const FoodDetail = () => {
	const { Text } = Typography;

	return (
		<>
			<Row className='py-4 w-4/5 mx-auto'>
				<Col>
					<img className='mr-10' src='/images/chef/contact_support.png' alt='help' />
					<p>Grilled Salmon</p>
				</Col>
			</Row>
			<Row className='w-full food-bg'>
				<Col className='flex flex-row justify-center items-center'>
					<Text strong>Grilled Salmon</Text>
					<div>
						<img src='' alt='clock' className='h-2 w-2' />
						<Text>12-20 Min</Text>
					</div>
				</Col>
			</Row>
			<Row className='py-4 w-4/5 mx-auto' gutter={24}>
				<Col span={4}>
					<img className='mr-10' src='/images/chef/contact_support.png' alt='help' />
				</Col>
				<Col span={20}>
					<Row>
						<Col>
							<Text strong>Cheffy Bit</Text>
						</Col>
					</Row>
					<Row>
						<span>
							<StarIcon />
							<Text>5 (200)</Text>
						</span>
						<span>
							<ClockIcon />
							<Text> 20-40 Min</Text>
						</span>
						<span>
							<TruckIcon />
							<Text>Delivery</Text>
						</span>
						<span>
							<LocationIcon />
							<Text>2179 Brooklyn Street</Text>
						</span>
					</Row>
				</Col>
			</Row>
			<Divider />
			<Row className='py-4 w-4/5 mx-auto'>
				<Col>
					<Text strong>$96.00</Text>
				</Col>
				<Col></Col>
			</Row>
		</>
	);
};
