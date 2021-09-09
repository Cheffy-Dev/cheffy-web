import {
	Button,
	Col,
	Collapse,
	DatePicker,
	Divider,
	Input,
	Modal,
	Radio,
	Row,
	Select,
	Space,
	Switch,
	Typography
} from 'antd';
import Form from 'antd/lib/form/Form';
import { useSession } from 'next-auth/client';
import React, { useEffect, useState } from 'react';
import { AiFillEdit, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { VscLoading } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import AppHead from '../src/components/Layouts/Header/AppHead';
import FoodHeader from '../src/components/Layouts/Header/HomeHeader';
import FoodFooter from '../src/components/Layouts/home/FoodFooter';
import App from '../src/payments/App';
import { getUserBasket } from '../src/redux/actions/cart/cartAction';
import { getShippingAddressById } from '../src/redux/actions/shipping-address/shippingAddressAction';
import { getUserInfo } from '../src/redux/actions/user/userAction';

const ShippingAddressListModal = ({
	isModalVisible,
	showModal,
	handleOk,
	handleCancel,
	deliveryAddressList,
	shippingAddressId,
	setShippingAddressId
}) => {
	const onChange = e => {
		setShippingAddressId(e.target.value);
	};

	return (
		<>
			<Modal title='Shipping Addresses' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
				<Radio.Group onChange={onChange} value={shippingAddressId}>
					<Space direction='vertical'>
						{deliveryAddressList.map((item, index) => {
							let address =
								item.addressLine1 +
								' ' +
								item.addressLine2 +
								' ' +
								item.city +
								' ' +
								item.state +
								' ' +
								item.zipCode;
							return (
								<>
									<Radio value={item.id}>{address}</Radio>;
								</>
							);
						})}
					</Space>
				</Radio.Group>
			</Modal>
		</>
	);
};

const Item = ({ price, name, orderCount, plateID }) => {
	return (
		<>
			<hr />
			<div className='cart-item flex flex-row justify-between'>
				<div className='order-last py-4'>
					<div className='flex flex-row items-center'>
						<span className='flex space-x-2'>
							<p className='font-bold space-x-1'>${price}</p> <p>x</p>{' '}
							<p className='font-semibold'>{orderCount}</p>
						</span>
					</div>
				</div>
				<p className='text-base py-4 font-light'>{name}</p>
			</div>
		</>
	);
};

const CollapseTitle = ({ title, number }) => {
	return (
		<span className='flex items-center'>
			<p className='bg-primary pt-1 text-xs text-white text-center align-middle mr-2 px-1 rounded-full w-6 h-6'>
				{number}
			</p>
			<Text strong className='text-lg font-extrabold'>
				{title}
			</Text>
		</span>
	);
};

const CollapseItem = ({
	deliveryAddress,
	lonLat,
	deliveryAddressList,
	shippingAddressId,
	setShippingAddressId,
	getShipAddressById
}) => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		getShipAddressById(shippingAddressId);
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<Row>
			<Col
				style={{ backgroundColor: '#EDF2F7' }}
				className='px-3 justify-between flex items-start mx-1 w-full rounded-md py-4'
			>
				<span>
					<p className='text-base pb-1'>Contactless Delivery</p>
					<p className='text-xs pt-1'>Be safe, the rider will place your order at your door</p>
				</span>
				<Switch size='small' className='mt-2 ml-2' />
			</Col>
			<Col className='mx-1 py-4 w-full felx flex-col'>
				<Text strong>Delivery Time</Text>
				<div className='mt-4 rounded-md w-full' style={{ backgroundColor: '#EDF2F7' }}>
					<DatePicker
						popupStyle={{ textAlign: 'center' }}
						picker={'date'}
						className='text-center w-full placeholder-gray-900 bg-red-500 py-4'
						suffixIcon={<IoIosArrowDown className='font-bold text-xl text-black' />}
						bordered={false}
						placeholder='Delivery time'
					/>
				</div>
				<div className='mt-7 rounded-md w-full' style={{ backgroundColor: '#EDF2F7' }}>
					<Select
						allowClear
						optionFilterProp={'children'}
						bordered={false}
						showArrow={true}
						suffixIcon={<IoIosArrowDown className='text-black text-xl' />}
						className='w-full py-2 text-sm'
						size='large'
						placeholder='Select Delivery type'
					>
						<Option value='1'>ASAP</Option>
						<Option value='2'>Today</Option>
						<Option value='3'>Tomorrow</Option>
						<Option value='4'>Specify other?!</Option>
					</Select>
				</div>
			</Col>
			<Col className='pt-3 mx-1 w-full'>
				<Text strong>Delivery Address</Text>
				<iframe
					src={lonLat}
					width='400'
					height='300'
					allowFullScreen=''
					loading='lazy'
					className='rounded-xl w-full mt-5'
				></iframe>
				{/* <img src="/images/maps.png" className="rounded-xl w-full" /> */}
				<span className='flex pt-6 items-center justify-between'>
					<p className='w-3/6'>{deliveryAddress}</p>
					<Button className='rounded-lg py-4 px-2 flex items-center' type='ghost' onClick={showModal}>
						<AiFillEdit className='mr-1' /> Change
					</Button>
					<ShippingAddressListModal
						isModalVisible={isModalVisible}
						handleOk={handleOk}
						handleCancel={handleCancel}
						deliveryAddressList={deliveryAddressList}
						shippingAddressId={shippingAddressId}
						setShippingAddressId={setShippingAddressId}
					/>
				</span>
			</Col>
			<Col className='w-full pt-4 mx-1'>
				<Input
					placeholder='Apartment #'
					bordered={false}
					className='py-4 rounded-md w-full'
					style={{ backgroundColor: '#EDF2F7' }}
				/>
			</Col>
			<Col className='w-full pt-4 mx-1'>
				<Input.TextArea
					placeholder='Note to chef or rider'
					bordered={false}
					className='py-5 rounded-md w-full'
					style={{ backgroundColor: '#EDF2F7' }}
				/>
			</Col>
			<p className='mx-1 py-3 select-none cursor-pointer bg-primary px-5 text-white font-bold mt-6 rounded-xl'>
				Submit
			</p>
		</Row>
	);
};

const { Text } = Typography;
const { Option } = Select;
function Payments() {
	const [session, loading] = useSession();
	const dispatch = useDispatch();
	const [basketData, setBasketData] = useState({});
	const [subTotal, setSubTotal] = useState(0.0);
	const [total, setTotal] = useState(0.0);
	const [deliveryFee, setDeliveryFee] = useState(0.0);
	const [shippingAddress, setShippingAddress] = useState({});
	const [shippingAddressList, setShippingAddressList] = useState([]);
	const [lonLat, setLonLat] = useState('');
	const [userInfo, setUserInfo] = useState({});
	const [dataFlag, setDataFlag] = useState(false);
	const [shippingAddressId, setShippingAddressId] = useState(null);

	const deliveryType = 'user';

	useEffect(async () => {
		if (!dataFlag) {
			let basket = await dispatch(getUserBasket(deliveryType));
			setBasketData(basket);
			setSubTotal(basket.sub_total);
			setTotal(basket.total);
			setDeliveryFee(basket.delivery_fee);
			let address =
				basket.shippingAddress.addressLine1 +
				' ' +
				basket.shippingAddress.addressLine2 +
				' ' +
				basket.shippingAddress.city +
				' ' +
				basket.shippingAddress.state +
				' ' +
				basket.shippingAddress.zipCode;
			setShippingAddress(address);
			setShippingAddressId(basket.shippingAddress.id);

			let lonLat =
				'https://maps.google.com/maps?q=' +
				basket.shippingAddress.lat +
				', ' +
				basket.shippingAddress.lon +
				'&z=15&output=embed';
			setLonLat(lonLat);
			let userDetail = await dispatch(getUserInfo());
			console.log('userDetail: ', userDetail.data);
			setUserInfo(userDetail.data);
			setShippingAddressList(userDetail.data.address);
			setDataFlag(true);
		}
	}, []);

	const getShipAddressById = async shipAddressId => {
		let shippingAddress = await dispatch(getShippingAddressById(shipAddressId));
		shippingAddress = shippingAddress.data;
		let address =
			shippingAddress.addressLine1 +
			' ' +
			shippingAddress.addressLine2 +
			' ' +
			shippingAddress.city +
			' ' +
			shippingAddress.state +
			' ' +
			shippingAddress.zipCode;
		setShippingAddress(address);

		let lonLat =
			'https://maps.google.com/maps?q=' + shippingAddress.lat + ', ' + shippingAddress.lon + '&z=15&output=embed';
		setLonLat(lonLat);
	};

	return (
		<div>
			<AppHead title='Cheffy - Checkout' />
			<FoodHeader />
			<Row
				className='w-full bg-fixed bg-cover bg-no-repeat bg-center relative mt-20 md:mt-12'
				style={{
					backgroundImage: `url(/images/payments.jpg)`,
					height: '40vh',
					backgroundSize: 'cover',
					filter: 'brightness(30%)'
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
				<Col span={32} className='lg:px-36'>
					<Text strong className='block text-center text-white text-3xl'>
						Payments
					</Text>
					<div className='flex flex-row items-center justify-center mt-2'>
						<Text className='ml-3 text-white text-center lg:px-32'>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
							been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
							galley of type and scrambled it to make a type specimen book.
						</Text>
					</div>
				</Col>
			</Row>
			{!dataFlag ? (
				<>
					<div className='flex pt-20 flex-col items-center justify-center'>
						<p className='text-3xl'>Loading</p>
						<VscLoading className='text-4xl animate-spin' />
					</div>
				</>
			) : (
				<>
					<Row gutter={32} className='pt-16 px-10 md:px-32'>
						<Col className='w-10/12 lg:w-5/12 lg:mx-16'>
							<Divider className='m-2' />
							<div className='bg-white'>
								<Collapse
									className='bg-white'
									defaultActiveKey='1'
									collapsible='header'
									bordered={false}
									expandIconPosition={'right'}
									expandIcon={panelProps => {
										if (panelProps.isActive) {
											return (
												<Text>
													<AiOutlineMinus className='text-xl' fontWeight='bold' />
												</Text>
											);
										} else {
											return (
												<Text>
													<AiOutlinePlus className='text-xl' fontWeight='bold' />
												</Text>
											);
										}
									}}
								>
									<Collapse.Panel
										key='1'
										header={<CollapseTitle title={'Delivery Details'} number={'1'} />}
									>
										<CollapseItem
											deliveryAddress={shippingAddress}
											deliveryAddressList={shippingAddressList}
											shippingAddressId={shippingAddressId}
											setShippingAddressId={setShippingAddressId}
											lonLat={lonLat}
											getShipAddressById={getShipAddressById}
										/>
									</Collapse.Panel>
									<Collapse.Panel
										key='2'
										collapsible='header'
										header={<CollapseTitle title={'Personal Details'} number={'2'} />}
									>
										<Form>
											<div className='mt-1'>
												<label for='name' style={{ fontSize: '16px' }}>
													Name:
												</label>
												<Input
													disabled
													className='w-100 py-4 px-3 mt-1 text-lg font-normal'
													value={userInfo.name}
													name='name'
													bordered={false}
													style={{
														backgroundColor: '#EDF2F7',
														borderRadius: '10px'
													}}
												/>
											</div>
											<div className='mt-5'>
												<label for='email' style={{ fontSize: '16px' }}>
													Email:
												</label>
												<Input
													disabled
													type='email'
													className='w-100 py-4 px-3 mt-1 text-lg font-normal'
													value={userInfo.email}
													name='email'
													bordered={false}
													style={{
														backgroundColor: '#EDF2F7',
														borderRadius: '10px'
													}}
												/>
											</div>
											<div className='mt-5'>
												<label for='phone' style={{ fontSize: '16px' }}>
													Phone:
												</label>
												<Input
													disabled
													type='text'
													className='w-100 py-4 px-3 mt-1 text-lg font-normal'
													value={userInfo.phone_no}
													name='phone'
													bordered={false}
													style={{
														backgroundColor: '#EDF2F7',
														borderRadius: '10px'
													}}
												/>
											</div>
										</Form>
									</Collapse.Panel>
									<Collapse.Panel
										key='3'
										collapsible='header'
										header={<CollapseTitle title={'Payment'} number={'3'} />}
									>
										<App />
									</Collapse.Panel>
								</Collapse>
							</div>
						</Col>
						<Col className='w-10/11 md:w-5/12 md:ml-0 ml-2'>
							<div className='pt-6'>
								<Text className='font-light text-lg'>Your order</Text>
								<div className='pt-10'>
									{basketData.items.map((basket, index) => {
										return (
											<>
												<Item
													key={index}
													basketItemId={basket.basketItemId}
													plateID={basket.plate.id}
													name={basket.plate.name}
													price={basket.total_value}
													orderCount={basket.quantity}
												/>
											</>
										);
									})}

									<hr />
									<div className='pt-4 pb-2 cart-info '>
										<div className='flex cart-info justify-between pt-1'>
											<div className='cart-total order-last'>
												<p className='font-normal text-base'>${subTotal.toFixed(2)}</p>
											</div>
											<span className='font-normal text-lg'>Subtotal</span>
										</div>
									</div>
									<div className='py-2 cart-info '>
										<div className='flex cart-info justify-between pt-1'>
											<div className='cart-total order-last'>
												<p className='font-normal text-base'>${deliveryFee.toFixed(2)}</p>
											</div>
											<span className='font-normal text-lg'>Delivery fee</span>
										</div>
									</div>
									<div className='pt-2 pb-4 cart-info '>
										<div className='flex cart-info justify-between pt-1'>
											<div className='cart-total order-last'>
												<p className='font-bold  text-base'>${total.toFixed(2)}</p>
											</div>
											<span className='font-bold text-lg'>Total</span>
										</div>
									</div>
									<div className='flex flex-row-reverse checkout-btn cursor-pointer'>
										<p className='py-4 px-10 text-center bg-red-500 text-white font-semibold'>
											Checkout &#8594;
										</p>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</>
			)}

			{/* <div className="flex flex-col md:flex-row pt-16 items-center justify-center w-9/12 mx-auto">
        <section className="md:w-4/6 w-5/6 md:pl-16 pl-4">
          <Divider className="m-2" />
          <div className="bg-white">
            <Collapse
              className="bg-white"
              defaultActiveKey="1"
              collapsible="header"
              bordered={false}
              expandIconPosition={"right"}
              expandIcon={(panelProps) => {
                if (panelProps.isActive) {
                  return (
                    <Text>
                      <AiOutlineMinus className="text-xl" fontWeight="bold" />
                    </Text>
                  );
                } else {
                  return (
                    <Text>
                      <AiOutlinePlus className="text-xl" fontWeight="bold" />
                    </Text>
                  );
                }
              }}
            >
              <Collapse.Panel
                key="1"
                header={
                  <CollapseTitle title={"Delivery Details"} number={"1"} />
                }
              >
                <CollapseItem />
              </Collapse.Panel>
              <Collapse.Panel
                key="2"
                collapsible="header"
                header={
                  <CollapseTitle title={"Personal Details"} number={"2"} />
                }
              >
                <h1>Personal Details</h1>
              </Collapse.Panel>
              <Collapse.Panel
                key="3"
                collapsible="header"
                header={<CollapseTitle title={"Payment"} number={"3"} />}
              >
                <h1>Payment</h1>
              </Collapse.Panel>
            </Collapse>
          </div>
        </section>
      </div>
      <div>
        fuck
      </div> */}
			<FoodFooter />
		</div>
	);
}

export default Payments;
