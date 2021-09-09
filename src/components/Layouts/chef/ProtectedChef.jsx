import { Skeleton } from 'antd';
import { useSession } from 'next-auth/client';
import Router from 'next/router';
import React from 'react';

const ProtectedChef = WrappedComponent => () => {
	const [session, loading] = useSession();
	if (loading) return <Skeleton />;
	if (!(session && session.role == 'chef')) {
		Router.push('chef/login');
		return <p>Access Denied</p>;
	}
	return <WrappedComponent session={session} />;
};

export default ProtectedChef;
