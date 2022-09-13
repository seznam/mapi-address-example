import { useState } from 'react';
import { IFormData, IResponseItem } from '~/interfaces';
import StepSuggest from '~/components/StepSuggest';
import StepForm from '~/components/StepForm';
import StepCheck from '~/components/StepCheck';
import { EMPTY_FORM } from '~/constants';
import StepSummary from '~/components/StepSummary';

export default function App() {
	const [activeStep, setActiveStep] = useState(1);
	const [finalResult, setFinalResult] = useState<IResponseItem>(null);
	const [formData, setFormData] = useState<IFormData>(EMPTY_FORM);

	const onSelected = (suggestion: IResponseItem) => {
		setFormData({
			street: suggestion?.regionalStructure?.find(region => region.type === 'regional.street')?.name || '',
			houseNumber: suggestion?.regionalStructure?.find(region => region.type === 'regional.address')?.name || '',
			city: suggestion?.regionalStructure?.find(region => region.type === 'regional.municipality')?.name || '',
			zip: suggestion?.zip || '',
			country: suggestion?.regionalStructure?.find(region => region.type === 'regional.country')?.name || '',
		});
		setActiveStep(2);
	};
	const onRestart = () => {
		setFormData(EMPTY_FORM);
		setFinalResult(null);
		setActiveStep(1);
	}

	return <main>
		<h1>Krok {activeStep}</h1>
		{activeStep === 1 ? <StepSuggest onSelected={onSelected} /> : null}
		{activeStep === 2 ? <StepForm formData={formData} setFormData={setFormData} onPrevious={() => setActiveStep(1)} onNext={() => setActiveStep(3)} /> : null}
		{activeStep === 3 ? <StepCheck formData={formData} setFinalResult={setFinalResult} onPrevious={() => setActiveStep(2)} onNext={() => setActiveStep(4)} /> : null}
		{activeStep === 4 ? <StepSummary formData={formData} finalResult={finalResult} onRestart={onRestart} /> : null}
	</main>;
}
