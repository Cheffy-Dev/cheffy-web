import React from 'react';
import Dropzone from 'react-dropzone';
import '../../../../styles/chefPlateAdd.css';

const UploadFile = ({ onUpload }) => {
	const renderDragMessage = (isDragActive, isDragReject) => {
		if (!isDragActive) {
			return <p className='dropMessage default'> Drag your photo or click here </p>;
		}

		if (isDragReject) {
			return <p className='dropMessage error'> Unsupported file </p>;
		}

		return <p className='dropMessage success'> Drop a photo here </p>;
	};

	return (
		<Dropzone accept='image/*' onDropAccepted={onUpload}>
			{({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
				<div
					{...getRootProps()}
					className={
						isDragReject ? 'dropContainer reject' : isDragActive ? 'dropContainer active' : 'dropContainer'
					}
				>
					<input {...getInputProps()} />
					{renderDragMessage(isDragActive, isDragReject)}
				</div>
			)}
		</Dropzone>
	);
};

export default UploadFile;
