import React from 'react';
import { LANGS } from '~/constants';

interface ISettingsProps {
	lang: string;
	setLang: React.Dispatch<React.SetStateAction<string>>;
}

export default function Settings({
	lang,
	setLang,
}: ISettingsProps) {
	const onLangChange = function(event: React.ChangeEvent<HTMLSelectElement>) {
		setLang(event.target.value);
	}

	return <div>
		<select onChange={onLangChange}>
			{LANGS.map(language => <option value={language.value} key={language.value} selected={lang === language.value}>{language.title}</option>)}
		</select>
	</div>;
}
