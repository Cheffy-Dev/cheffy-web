import React, { useEffect, useState } from 'react';
import { Typography, Card, Row, Col, Button, Grid, Input, Space, Divider, Tabs } from 'antd';
import { HomeFilled, MenuOutlined, StarFilled, ClockCircleFilled } from '@ant-design/icons';
import { IoMdArrowDropdown } from "react-icons/io";
import { FaTruckMoving } from "react-icons/fa";
import axiosClient from '../../../utils/axios-config';
import Link from 'next/link';
import { VscLoading } from "react-icons/vsc";
import Image from "next/image";
import Head from 'next/head';
const { Title, Paragraph, Text } = Typography;

const { TabPane } = Tabs;
// {name,rating,count,price,price_type,imgURL}
const PlateCol = ({img_url,name,delivery_time,delivery_type,rating,sell_count}) => {
	return (
		<>
			<div className="category-card">
				<p className="text-white rounded-md text-center bg-repeat-round py-20" style={{
					backgroundImage:`url(${img_url})`,
					backgroundSize: '100%',
					height:"33vh",
					filter:"brightness(70%)"
				}} > 
			</p>
				{/* <Image src={img_url} layout="fill" alt={name}/> */}
				<Text className="text-xl text-black">{name}</Text>
				<span className="flex font-poppins font-normal flex-row justify-between">
				<Text><p className="flex items-center"><StarFilled className="pr-1 text-yellow-500" />{rating ? rating : "0"}</p></Text>
					<Text><p className="flex items-center"><ClockCircleFilled className="pr-1"/> {delivery_time} min</p></Text>
					<Text><p className="flex items-center uppercase"><FaTruckMoving className="pr-1 text-lg"/> {delivery_type}</p></Text>
				</span>
			</div>
		</>
	);
};

const CateGoryPlateComponent = ({categoryID}) => {
	const [plates, setPlates] = useState([]);
    const [category, setCategory] = useState("")
    async function getCategoryContent(){
        let res = await axiosClient.get("/category")
        const d = res.data.filter((item) => item["id"] == categoryID)
        console.log(d[0]);
        return d[0];
    }
	useEffect(async () => {
		try {
            const cat = await getCategoryContent();
            setCategory(cat)
			// const url = `https://mycheffy.herokuapp.com/plate/category/${categoryID}`;
            const url = `/plate/new?city=Centreville`;
			const res = await axiosClient.get(url);
			console.log("requests send")
			console.log(res)
			setPlates(res.data);
		} catch (e) {
			console.log(e);
		}
	}, []);
    const showCategory = (kId) => {
        console.log(kId)
		router.push(`/category/${kId}/plates`)
    }
	return (
		<>
		<Head>
				<title>Popular Near You</title>
		</Head>
		{ plates.length > 0 ?
		<>
			<Row className="mt-20 pt-2 pb-4 mx-auto w-3/5" align="middle">
				<Col span={24} className="flex justify-start items-center">
					<HomeFilled />
					<Text strong className="text-black  ml-4">
					Popular Near You
					</Text>
				</Col>
			</Row>
			<Row
				className="w-full bg-fixed bg-cover bg-no-repeat bg-center relative"
				style={{
					backgroundImage: `url(${category["url"]})`,
					height: '40vh',
					backgroundSize: '100%',
					filter: 'brightness(50%)',
				}}
				justify="center"
				align="middle"
			></Row>
			<Row
				className="absolute w-full"
				style={{ height: '40vh', transform: 'translateY(-100%)' }}
				justify="center"
				align="middle"
			>
				<Col className="block text-white">
					<Text level={1} strong className="block font-poppins text-center text-white text-5xl">
					Popular Near You
                        {/* {category["name"]} */}
					</Text>
                    <Typography.Paragraph className="px-32 pt-2 font-poppins text-center text-white">
                        
                        {/* {category["description"]} */}
                    </Typography.Paragraph>
				</Col>
			</Row>

			<div className="py-20 w-4/5 md:w-3/5 mx-auto">
				<hr />
				<Tabs
					defaultActiveKey={'relavance'}
					className="font-bold"
					size="large"
					direction="rtl"
					moreIcon={<MenuOutlined />}
				>
					<TabPane key="filters" tab="Filters">
						Filters Tab
					</TabPane>
					<TabPane key="ratings" tab="Rating">
						Ratings Tab
					</TabPane>
					<TabPane key="relavance" tab="Relavance">
						<div className="kitchen-item ">
							<Row gutter={[16,16]} className="flex pt-4" dir="ltr">
								{plates &&
									plates.map((item, index) => {
                                        // {console.log(item["PlateImages"][0])}
										return index < 12 && ( 
                                        <Col key={index} className="cursor-pointer" span={8}>
                                            <Link href={`/food-detail/${encodeURIComponent(item["id"])}`}>
											<a>
												<PlateCol sell_count={item["sell_count"]} delivery_time={item["delivery_time"]} delivery_type={item["delivery_type"]} rating={item["rating"]} name={item["name"]} img_url={item["PlateImages"][0]?.url}/>
											</a>
											</Link>
										</Col>
                                         );
									})}
							</Row>
						</div>
                        <div dir="ltr" className="flex items-center justify-center pt-10 load-more">
                            <p className="text-white flex items-center bg-red-500 py-4 px-10 text-lg">Load More <IoMdArrowDropdown className="text-3xl" /></p>
                        </div>
					</TabPane>
				</Tabs>
			</div>
		</> : 
               <>
			   <p className="mt-20 font-poppins flex items-center justify-center flex-col text-3xl py-32">
				<VscLoading className="animate-spin text-5xl mb-5"/> Loading...
			   </p>
			   </>}
		</>
	);
};

export default CateGoryPlateComponent;
