import { Skeleton } from 'antd';
import { useSession } from 'next-auth/client';
import Router from 'next/router';
import React from 'react';

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
