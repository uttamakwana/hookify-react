import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.querySelector("#root")!;

ReactDOM.createRoot(rootElement).render(<App />);
