import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div data-cy="success-page" style={{ padding: 24 }}>
      <h1>Success ✅</h1>
      <p>Giriş başarılı!</p>
      <Link to="/" data-cy="back-to-login">Login’e dön</Link>
    </div>
  );
}
