import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem("hajj-language");

        return saved === "ur" ? "ur" : "en";
    });

    useEffect(() => {
        localStorage.setItem("hajj-language", language);
    }, [language]);

    const isUrdu = language === "ur";

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                isUrdu,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error(
            "useLanguage must be used inside LanguageProvider"
        );
    }

    return context;
}