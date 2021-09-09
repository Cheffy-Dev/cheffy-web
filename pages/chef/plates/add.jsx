import React from 'react';
import { ChefLayout } from '../../../src/components/Layouts/chef';
import ProtectedChef from '../../../src/components/Layouts/chef/ProtectedChef';
import PlateAdd from '../../../src/components/Layouts/chef/plates'

const AddPlate = (props) => {
	return (
		<div className="min-h-screen px-10 pt-28 pb-10 bg-gray-100">
			<p className="text-center text-xl font-semibold text-black pb-6">Add New Plates</p>
			<PlateAdd />
		</div>
	);
};

// const AddPlateComponent = ProtectedChef(AddPlate);
AddPlate.Layout = ChefLayout;
export default AddPlate;
