import { Menu } from 'antd';
import { signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import React from 'react';

const menu = (
	<Menu className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5'>
		<Menu.Item key='0'>
			<Link href='/chef/profile'>
				<a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' role='menuitem'>
					Your Profile
				</a>
			</Link>
		</Menu.Item>
		<Menu.Item key='0'>
			<Link href='/chef'>
				<a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' role='menuitem'>
					Dashboard
				</a>
			</Link>
		</Menu.Item>
		<Menu.Item key='0'>
			<Link href='/chef/orders'>
				<a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' role='menuitem'>
					Orders
				</a>
			</Link>
		</Menu.Item>
		<Menu.Item key='0'>
			<Link href='/chef/plates'>
				<a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' role='menuitem'>
					Plates
				</a>
			</Link>
		</Menu.Item>
		<Menu.Item key='1'>
			<a
				href='#'
				className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
				role='menuitem'
				onClick={e => {
					e.preventDefault();
					signOut();
				}}
			>
				Sign out
			</a>
		</Menu.Item>
	</Menu>
);

const FoodDetailHeader = props => {
	const [session, loading] = useSession();

	return (
		<nav className='stickey bg-white dark:bg-gray-800 shadow'>
			<div className='mx-auto px-28 py-4'>
				<div className=''>
					<div className='flex justify-between items-center'>
						<div className='cursor-pointer'>
							<Link href='/'>
								<img src='/images/logo.jpg' />
							</Link>
						</div>
						<div className='flex flex-col -mx-4 md:flex-row md:items-center md:mx-8'>
							<Link href='/about'>
								<a>About</a>
							</Link>

							<Link href='/about'>
								<a className='mx-2 mt-2 md:mt-0 px-2 py-1 text-sm rounded-md'>Contact us</a>
							</Link>
							<Link href='/about'>
								<a className='mx-2 mt-2 md:mt-0 px-2 py-1 text-sm rounded-md'>Get the App</a>
							</Link>
							<Link href='/about'>
								<a className='mx-2 mt-2 md:mt-0 px-2 py-1 text-sm rounded-md'>Login</a>
							</Link>
							<Link href='/about'>
								<a className='mx-2 mt-2 md:mt-0 px-2 py-1 text-sm rounded-md'>Sign up</a>
							</Link>
						</div>
						{/* Mobile menu button */}
						<div className='flex'>
							{/* <div className="flex md:hidden"> */}
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
				</div>
			</div>
		</nav>
	);
};

export default FoodDetailHeader;
