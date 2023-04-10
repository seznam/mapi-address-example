import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IFormData, IResponseItem } from '~/interfaces';
import { runGeocode, runSuggest } from '~/util';
import './styles.less';

interface IStepCheckProps {
	lang: string;
	formData: IFormData;
	setFinalResult: Dispatch<SetStateAction<IResponseItem>>;
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

	return <div className="stepCheck">
		{geocode
			? <>
				<p>Pozor, tuto adresu nedokážeme dohledat.</p>
				<div className="toolbar">
					<button type="button" onClick={onPrevious} className="primary">Zpět na zadání</button>
					<button type="button" onClick={onNext}>Pokračovat, adresa je určitě správně</button>
				</div>
				{suggestions.length > 0
					? <>
						<h3>Nemysleli jste náhodou:</h3>
						<ul className="stepCheck__list">
							{suggestions.map(item => <li key={item.label + item.position.lon + item.position.lat} className="stepCheck__suggestion">
								{item.name} ({item.location})
								<button type="button" onClick={() => {
									setFinalResult(item);
									onNext();
								}}>Vybrat</button>
							</li>)}
						</ul>
					</>
					: null}
			</>
			: <progress />}
	</div>;
}
