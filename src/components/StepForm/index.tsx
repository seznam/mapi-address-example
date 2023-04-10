import { IFormData } from '~/interfaces';
import './styles.less';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface IStepFormProps {
	formData: IFormData;
	setFormData: Dispatch<SetStateAction<IFormData>>;
	onPrevious: () => void;
	onNext: () => void;
}

export default function StepForm({
	formData,
	setFormData,
	onPrevious,
	onNext,
}: IStepFormProps) {
	const onChange = function (event: ChangeEvent<HTMLInputElement>) {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	return <div className="stepForm">
		<div className="stepForm__form">
			<label className="stepForm__label">
				<span>Ulice</span>
				<input name="street" value={formData.street} onChange={onChange} />
			</label>
			<label className="stepForm__label stepForm__houseNumber">
				<span>Číslo domu</span>
				<input name="houseNumber" value={formData.houseNumber} onChange={onChange} />
			</label>
			<label className="stepForm__label">
				<span>Město/obec</span>
				<input name="city" value={formData.city} onChange={onChange} />
			</label>
			<label className="stepForm__label stepForm__zip">
				<span>PSČ</span>
				<input name="zip" value={formData.zip} onChange={onChange} autoComplete="postal-code" />
			</label>
			<label className="stepForm__label stepForm__country">
				<span>Stát</span>
				<input name="country" value={formData.country} onChange={onChange} autoComplete="country-name" />
			</label>
		</div>
		<div className="toolbar">
			<button type="button" onClick={onPrevious}>Zpět</button>
			<button type="button" onClick={onNext} className="primary">Potvrdit adresu</button>
		</div>
	</div>;
}
