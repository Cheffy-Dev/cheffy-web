import { Button, Select } from 'antd';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import React from 'react';

const ChefHeader = props => {
	const { Option } = Select;
	const [session, loading] = useSession();

	return (
		<nav style={{ backgroundColor: '#F7FCFF' }} className='dark:bg-gray-800 stickey'>
			<div className='mx-8 py-4 md:flex md:items-center justify-between'>
				<div>
					<div className='hidden md:flex cursor-pointer'>
						<Link href='/'>
							<img src='/images/logo.jpg' />
						</Link>
					</div>
					<div className='md:hidden cursor-pointer'>
						<Link href='/'>
							<img src='/images/mobile-logo.png' />
						</Link>
					</div>
					{/* Mobile menu button */}
					<div className='flex md:hidden pr-8'>
						<button
							type='button'
							className='text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400'
							aria-label='toggle menu'
						>
							<svg viewBox='0 0 24 24' className='h-6 w-6 fill-current'>
								<path
									fillRule='evenodd'
									d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'
								/>
							</svg>
						</button>
					</div>
				</div>
				<div className='flex flex-col md:flex-row md:items-center'>
					<img src='/images/location.png' alt='location' />
					<Select
						dropdownStyle={{ zIndex: 11 }}
						defaultValue='northern-virginia'
						style={{ width: 180 }}
						bordered={false}
					>
						<Option value='northern-virginia'>Northern Virginia</Option>
						<Option value='richmond'>RichMond</Option>
						<Option value='centreville'>Centreville</Option>
					</Select>
				</div>
				{!session ? (
					<div className='flex flex-col md:flex-row md:items-center'>
						<Button
							icon={
								<div>
									<img className='h-4 w-4' src='/images/create-account.png' alt='create_account' />
								</div>
							}
						>
							Create an Account
						</Button>
						<Button
							icon={
								<div>
									<img className='h-4 w-4' src='/images/sign-in.png' alt='sign_in' />
								</div>
							}
						>
							Sign In
						</Button>
					</div>
				) : (
					<div className='flex flex-col md:flex-row md:items-center'>
						<div className='flex flex-row mr-20'>
							<img src='/images/chef/contact_support.png' alt='help' />
							<p>Help</p>
						</div>
						<div>{session && <img className='h-10 w-10 rounded-md' src={session.user.image} />}</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default ChefHeader;
