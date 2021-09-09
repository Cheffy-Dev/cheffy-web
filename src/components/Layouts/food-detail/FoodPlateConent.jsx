import { ClockCircleFilled, ClockCircleOutlined, HeartFilled, HomeFilled, UserOutlined } from '@ant-design/icons';
import { Button, Col, Row, Table, Tabs, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaTruck } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdShoppingCart, MdStar } from 'react-icons/md';
import { asyncLocalStorage } from '../../../utils/localStorage';

const { Text } = Typography;
function FoodDetails({ foodId, data }) {
	const router = useRouter();
	const [inCart, setInCart] = useState(false);
	const [numberof, setNumber] = useState(1);

	useEffect(async () => {
		try {
			const plateId = foodId;
			let cartitems = await asyncLocalStorage.getItem('cartitems');
			cartitems = JSON.parse(cartitems);

			cartitems['items'].forEach(item => {
				if (item.plateId == plateId) {
					setInCart(true);
				}
			});
		} catch (e) {
			console.log(e);
		}
	}, []);

	const columns = [
		{
			title: 'Ingredients',
			dataIndex: 'Ingredients',
			key: 'Ingredients'
		},
		{
			title: 'Purchase Date',
			dataIndex: 'Date',
			key: 'Date'
		}
	];

	const dataSource = [
		{
			key: '1',
			Ingredients: '1.Tomato',
			Date: '8-19-19'
		},
		{
			key: '2',
			Ingredients: '2.Water',
			Date: '8-19-19'
		},
		{
			key: '3',
			Ingredients: '3.Egg',
			Date: '8-19-19'
		}
	];
	const AddOne = () => {
		if (numberof < 10) {
			setNumber(numberof + 1);
		}
	};
	const removeOne = () => {
		if (numberof > 1) {
			setNumber(numberof - 1);
		}
	};
	const goTocart = () => {
		router.push('/cart');
	};
	const AddtoCart = async () => {
		let cartitems = await asyncLocalStorage.getItem('cartitems');
		const plateId = foodId;
		const orderednumber = numberof;
		let item = {
			plateId: plateId,
			ordered: orderednumber
		};

		if (!cartitems) {
			await asyncLocalStorage.setItem('cartitems', JSON.stringify({ items: [item] }));
			setInCart(true);
			console.log('Added to cart.!');
		} else {
			cartitems = JSON.parse(cartitems);
			cartitems['items'].forEach(item => {
				if (item.plateId == plateId) {
					console.log('Already in the cart.!');
					setInCart(true);
				}
			});

			if (inCart !== true) {

				cartitems['items'].push(item);
				console.log('Pushed.!');
				await asyncLocalStorage.setItem('cartitems', JSON.stringify(cartitems));
				setInCart(true);
			}
		}
	};
	return (
		<div className='kitchen-info'>
			{data && (
				<>
					<Row className='md:mt-20 mt-28 pt-2 pb-4 mx-auto w-3/5' align='middle'>
						<Col span={24} className='flex justify-start items-center'>
							<HomeFilled />
							<Text strong className='text-black ml-4'>
								{data['name']}
							</Text>
						</Col>
					</Row>
					<Row
						className='w-full bg-fixed bg-cover bg-no-repeat bg-center relative'
						style={{
							backgroundImage: `url(${data['PlateImages'][0]?.url})`,
							height: '40vh',
							backgroundSize: '100%',
							filter: 'brightness(50%)'
						}}
						justify='center'
						align='middle'
					></Row>
					<Row
						className='absolute w-full'
						style={{ height: '40vh', transform: 'translateY(-100%)' }}
						justify='center'
						align='middle'
					>
						<Col>
							<Text strong className='block text-white text-3xl'>
								{data['name']}
							</Text>
							<div className='flex flex-row justify-center mt-2'>
								<ClockCircleOutlined className='text-white mt-1' />
								<Text className='ml-3 text-white text-center'>{data['delivery_time']} - Min</Text>
							</div>
						</Col>
					</Row>

					<div className='w-3/5 mx-auto'>
						<div className='flex md:flex-row flex-col md:w-4/5 pb-4  mx-auto chef-img relative '>
							{data['chef']['imagePath'] ? (
								<img src={data['chef']['imagePath']} alt='' className='h-44 w-44 -mt-12' />
							) : (
								<p className='pt-4 bg-gray-200 px-5 rounded-2xl'>
									<UserOutlined className='text-6xl' />
								</p>
							)}
							<div className='felx flex-col pt-8'>
								<Text className='text-2xl md:pl-10' strong>
									{data['chef']['name']}
								</Text>
								<span className='pt-4 md:flex-row flex-col flex md:items-center justify-start md:pl-10 text-base'>
									<MdStar className='mr-2 text-yellow-500' />
									<p>
										{data['rating']} ({data['reviews']?.length})
									</p>
									<ClockCircleFilled className='md:ml-6  mr-2 ' />
									<p>{data['delivery_time']} - Min</p>
									<FaTruck className='md:ml-6 mr-2' />
									<p className='uppercase font-semibold'>{data['delivery_type']}</p>
								</span>
							</div>
						</div>
						<hr />
					</div>
					<div className='kitchen-action pb-4 w-3/5 mx-auto md:pl-20 pr-10'>
						<div className='flex md:flex-row flex-col md:space-x-3 space-y-3 jus items-center justify-start'>
							<span>
								<p className='text-2xl font-semibold pt-2'>${data['price']}</p>
							</span>
							<Button
								onClick={() => {
									if (inCart) {
										goTocart();
									} else {
										AddtoCart();
									}
								}}
								size='large'
								type='primary'
								className='flex flex-row items-center justify-start mx-4 rounded-none'
							>
								<MdShoppingCart />
								{inCart ? <p className='ml-2'>Go to Cart</p> : <p className='ml-2'>Add to Cart</p>}
							</Button>
							<span style={{ backgroundColor: '#EDF2F7', borderBottom: '1px solid #A0AEC0' }}>
								<Button
									onClick={removeOne}
									size='large'
									className='border-none text-black rounded-none'
									ghost
								>
									{' - '}
								</Button>
								<Text className='mx-2'>{numberof}</Text>
								<Button
									onClick={AddOne}
									size='large'
									className='border-none text-black rounded-none'
									ghost
								>
									{' + '}
								</Button>
							</span>
							<HeartFilled className='text-3xl text-red-600 cursor-pointer' />
						</div>
					</div>
					<hr className='w-3/5 mx-auto pt-2' />
					<div className='w-3/5 mx-auto pt-2'>
						<div className=''>
							<Tabs defaultActiveKey={'1'} centered size='large'>
								<Tabs.TabPane key='1' tab='The Plate'>
									<p className='font-semibold mb-4'>
										{data['description'] ? data['description'] : 'Here goes Description'}
									</p>
									<Table pagination={false} dataSource={dataSource} columns={columns} />
								</Tabs.TabPane>
								<Tabs.TabPane tab='Kitchen' key='2'>
									Kitchen Tab
								</Tabs.TabPane>
								<Tabs.TabPane tab='Recipe' key='3'>
									Recipe Tab
								</Tabs.TabPane>
								<Tabs.TabPane tab='Review' key='4'>
									Review Tab
								</Tabs.TabPane>
								{/* <TabPane tab={<TabName name="Kitchen" />} key="2">
							Content of Tab Pane 2
						</TabPane>
						<TabPane tab={<TabName name="Recipe" />} key="3">
							Content of Tab Pane 3
						</TabPane>
						<TabPane tab={<TabName name="Review" />} key="4">
							Content of Tab Pane 4
						</TabPane> */}
							</Tabs>
						</div>
					</div>

					<div className='py-6 w-3/5 mx-auto'>
						<div className='other-kitchen-info flex items-center justify-between'>
							<span className='text-2xl font-semibold'>Other Kitchen</span>
							<span className='order-last flex items-center'>
								<p className='underline font-semibold cursor-pointer mr-2'>View All</p>
								<span>
									<IoIosArrowBack className='text-xl' />
								</span>
								<span>
									<IoIosArrowForward className='text-xl' />
								</span>
							</span>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default FoodDetails;
