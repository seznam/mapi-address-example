import { useEffect, useState } from 'react';
import { IFormData, IResponseItem } from '~/interfaces';
import { runGeocode, runSuggest } from '~/util';

interface IStepCheckProps {
	formData: IFormData;
	setFinalResult: React.Dispatch<React.SetStateAction<IResponseItem>>;
	onPrevious: () => void;
	onNext: () => void;
}

export default function StepCheck({
	formData,
	setFinalResult,
	onPrevious,
	onNext,
}: IStepCheckProps) {
	const [geocode, setGeocode] = useState<Array<IResponseItem>>();
	const [suggestions, setSuggestions] = useState<Array<IResponseItem>>([]);

	useEffect(() => {
		runGeocode(formData, setGeocode);
	}, []);

	useEffect(() => {
		if (geocode) {
			if (geocode.length === 1) {
				setFinalResult(geocode[0]);
				onNext();
			} else {
				runSuggest(`${formData.street} ${formData.houseNumber}, ${formData.city}, ${formData.zip}, ${formData.country}`, setSuggestions);
			}
		}
	}, [geocode]);

	return <div>
		{geocode
			? <div>
				<p>Pozor, tuto adresu nedokážeme dohledat.</p>
				<button onClick={onPrevious}>Zpět na zadání</button>
				<button onClick={onNext}>Pokračovat, adresa je určitě správně</button>
				{suggestions.length > 0
					? <>
						<p>Nemysleli jste náhodou:</p>
						<ul>
							{suggestions.map(item => <li key={item.label + item.position.lon + item.position.lat}>
								{item.name} ({item.location})
								<button onClick={() => {
									setFinalResult(item);
									onNext();
								}}>Vybrat</button>
							</li>)}
						</ul>
					</>
					: null}
			</div>
			: <progress />}
	</div>;
}
