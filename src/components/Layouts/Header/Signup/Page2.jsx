import { Form } from 'antd';
import React, { useState } from 'react';
import Step1 from './User/Step1';
import Step2 from './User/Step2';
import Step3 from './User/Step3';
 
const Page2 = ({ onClick, customer }) => {
	const [form] = Form.useForm();
	const [currStep, setCurrStep] = useState(0);

	const nextStep = (step = 1) => {
		if (currStep < Object.keys(STEPS).length - 1) setCurrStep(currStep + step);
	};

	const prevStep = () => {
 		if (currStep > 0) setCurrStep(currStep - 1);
	};

	const stepsProps = {
		nextStep,
		prevStep,
		form,
		onClick
	};

	const STEPS = {
		0: <Step1 {...stepsProps} />,
		1: <Step2 {...stepsProps} />,
		2: <Step3 {...stepsProps} />
	};

	return <>{STEPS[currStep]}</>;
};

export default Page2;
