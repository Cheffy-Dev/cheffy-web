import React from 'react';
import KitchenFooter from './KitchenFooter';
import KitchenHeader from './KitchenHeader';

export class KitchenLayout extends React.Component {
	render() {
		const { children } = this.props;
		return (
			<>
				<KitchenHeader />
				<div className='mx-auto'>{children}</div>
				<KitchenFooter />
			</>
		);
	}
}
