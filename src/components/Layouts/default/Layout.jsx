import React from 'react';

export class Layout extends React.Component {
	render() {
		const { children } = this.props;
		return (
			<>
				{/* <Header /> */}
				{children}
				{/* <Footer /> */}
			</>
		);
	}
}
