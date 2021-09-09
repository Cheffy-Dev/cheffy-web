import { HomeFilled, UserOutlined } from '@ant-design/icons';
import { Col, Row, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdLocationOn, MdStar } from 'react-icons/md';

const ClockIcon = () => {
	return <img src='/images/clock.png' className='w-3 h-3' alt='clock' />;
};

const TruckIcon = () => {
	return <img src='/images/truck.png' alt='truck' className='h-3 w-auto' />;
};

const StarIcon = () => {
	return <img className='w-3 h-3' src='/images/star-yellow.png' alt='rating' />;
};

const { Text } = Typography;
function ChefDetails({ chefId, data }) {
	const router = useRouter();
	const [page1, setPage1] = useState('');
	const [inCart, setInCart] = useState(false);
	const [numberof, setNumber] = useState(1);

	const handlePrev = () => {
		setPage1(page1 - 3);
	};

	const handleNext = () => {
		setPage1(page1 + 3);
	};

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
					<Row className='md:mt-20 mt-28 pt-2 pb-4 mx-auto w-3/5' align='middle'>
						<Col span={24} className='flex justify-start items-center'>
							<HomeFilled />
							<Text strong className='text-black ml-4'>
								{data[0].chef.name}
							</Text>
						</Col>
					</Row>
					<Row
						className='w-full bg-fixed bg-cover bg-no-repeat bg-center relative'
						style={{
							backgroundImage: `url(${data[0]['PlateImages'][0]?.url})`,
							height: '40vh',
							backgroundSize: '100%',
							filter: 'brightness(50%)'
						}}
						justify='center'
						align='middle'
					></Row>

					<div className='w-3/5 mx-auto'>
						<div className='flex md:flex-row flex-col md:w-4/5 pb-4  mx-auto chef-img relative '>
							{data[0]['chef']['imagePath'] ? (
								<img src={data[0]['chef']['imagePath']} alt='' className='h-44 w-44 -mt-12' />
							) : (
								<p className='pt-4 bg-gray-200 px-5 rounded-2xl'>
									<UserOutlined className='text-6xl' />
								</p>
							)}
							<div className='felx flex-col pt-8'>
								<Text className='text-2xl md:pl-10' strong>
									{data[0]['chef']['name']}
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

					<div className='py-6 w-3/5 mx-auto'>
						<div className='other-kitchen-info flex items-center justify-between'>
							<span className='text-2xl font-semibold'>About Me</span>
						</div>
						<p className='text-xl'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
							laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
							voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
							cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
					</div>

					<div className='py-6 w-3/5 mx-auto'>
						<div className='other-kitchen-info flex items-center justify-between'>
							<span className='text-2xl font-semibold'>My Plates</span>
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

					<Row className='food-grid' gutter={[32, 48]} justify='center' align='top'>
						{data.map((plate, index) => {
							return (
								index >= page1 &&
								index < page1 + 3 && (
									<Col
										xs={24}
										sm={12}
										md={12}
										lg={8}
										xl={6}
										xxl={6}
										key={data.id}
										className='new-food-card'
									>
										<Link href={`/food-detail/${encodeURIComponent(plate.id)}`}>
											<a>
												<Row
													justify='center'
													className='new-food-image'
													style={{ backgroundImage: `url(${plate.PlateImages[0]?.url})` }}
												></Row>
												<Row>
													<Text className='mt-4 mb-1'>{plate.name}</Text>
												</Row>
												<Row>
													<Col xs={8} sm={6} md={8} lg={8} xl={6} xxl={8}>
														<Row align='middle' justify='start'>
															<StarIcon />
															<Text className='ml-2'>
																{plate.rating ? plate.rating : 'no rating yet'}
															</Text>
														</Row>
													</Col>
													<Col xs={8} sm={9} md={8} lg={8} xl={9} xxl={8}>
														<Row align='middle' justify='start'>
															<ClockIcon />
															<Text className='ml-2'>{plate?.delivery_time} mins</Text>
														</Row>
													</Col>
													<Col xs={8} sm={9} md={8} lg={8} xl={9} xxl={8}>
														<Row align='middle' justify='end'>
															<TruckIcon />
															<Text className='ml-2'>Delivery</Text>
														</Row>
													</Col>
												</Row>
											</a>
										</Link>
									</Col>
								)
							);
						})}
					</Row>
				</>
			)}
		</div>
	);
}

export default ChefDetails;
