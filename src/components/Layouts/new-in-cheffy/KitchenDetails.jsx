import { ClockCircleOutlined, HeartFilled, HomeFilled, UserOutlined } from '@ant-design/icons';
import { Button, Col, Row, Tabs, Typography } from 'antd';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdLocationOn, MdShoppingCart, MdStar } from 'react-icons/md';

const { Text } = Typography;
function KitchenDetails({ kitchenId, data }) {
	const [inCart, setInCart] = useState(false);
	const [numberof, setNumber] = useState(1);

	const AddOne = () => {
		// console.log("x")
		if (numberof < 10) {
			setNumber(numberof + 1);
		}
	};

	const removeOne = () => {
		if (numberof > 1) {
			setNumber(numberof - 1);
		}
	};

	return (
		<div className='kitchen-info'>
			{data && (
				<>
					{/* {console.log(data)} */}
					<Row className='md:mt-20 mt-28 pt-2 pb-4 mx-auto w-3/5' align='middle'>
						<Col span={24} className='flex justify-start items-center'>
							<HomeFilled />
							<Text strong className='text-black ml-4'>
								{data['kitchen']['name']}
							</Text>
						</Col>
					</Row>
					<Row
						className='w-full bg-fixed bg-cover bg-no-repeat bg-center relative'
						style={{
							backgroundImage: `url(${data['kitchen']['image_urls'][0]})`,
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
								{data['kitchen'].name}
							</Text>
							<div className='flex flex-row justify-center mt-2'>
								<ClockCircleOutlined className='text-white mt-1' />
								<Text className='ml-3 text-white text-center'>
									{data['kitchen']['price_per_time']} - {data['kitchen']['time_type']}
								</Text>
							</div>
						</Col>
					</Row>
					<div className='w-3/5 mx-auto'>
						<div className='flex md:flex-row flex-col md:w-4/5 pb-4  mx-auto chef-img relative '>
							{data['user']['image_url'] ? (
								<img src={data['user']['image_url']} alt='' className='h-44 w-44 -mt-12' />
							) : (
								<p className='pt-4 bg-gray-200 px-5 rounded-2xl'>
									<UserOutlined className='text-6xl' />
								</p>
							)}
							<div className='felx flex-col pt-8'>
								<Text className='text-2xl md:pl-10' strong>
									{data['user']['first_name']} {data['user']['last_name']}
								</Text>
								<span className='pt-4 md:flex-row flex-col flex md:items-center justify-start md:pl-10 text-base'>
									<MdStar className='mr-2 text-yellow-500' />
									<p>4.2 (100)</p>
									<MdLocationOn className='md:ml-8  mr-2 ' />
									<p>2179 Brooklyn Steet</p>
								</span>
							</div>
						</div>
						<hr />
					</div>
					<div className='kitchen-action pb-4 w-3/5 mx-auto md:pl-20 pr-10'>
						<div className='flex md:flex-row flex-col md:space-x-3 space-y-3 jus items-center justify-start'>
							<span>
								<p className='text-2xl font-semibold pt-2'>${data['kitchen']['price_per_time']}</p>
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
							<span
								style={{
									backgroundColor: '#EDF2F7',
									borderBottom: '1px solid #A0AEC0'
								}}
							>
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
							<Tabs defaultActiveKey={'description'} centered>
								<Tabs.TabPane key='description' tab='Description'>
									<p className='font-semibold'>{data['kitchen']['description']}</p>
								</Tabs.TabPane>
								<Tabs.TabPane key='tags' tab='Tags'>
									Tags Tab
								</Tabs.TabPane>
								<Tabs.TabPane key='review' tab='Review'>
									Review Tab
								</Tabs.TabPane>
							</Tabs>
						</div>
					</div>

					<div
						class='w-3/5 mx-auto pt-2 flex align-center justify-center'
						style={{ flexDirection: 'column' }}
					>
						<p className='text-3xl font-semibold text-center mt-12 mb-12'>
							Want to rent the kitchen? take a look at the calendar
						</p>
						<Calendar minDate={new Date(Date.now())} />
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

export default KitchenDetails;
