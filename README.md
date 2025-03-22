# 📦 hookify-react  
🚀 A collection of **high-performance, reusable, and production-ready React hooks** to simplify state management, dom, location, async management and browser storage.

![GitHub package.json version](https://img.shields.io/github/package-json/v/uttamakwana/hookify-react)
![npm](https://img.shields.io/npm/dt/hookify-react)
![GitHub stars](https://img.shields.io/github/stars/uttamakwana/hookify-react?style=social)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![GitHub issues](https://img.shields.io/github/issues/uttamakwana/hookify-react)

##  🌟 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Available Hooks](#available-hooks)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## <a id="features"></a> 🚀 Features

- ✅ Custom State Management Hooks
- ✅ Async Management Hooks
- ✅ Form Handling & Validation
- ✅ Local & Session Storage Management
- ✅ Undo/Redo State with History
- ✅ Optimized & Performant

---

## <a id="installation"></a> 📌 Installation  

```sh
npm install hookify-react
```

or 

```sh
yard add hookify-react
```

##  <a id="quick-start"></a>⚡ Quick Start

```typescript
  import { useEventListener } from "hookify-react";
 
  export default function UseEventListener() {
    const buttonRef = useRef<HTMLButtonElement>(null);
 
    useEventListener("click", () => alert("Button clicked!"), buttonRef);
 
    return <button ref={buttonRef}>Click Me</button>;
  }
```

## <a id="available-hooks"></a> 🔍 Available Hooks

### Async Management

- useDebounce
- useInterval
- useTimeout
- useAdvancedEffect
- useUpdatedEffect

### DOM Interactions
- useCopyToClipboard
- useEventListener
- useHover
- useClickOutside
- useOnlineStatus
- useOnScreen
- usePress
- useScrollPosition

### State Management

- useArray
- useCounter
- useFormState
- useHistory
- usePrevious
- useToggle

### Storage Mangement

- useStorage
- useLocalStorage
- useSessionStorage

## Location

- useGeoLocation

### Responsive Design

- useSize
- useWindowSize
- useScrollPosition

## <a id="contributing"></a> 🤝 Contributing

We welcome contributions! If you have suggestions for improvements or new hooks, please open an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch (git checkout -b feature/AmazingFeature).
3. Commit your changes (git commit -m 'Add some AmazingFeature').
4. Push to the branch (git push origin feature/AmazingFeature).
5. Open a pull request.

## <a id="license"></a> 📜 LICENSE

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## <a id="contact"></a> 📬 Contact
For any inquiries or support, please reach out to uttamakwana4503@gmail.com.