import { createContext, useState } from "react"

const ThemeContext = createContext();
const AuthContext = createContext();


export function ThemeProvider  ({children}){
  const [theme, setTheme] = useState('light');

  const toggleTheme = ()=>{
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }
}

function ThemeToggler() {
  return (
    <div>ThemeToggler</div>
  )
}

export default ThemeToggler