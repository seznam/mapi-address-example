import { Value } from 'maplibre-gl';
import { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { API_KEY, API_URL } from '~/constants';
import { ISuggestedItem } from '~/interfaces';

function renderSuggestion(suggestion: ISuggestedItem) {
	return <div>
		{suggestion.name}
		<br />
		<span className="label">{suggestion.label}</span>
		<br />
		<span className="location">{suggestion.location}</span>
	</div>;
}

function getSuggestionValue(suggestion: ISuggestedItem) {
	return suggestion.name;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function shouldRenderSuggestions(value: string) {
	return value.trim().length > 2;
}

interface IStepSuggestProps {
	onSelected: any;
}

export default function StepSuggest({
	onSelected,
}: IStepSuggestProps) {
	const [suggestions, setSuggestions] = useState([]);
	const [value, setValue] = useState('');

	const handleInputChange = function (event: React.ChangeEvent<HTMLInputElement>) {
		setValue(event.target.value);
	};

	// eslint-disable-next-line @typescript-eslint/no-shadow
	const onSuggestionsFetchRequested = function ({ value }: { value: string }) {
		async function runSuggest() {
			try {
				const url = new URL(`${API_URL}suggest`);

				url.searchParams.set('apikey', API_KEY);
				url.searchParams.set('query', value);

				const response = await fetch(url.toString(), {
					mode: 'cors',
				});
				const json = await response.json();

				if (json?.items?.length) {
					setSuggestions(json.items);
				} else {
					setSuggestions([]);
				}
			} catch (ex) {
				setSuggestions([]);
			}
		}

		runSuggest();
	};

	const onSuggestionsClearRequested = function () {
		setSuggestions([]);
	};

	const onSuggestionSelected = function (_event: any, { suggestion }: { suggestion: ISuggestedItem }) {
		// eslint-disable-next-line no-console
		console.log('vybrano', suggestion);

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
			shouldRenderSuggestions={shouldRenderSuggestions}
			inputProps={{
				value,
				onChange: handleInputChange,
			}}
		/>
		<button onClick={() => onSelected(null)}>Zadat adresu ručně</button>
	</div>;
}
