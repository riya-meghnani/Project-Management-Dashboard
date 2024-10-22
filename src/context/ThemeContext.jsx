import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
    theme: 'light'
})


const ThemeContextProvider = ({children}) => {
    const[theme, setTheme] = useState('light');
    const toggleTheme = () => {
        if(theme == 'light'){
            setTheme('dark');
        }
        else{
            setTheme('light')
        }
    }
    useEffect(() => {
        document.body.className = theme; // Apply the theme to the body
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, toggleTheme:toggleTheme}}>
          {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;