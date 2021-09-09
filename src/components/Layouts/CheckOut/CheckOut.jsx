import { ArrowRightOutlined, HomeFilled } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import React from 'react';
import { FaPrint } from 'react-icons/fa';

const { Text } = Typography;

const PlacedItem = () => {
	return (
		<>
			<div className='item font-light pb-5 pt-4 flex justify-between'>
				<span>Plate name</span>
				<span className='order-last'>$28</span>
			</div>
			<hr />
		</>
	);
};

function CheckOut(props) {
	return (
		<div>
			{/* <HomeFilled */}
			<Row className='mt-20 pt-2 pb-4 mx-auto w-3/5' align='middle'>
				<Col span={24} className='flex justify-start items-center'>
					<HomeFilled />
					<Text strong className='text-black ml-4'>
						Thank you!
					</Text>
				</Col>
			</Row>
			<div className='pt-16 text-red-600 text-center'>
				<p className='font-extrabold text-4xl font-sans'>Thank you for your order!</p>
				{/* <Typography.Title level={1} style={{ color: '#c92c37',fontWeight:"bolder" }}>
					Thank you for your order!
				</Typography.Title> */}
			</div>
			<div className='flex py-12 flex-col items-center justify-center'>
				<div className='space-y-50'>
					<img src='/images/onthewayorder.png' className='w-3/6 mx-auto h-auto' />
				</div>
				<div className='order-info pt-16 flex items-center flex-col'>
					<Typography.Title level={3}>Your order is on the way....</Typography.Title>

					<Button type='primary' className='pt-4 pb-10 font-extrabold px-8'>
						Continue Shopping <ArrowRightOutlined className='text-center text-xl' />
					</Button>
					{/* <div className="continue-shop text-center mt-10 cursor-pointer py-4 bg-red-500 mx-10">
						<p className="font-extrabold text-white">
							<Text className="text-white">Continue Shopping <ArrowRightOutlined className="text-center text-xl" />{' '}</Text>
						</p>
					</div> */}
				</div>
			</div>
			<div className='order-items py-12 mx-auto w-3/5'>
				<div className='order-invoice flex justify-between pb-2'>
					<span className='order-number font-bold text-sm'>
						Order number: <p className='text-red-500 inline-block'>12121121</p>
					</span>
					<span className='flex items-center space-x-2 order-last text-sm font-semibold'>
						30, Jan 2020 <FaPrint className='ml-2' />
					</span>
				</div>
				<hr />

				<div className='items'>
					<PlacedItem />
					<PlacedItem />
					<PlacedItem />
					<PlacedItem />
				</div>
				<div className='delivery-info font-light text-xs pt-6'>
					<span className='subtotal flex justify-between'>
						<p>Subtotal</p>
						<p className='order-last'>$20</p>
					</span>
					<span className='pt-4 delivery-charge flex justify-between'>
						<p>Delivery Charges</p>
						<p className='order-last'>$6</p>
					</span>
					<span className='pt-10 total flex text-red-600 justify-between'>
						<p className='font-bold '>Total</p>
						<p className='order-last font-bold'>$100</p>
					</span>
				</div>
			</div>
		</div>
	);
}

export default CheckOut;
