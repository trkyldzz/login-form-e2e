import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Success from "./components/Success";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/success" element={<Success />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
