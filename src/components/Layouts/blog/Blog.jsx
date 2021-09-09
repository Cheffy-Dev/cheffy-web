import { CalendarFilled, HomeFilled, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Row, Typography } from 'antd';

export default function Blog({ data }) {
	const { Text } = Typography;

	function formatDate(data) {
		var data = new Date(data),
			day = data.getDate().toString(),
			dayF = day.length == 1 ? '0' + day : day,
			mon = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
			monF = mon.length == 1 ? '0' + mon : mon,
			yearF = data.getFullYear();
		return monF + '/' + dayF + '/' + yearF;
	}

	return (
		<div className='h-auto mt-10'>
			<Row className='mt-20 pt-2 pb-4 mx-auto w-3/5' align='middle'>
				<Col span={24} className='flex justify-start items-center'>
					<HomeFilled />
					<Text strong className='text-black ml-4'>
						Blog
					</Text>
				</Col>
			</Row>
			<Row
				className='w-full bg-fixed bg-cover bg-no-repeat bg-center relative'
				style={{
					backgroundImage: `url(/images/blog-bg.png)`,
					height: '40vh',
					backgroundSize: 'cover',
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
					<Text level={1} strong className='block text-white text-6xl font-bold'>
						Blog
					</Text>
				</Col>
			</Row>
			<div className='py-20 w-4/5 mx-auto'>
				<div className='kitchen-item '>
					<Row gutter={[16, 16]} className='flex pt-4' dir='ltr'>
						{data &&
							data.map(item => {
								return (
									<Col
										onClick={() => showFood(item.id)}
										className='cursor-pointer'
										md={12}
										xs={24}
										xl={8}
									>
										<div className='kitchen-card pb-6' dir='ltr'>
											<img
												src={item.PlateImages.map((image, i) => {
													return i === 0 && image.url;
												})}
												className='w-100 h-auto'
											/>
											<p className='pt-2 font-normal text-2xl'>{item.name}</p>
											<p className='flex items-center text-base pt-2 font-light'>
												<UserOutlined className='pr-1 text-red-500' />
												{`${item.chef.name}`}
												<p className='flex items-center pl-3' dir='ltr'>
													<CalendarFilled className='pr-1 text-red-500' />
													{`${formatDate(item.createdAt)}`}
												</p>
												<p className='flex items-center pl-3' dir='ltr'>
													<ProfileOutlined className='pr-1 text-red-500' />
													{`${item.category.name}`}
												</p>
											</p>
										</div>
									</Col>
								);
							})}
					</Row>
				</div>
			</div>
		</div>
	);
}
