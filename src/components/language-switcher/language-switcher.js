import React from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const LanguageSwither = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (value) => {
        i18n.changeLanguage(value);
    }

    return (
        <Select
        className="languageSwither"
        defaultValue={i18n.language}
        onChange={changeLanguage} >
            <Option value='en'>Eng</Option>
            <Option value='ru'>Рус</Option>
        </Select>
    )
}

export default LanguageSwither;