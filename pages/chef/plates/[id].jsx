import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Pagination, Spin, Rate, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ChefLayout } from '../../../src/components/Layouts/chef';
import ProtectedChef from '../../../src/components/Layouts/chef/ProtectedChef';
import { chefPlates } from '../../../src/redux/actions/chef/chefAction';

const EditPlate = (props) => {
	const router = useRouter();
	const { id: paltId } = router.query;
	return <div className="min-h-screen px-10 py-5">Edit plate : {paltId}</div>;
};

const EditPlateComponent = ProtectedChef(EditPlate);
EditPlateComponent.Layout = ChefLayout;
export default EditPlateComponent;
