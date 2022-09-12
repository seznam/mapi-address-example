import { useState } from 'react';
import { IFormData, ISuggestedItem } from '~/interfaces';
import StepSuggest from '~/components/StepSuggest';
import StepForm from '~/components/StepForm';

export default function App() {
	const [activeStep, setActiveStep] = useState(1);
	const [suggestedItem, setSuggestedItem] = useState<ISuggestedItem>(null);
	const [formData, setFormData] = useState<IFormData>({
		street: '',
		houseNumber: '',
		municipality: '',
		zip: '',
		country: '',
	});
	const onSelected = (suggestion: ISuggestedItem) => {
		setSuggestedItem(suggestion);
		setFormData({
			street: suggestion.regionalStructure.find(region => region.type === 'regional.street')?.name || '',
			houseNumber: suggestion.regionalStructure.find(region => region.type === 'regional.address')?.name || '',
			municipality: suggestion.regionalStructure.find(region => region.type === 'regional.municipality')?.name || '',
			zip: suggestion.zip || '',
			country: suggestion.regionalStructure.find(region => region.type === 'regional.country')?.name || '',
		});
		setActiveStep(2);
	};

	return <main>
		<h1>Krok {activeStep}</h1>
		{activeStep === 1 ? <StepSuggest onSelected={onSelected} /> : null}
		{activeStep === 2 ? <StepForm formData={formData} setFormData={setFormData} onPrevious={() => setActiveStep(1)} onNext={() => setActiveStep(3)} /> : null}
		<h2>SuggestedItem</h2>
		<pre>{JSON.stringify(suggestedItem, undefined, 2)}</pre>
		<h2>FormData</h2>
		<pre>{JSON.stringify(formData, undefined, 2)}</pre>
	</main>;

	/*
	{activeStep === 3 ? <StepInvalidAddress formData={formData} /> : null}
	{activeStep === 4 ? <StepSummary parts={addressParts} formData={formData} /> : null}
	*/
}
