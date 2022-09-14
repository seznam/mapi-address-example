import React from 'react';
import { LANGS } from '~/constants';
import "./styles.less";

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

	return <div className="settings">
		Odpovědi API budou
		<select onChange={onLangChange} value={lang}>
			{LANGS.map(language => <option value={language.value} key={language.value}>{language.title}</option>)}
		</select>
	</div>;
}
