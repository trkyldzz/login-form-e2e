import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
// min 8, en az 1 büyük, 1 küçük, 1 sayı
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    terms: false,
  });

  const emailValid = useMemo(() => EMAIL_REGEX.test(email.trim()), [email]);
  const passValid = useMemo(() => PASS_REGEX.test(password), [password]);
  const termsValid = accepted === true;

  const formValid = emailValid && passValid && termsValid;

  const showEmailError = touched.email && !emailValid;
  const showPassError = touched.password && !passValid;
  const showTermsError = touched.terms && !termsValid;

  function onSubmit(e) {
    e.preventDefault();
    setTouched({ email: true, password: true, terms: true });
    if (!formValid) return;
    navigate("/success");
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Login</h2>

      <form onSubmit={onSubmit} data-cy="login-form">
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <input
              data-cy="email-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            />
            {showEmailError && (
              <p data-cy="email-error">Geçerli bir email gir.</p>
            )}
          </div>

          <div>
            <input
              data-cy="password-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            />
            {showPassError && (
              <p data-cy="password-error">Şifre güçlü olmalı.</p>
            )}
          </div>

          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              data-cy="terms-checkbox"
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              onBlur={() => setTouched((t) => ({ ...t, terms: true }))}
            />
            Şartları kabul ediyorum
          </label>

          <button data-cy="login-button" type="submit" disabled={!formValid}>
            Giriş Yap
          </button>
        </div>

        {showTermsError && (
          <p data-cy="terms-error">Şartları kabul etmelisin.</p>
        )}
      </form>
    </div>
  );
}
