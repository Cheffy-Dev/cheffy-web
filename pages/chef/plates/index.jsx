import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Pagination, Spin, Rate, Button } from 'antd';
import { AiFillStar } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { FiTruck } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { ChefLayout } from '../../../src/components/Layouts/chef';
import ProtectedChef from '../../../src/components/Layouts/chef/ProtectedChef';
import { chefPlates } from '../../../src/redux/actions/chef/chefAction';

const ChefPlates = (props) => {
	const { plates } = useSelector((state) => state.chef);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	async function getAllPlates() {
		setLoading(true);
		await dispatch(chefPlates({}, props.session.userId));
		setLoading(false);
	}

	useEffect(() => {
		getAllPlates();
	}, []);
	return (
		<div className="min-h-screen px-10 py-5">
			<div className="w-full text-right">
				<Button type="primary" shape="round" className="mb-4">
					<Link href="/chef/plates/add">
						<a>Add New</a>
					</Link>
				</Button>
			</div>
			<Spin spinning={loading}>
				<div className="grid gap-6 grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{plates.data.map((value, index) => (
						<div
							key={index}
							className="bg-white w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden"
						>
							<Link href={`/chef/plates/${value.id}`}>
								<div
									className="cursor-pointer flex items-end justify-end h-44 w-full bg-cover"
									style={{
										backgroundImage: `url("${value.PlateImages[0]?.url}")`,
									}}
								></div>
							</Link>
							<div className="px-5 py-2 flex justify-between">
								<h3 className="uppercase tracking-wide text-sm font-bold text-gray-700">
									{value.name}
								</h3>

								<span className="text-gray-500 font-semibold">${value.price}</span>
							</div>
							<div className="px-4 pb-2 pt-0 flex justify-between items-baseline">
								<span className="flex items-center">
									<AiFillStar className="text-yellow-300" />
									<p className="font-medium text-gray-500 text-sm pl-2">4.5</p>
								</span>
								<span className="flex items-center">
									<BiTimeFive className="text-gray-500" />
									<p className="font-medium text-gray-500 text-sm pl-2">15-20 min</p>
								</span>
								<span className="flex items-center">
									<FiTruck className="text-gray-500" />
									<p className="font-medium text-gray-500 text-sm pl-2">Delivery</p>
								</span>
							</div>
							<div className="px-4 py-2 border-t">
								{/* <div className="text-xs uppercase font-bold text-gray-600 tracking-wide">Chef</div> */}
								<div className="flex items-center pt-1">
									<div
										className="bg-cover bg-center w-10 h-10 rounded-full mr-3"
										style={{
											backgroundImage: `url(${value.chef.imagePath})`,
										}}
									></div>
									<div>
										<p className="font-bold text-gray-900">{value.chef.name}</p>
										<p className="text-sm text-gray-700">{value.chef.phone_no}</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</Spin>
		</div>
	);
};

const ChefPlatesComponent = ProtectedChef(ChefPlates);
ChefPlatesComponent.Layout = ChefLayout;
export default ChefPlatesComponent;
