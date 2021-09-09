import React from 'react';
import { Skeleton } from 'antd';
import Router from 'next/router';
import { useSession } from 'next-auth/client';

const ProtectedKitchen = WrappedComponent => props => {
	const [session, loading] = useSession();
	// console.log("ProtectedChef loading", loading);
	// console.log("ProtectedChef session", session);
	if (loading) return <Skeleton />;
	if (!(session && session.role == 'admin')) {
		Router.push('/kitchen/login');
		return <p>Access Denied</p>;
	}
	return <WrappedComponent session={session} />;
};

export default ProtectedKitchen;
