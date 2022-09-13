import { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { IResponseItem } from '~/interfaces';
import { runSuggest } from '~/util';

function renderSuggestion(suggestion: IResponseItem) {
	return <div>
		{suggestion.name}
		<br />
		<span className="location">{suggestion.location}</span>
	</div>;
}

function getSuggestionValue(suggestion: IResponseItem) {
	return suggestion.name;
}

interface IStepSuggestProps {
	lang: string;
	onSelected: any;
}

export default function StepSuggest({
	lang,
	onSelected,
}: IStepSuggestProps) {
	const [suggestions, setSuggestions] = useState<Array<IResponseItem>>([]);
	const [value, setValue] = useState('');

	const handleInputChange = function (event: React.ChangeEvent<HTMLInputElement>) {
		setValue(event.target.value);
	};

	const onSuggestionsFetchRequested = function ({ value: query }: { value: string }) {
		runSuggest(lang, query, setSuggestions);
	};

	const onSuggestionsClearRequested = function () {
		setSuggestions([]);
	};

	const onSuggestionSelected = function (_event: any, { suggestion }: { suggestion: IResponseItem }) {
		setValue(getSuggestionValue(suggestion));
		onSelected(suggestion);
	};

	return <div>
		<Autosuggest
			suggestions={suggestions}
			onSuggestionsFetchRequested={onSuggestionsFetchRequested}
			onSuggestionsClearRequested={onSuggestionsClearRequested}
			getSuggestionValue={getSuggestionValue}
			renderSuggestion={renderSuggestion}
			onSuggestionSelected={onSuggestionSelected}
			inputProps={{
				value,
				onChange: handleInputChange,
			}}
		/>
		<button onClick={() => onSelected(null)}>Zadat adresu ručně</button>
	</div>;
}
