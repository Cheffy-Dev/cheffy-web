import { Button, Form, Input } from 'antd';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFileUpload } from 'react-icons/fa';

function ChefPlatesComponent() {
	const [selectedFile, setSelectedFile] = useState();

	const onDrop = useCallback(
		acceptedFiles => {
			const file = acceptedFiles[0];

			const fileUrl = URL.createObjectURL(file);

			setSelectedFile(fileUrl);
		},
		[selectedFile]
	);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: 'image/*'
	});

	return (
		<div className='pt-4 outline-none'>
			<Form action=''>
				<Input
					type='text'
					className='border-none'
					required
					placeholder='Name of the food'
					style={{
						backgroundColor: '#EDF2F7',
						height: 76,
						marginBottom: 24,
						borderBottom: '2px solid #A0AEC0'
					}}
				/>
				<Input
					type='text'
					className='border-none'
					required
					placeholder='Food description'
					style={{
						backgroundColor: '#EDF2F7',
						height: 96,
						marginBottom: 14,
						borderBottom: '2px solid #A0AEC0'
					}}
				/>
				<p className='flex flex-col md:flex-row md:items-center'>
					<img src='/images/warning.svg' alt='' style={{ marginRight: 6 }} />
					If your description contains YouTube links, the videos will be shown below the description
				</p>
				<div
					className='text-center'
					style={{
						display: 'grid',
						gridTemplateColumns: '2fr 2fr 1fr 2fr',
						gap: 16,
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: 19
					}}
				>
					<Input
						type='text'
						className='border-none inline-block'
						required
						placeholder='Price'
						style={{
							backgroundColor: '#EDF2F7',
							height: 76,
							borderBottom: '2px solid #A0AEC0'
						}}
					/>
					<Input
						type='time'
						className='border-none inline-block'
						required
						placeholder='Time'
						style={{
							backgroundColor: '#EDF2F7',
							height: 76,
							borderBottom: '2px solid #A0AEC0'
						}}
					/>
					<span>to</span>
					<Input
						type='time'
						className='border-none inline-block'
						required
						placeholder='Time'
						style={{
							backgroundColor: '#EDF2F7',
							height: 76,
							borderBottom: '2px solid #A0AEC0'
						}}
					/>
					<p className='flex flex-col md:flex-row md:items-center'>
						<img src='/images/warning.svg' alt='' style={{ marginRight: 6 }} />
						For example 20min to 30min.
					</p>
				</div>
				<div
					className='dropzone flex flex-col md:flex-row md:items-center justify-center flex-direction-column'
					{...getRootProps()}
					style={{
						backgroundColor: '#EDF2F7',
						minHeight: 200,
						border: '3px dashed #A0AEC0',
						marginTop: 16
					}}
				>
					<input {...getInputProps()} accept='image/*' />

					{selectedFile ? (
						<img src={selectedFile} alt='Point thumbnail' />
					) : (
						<p>
							<FaFileUpload style={{ width: '100%', fontSize: 30, marginBottom: 16 }} />
							Drag and drop your plate pictures here
						</p>
					)}
				</div>
				<Button type='primary' block danger style={{ height: 76, marginTop: 24 }}>
					Add a plate
				</Button>
			</Form>
		</div>
	);
}

export default ChefPlatesComponent;
