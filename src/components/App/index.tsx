import { useState } from 'react';
import { ISuggestedItem } from '~/interfaces';
import StepSuggest from '~/components/StepSuggest';

export default function App() {
	const [activeStep, setActiveStep] = useState(1);
	const [addressParts, setAddressParts] = useState<ISuggestedItem>(null);
	const [formData, setFormData] = useState();
	const onSelected = (suggestion: ISuggestedItem) => {
		setAddressParts(suggestion);
		setActiveStep(2);
	};

	return <main>
		<h1>Krok {activeStep}</h1>
		{activeStep === 1 ? <StepSuggest onSelected={onSelected} /> : null}
		<pre>{JSON.stringify(addressParts, undefined, 2)}</pre>
	</main>;

	/*
	{activeStep === 2 ? <StepForm suggestedParts={addressParts} /> : null}
	{activeStep === 3 ? <StepInvalidAddress formData={formData} /> : null}
	{activeStep === 4 ? <StepSummary parts={addressParts} formData={formData} /> : null}
	*/
}
