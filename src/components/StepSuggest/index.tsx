import { ChangeEvent, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { IResponseItem } from '~/interfaces';
import { runSuggest } from '~/util';
import './styles.less';

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

function renderSuggestionsContainer({ containerProps, children }: { containerProps: any, children: any }) {
	return <div {...containerProps}>
		{children}
		<div className="stepSuggest__attribution">
			Hledají <a href="https://mapy.cz/" target="_blank" rel="noreferrer"><img src="https://api.mapy.cz/img/api/logo-small.svg" alt="Mapy.cz" /></a>
		</div>
	</div>;
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

	const handleInputChange = function (event: ChangeEvent<HTMLInputElement>) {
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

	return <div className="stepSuggest">
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
				type: 'text',
			}}
			renderSuggestionsContainer={renderSuggestionsContainer}
		/>
		nebo
		<button type="button" onClick={() => onSelected(null)}>Zadat adresu ručně</button>
	</div>;
}
