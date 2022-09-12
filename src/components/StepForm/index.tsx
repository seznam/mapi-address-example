import React, { useState } from 'react';
import { IFormData } from '~/interfaces';

interface IStepFormProps {
	formData: IFormData;
	setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
	onPrevious: () => void;
	onNext: () => void;
}

export default function StepForm({
	formData,
	setFormData,
	onPrevious,
	onNext,
}: IStepFormProps) {
	const onChange = function(event: React.ChangeEvent<HTMLInputElement>) {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	}

	return <div>
		<label>
			<span>Ulice</span>
			<input name="street" value={formData.street} onChange={onChange} />
		</label>
		<label>
			<span>Číslo domu</span>
			<input name="houseNumber" value={formData.houseNumber} onChange={onChange} />
		</label>
		<label>
			<span>Město/obec</span>
			<input name="municipality" value={formData.municipality} onChange={onChange} />
		</label>
		<label>
			<span>PSČ</span>
			<input name="zip" value={formData.zip} onChange={onChange} />
		</label>
		<label>
			<span>Stát</span>
			<input name="country" value={formData.country} onChange={onChange} />
		</label>
		<button onClick={onPrevious}>Zpět</button>
		<button onClick={onNext}>Potvrdit adresu</button>
	</div>;
}
