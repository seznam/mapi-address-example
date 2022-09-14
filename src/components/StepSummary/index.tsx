import { IFormData, IResponseItem } from '~/interfaces';
import InfoMap from '~/components/InfoMap';
import "./styles.less";

interface IStepSummaryProps {
	lang: string;
	formData: IFormData;
	finalResult: IResponseItem;
	onRestart: () => void;
}

export default function StepSummary({
	lang,
	formData,
	finalResult,
	onRestart,
}: IStepSummaryProps) {
	return <div className="stepSummary">
		{finalResult
			? <>
				<p>Dle zadání jsme našli tuto adresu.</p>
				<pre>{JSON.stringify(finalResult, undefined, 2)}</pre>
				<InfoMap lang={lang} longitude={finalResult.position.lon} latitude={finalResult.position.lat} />
			</>
			: <>
				<p>Uživatel vyplnil následující údaje, ale my takovou adresu nenašli.</p>
				<pre>{JSON.stringify(formData, undefined, 2)}</pre>
			</>}
		<div className="toolbar">
			<button onClick={onRestart} className="primary">Restartovat ukázku</button>
		</div>
	</div>;
}
