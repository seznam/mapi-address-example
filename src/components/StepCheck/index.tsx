import { useEffect, useState } from 'react';
import { IFormData, IResponseItem } from '~/interfaces';
import { runGeocode, runSuggest } from '~/util';

interface IStepCheckProps {
	lang: string;
	formData: IFormData;
	setFinalResult: React.Dispatch<React.SetStateAction<IResponseItem>>;
	onPrevious: () => void;
	onNext: () => void;
}

export default function StepCheck({
	lang,
	formData,
	setFinalResult,
	onPrevious,
	onNext,
}: IStepCheckProps) {
	const [geocode, setGeocode] = useState<Array<IResponseItem>>();
	const [suggestions, setSuggestions] = useState<Array<IResponseItem>>([]);

	useEffect(() => {
		runGeocode(lang, formData, setGeocode);
	}, [lang]);

	useEffect(() => {
		if (geocode) {
			if (geocode.length === 1) {
				setFinalResult(geocode[0]);
				onNext();
			} else {
				runSuggest(lang, `${formData.street} ${formData.houseNumber}, ${formData.city}, ${formData.zip}, ${formData.country}`, setSuggestions);
			}
		}
	}, [geocode, lang]);

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
