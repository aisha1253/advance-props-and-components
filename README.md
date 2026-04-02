# ⚛️ React Core Concepts

A complete guide to essential React patterns used in real-world projects.

---

## 📋 Table of Contents

- [Basic Props](#-1-basic-props)
- [Children Props](#-2-children-props)
- [Complex Props](#-3-complex-props)
- [Ref Props](#-4-ref-props)
- [Context API](#-5-context-api)
- [Custom Hooks](#-6-custom-hooks)

---

## 📌 1. Basic Props

Props (short for properties) are how you pass data **from parent to child** components.

```jsx
// ✅ Child Component
function Greeting({ name, age, isLoggedIn }) {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>Age: {age}</p>
      <p>Status: {isLoggedIn ? "Online" : "Offline"}</p>
    </div>
  );
}

// ✅ Parent Component
function App() {
  return (
    <Greeting
      name="Ayesha"
      age={21}
      isLoggedIn={true}
    />
  );
}
```

### Key Points
- Props are **read-only** — never modify them directly
- Use **default values** for optional props:
  ```jsx
  function Greeting({ name = "Guest", age = 0 }) { ... }
  ```
- You can also use **PropTypes** for type checking:
  ```jsx
  import PropTypes from 'prop-types';

  Greeting.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
  };
  ```

---

## 📌 2. Children Props

`children` is a special built-in prop — anything placed **between** a component's opening and closing tags becomes `children`.

```jsx
// ✅ Reusable Card Wrapper
function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// ✅ Usage — anything inside <Card> becomes children
function App() {
  return (
    <Card title="My Profile">
      <p>Name: Ayesha Asghar</p>
      <p>Role: Frontend Developer</p>
      <button>Edit Profile</button>
    </Card>
  );
}
```

### Key Points
- Perfect for **layout components** like modals, cards, wrappers, and sidebars
- `children` can be text, JSX, or even other components
- Check if children exist before rendering:
  ```jsx
  function Card({ children }) {
    if (!children) return null;
    return <div>{children}</div>;
  }
  ```

---

## 📌 3. Complex Props

Props can be **objects**, **arrays**, and **functions** — not just simple strings or numbers.

```jsx
// ✅ Component accepting complex props
function UserProfile({ user, skills, onEdit, onDelete }) {
  return (
    <div className="profile">
      {/* Object prop */}
      <h2>{user.name}</h2>
      <p>{user.email}</p>

      {/* Array prop */}
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      {/* Function props */}
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

// ✅ Usage
function App() {
  const userData = {
    name: "Ayesha Asghar",
    email: "ayesha@example.com",
  };

  const techSkills = ["React.js", "Next.js", "Node.js", "MongoDB"];

  return (
    <UserProfile
      user={userData}
      skills={techSkills}
      onEdit={() => console.log("Edit clicked")}
      onDelete={() => console.log("Delete clicked")}
    />
  );
}
```

### Key Points
- Name function props starting with **`on`** (e.g., `onClick`, `onEdit`, `onSubmit`)
- Use **destructuring** to keep your code clean
- Avoid passing unnecessary props — keep components focused

---

## 📌 4. Ref Props

`useRef` lets you **directly access a DOM element** or **store a mutable value** that doesn't cause re-renders.

### Example 1 — Accessing a DOM Element

```jsx
import { useRef } from "react";

function SearchInput() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus(); // directly focuses the input
  };

  const handleClear = () => {
    inputRef.current.value = ""; // clears input without re-render
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Search city..." />
      <button onClick={handleFocus}>Focus</button>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
}
```

### Example 2 — Forwarding Refs to Child Components

```jsx
import { useRef, forwardRef } from "react";

// ✅ Child — wraps with forwardRef to expose its DOM node
const CustomInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} className="custom-input" />;
});

// ✅ Parent — controls the child's input directly
function App() {
  const inputRef = useRef(null);

  return (
    <div>
      <CustomInput ref={inputRef} placeholder="Type here..." />
      <button onClick={() => inputRef.current.focus()}>
        Focus Input
      </button>
    </div>
  );
}
```

### Key Points
- `ref.current` holds the actual DOM element or value
- Changing `ref.current` does **NOT** trigger a re-render
- Use `forwardRef` when you need to pass a ref **into** a child component
- Common use cases: focus management, animations, media playback, scroll control

---

## 📌 5. Context API

Context API solves **prop drilling** — when you have to pass props through many layers of components. It creates a global state accessible by any component in the tree.

### Step 1 — Create Context

```jsx
// context/ThemeContext.jsx
import { createContext, useState, useContext } from "react";

// 1. Create the context
const ThemeContext = createContext();

// 2. Create the Provider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Create a custom hook for easy access
export function useTheme() {
  return useContext(ThemeContext);
}
```

### Step 2 — Wrap Your App

```jsx
// main.jsx or index.jsx
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <HomePage />
      <Footer />
    </ThemeProvider>
  );
}
```

### Step 3 — Consume Context Anywhere

```jsx
// Navbar.jsx — no need to pass props!
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`navbar ${theme}`}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </nav>
  );
}
```

### Key Points
- Best for **global state**: theme, auth user, language, cart, etc.
- Avoid using Context for state that only 2-3 nearby components need — just use props
- Always export a **custom hook** (`useTheme`, `useAuth`) instead of using `useContext` directly — cleaner and reusable

---

## 📌 6. Custom Hooks

Custom hooks let you **extract and reuse stateful logic** across multiple components. A custom hook is just a function that starts with **`use`**.

### Example 1 — `useFetch` (Reusable API Call)

```jsx
// hooks/useFetch.js
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
```

```jsx
// WeatherCard.jsx — using the custom hook
import useFetch from "../hooks/useFetch";

function WeatherCard({ city }) {
  const { data, loading, error } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_KEY`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>{data.name}</h2>
      <p>Temp: {Math.round(data.main.temp - 273.15)}°C</p>
    </div>
  );
}
```

### Example 2 — `useLocalStorage` (Persist State)

```jsx
// hooks/useLocalStorage.js
import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
```

```jsx
// Usage — works exactly like useState but persists!
import useLocalStorage from "../hooks/useLocalStorage";

function Settings() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Current theme: {theme}
    </button>
  );
}
```

### Example 3 — `useDebounce` (For Search/Autocomplete)

```jsx
// hooks/useDebounce.js
import { useState, useEffect } from "react";

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer); // cleanup
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
```

```jsx
// SearchBar.jsx — stops API call on every keystroke
import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import useFetch from "../hooks/useFetch";

function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const { data } = useFetch(
    debouncedQuery
      ? `https://api.openweathermap.org/geo/1.0/direct?q=${debouncedQuery}&limit=5&appid=YOUR_KEY`
      : null
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city..."
      />
      {data?.map((city) => (
        <p key={city.lat}>{city.name}, {city.country}</p>
      ))}
    </div>
  );
}
```

### Key Points
- Always start the name with **`use`** — this is required by React's rules of hooks
- Custom hooks can call other hooks (e.g., `useDebounce` inside `useFetch`)
- They make your components **cleaner** and your logic **reusable**
- Store all custom hooks in a `/hooks` folder

---

## 🗂️ Recommended Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Card.jsx
│   ├── Navbar.jsx
│   └── SearchInput.jsx
├── context/          # Context API files
│   ├── ThemeContext.jsx
│   └── AuthContext.jsx
├── hooks/            # Custom hooks
│   ├── useFetch.js
│   ├── useDebounce.js
│   └── useLocalStorage.js
├── pages/            # Page-level components
│   └── Home.jsx
└── App.jsx
```

---

## 🚀 Quick Reference

| Concept | When to Use |
|---|---|
| **Basic Props** | Pass simple data (string, number, boolean) to child |
| **Children Props** | Wrap content inside reusable layout components |
| **Complex Props** | Pass objects, arrays, or callback functions |
| **Ref Props** | Access DOM directly, forward refs to child components |
| **Context API** | Share global state without prop drilling |
| **Custom Hooks** | Reuse stateful logic across multiple components |

---

## 📚 Resources

- [React Official Docs](https://react.dev)
- [useRef — React Docs](https://react.dev/reference/react/useRef)
- [Context API — React Docs](https://react.dev/reference/react/createContext)
- [Custom Hooks — React Docs](https://react.dev/learn/reusing-logic-with-custom-hooks)

---

*Made with ❤️ — Ayesha Asghar*