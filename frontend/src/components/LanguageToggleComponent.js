import React from "react";
import {withLocalize} from "react-localize-redux";
import {Button} from 'reactstrap';

const LanguageToggle = ({languages, activeLanguage, setActiveLanguage}) => {
    const getClass = (languageCode) => {
        return languageCode === activeLanguage.code ? 'active' : ''
    };

    return (
        <div className="row ml-auto">
            {languages.map(lang => (
                <div key={lang.code} className="m-1">
                    <Button color="info" className={getClass(lang.code)} onClick={() => setActiveLanguage(lang.code)}>
                        {lang.name}
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default withLocalize(LanguageToggle);