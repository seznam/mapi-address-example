import { IFormData, IResponseItem } from '~/interfaces';

interface IStepSummaryProps {
	formData: IFormData;
	finalResult: IResponseItem;
	onRestart: () => void;
}

export default function StepSummary({
	formData,
	finalResult,
	onRestart,
}: IStepSummaryProps) {
	return <div>
		{finalResult
			? <>
				<p>Dle zadání jsme našli tuto adresu.</p>
				<pre>{JSON.stringify(finalResult, undefined, 2)}</pre>
			</>
			: <>
				<p>Uživatel vyplnil následující údaje, ale my takovou adresu nenašli.</p>
				<pre>{JSON.stringify(formData, undefined, 2)}</pre>
			</>}
		<button onClick={onRestart}>Restartovat ukázku</button>
	</div>;
}
