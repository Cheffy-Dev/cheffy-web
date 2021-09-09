import Login from '../../src/components/auth/login';
import { KitchenLayout } from '../../src/components/Layouts/kitchen/KitchenLayout';

const ChefLogin = () => {
	return (
		<>
			<div className='py-10 min-h-screen'>
				<Login userType={`Kitchen`} callbackUrl={`${process.env.NEXT_PUBLIC_URL}/kitchen`} />
			</div>
		</>
	);
};

ChefLogin.Layout = KitchenLayout;

export default ChefLogin;
