import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Input } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import authService from '@/services/authService';
import { ROUTES } from '@/lib/constants';
import { validateEmail, validatePassword } from '@/lib/validators';
import styles from './LoginPage.module.css';
import cairoBg from '@/assets/images/tools/campus.webp';

const initialFormState = {
  email: '',
  password: '',
};

const initialFormErrors = {
  email: '',
  password: '',
};

const getFieldError = (name, value) => {
  const trimmedValue = name === 'email' ? value.trim() : value;

  if (name === 'email') {
    return validateEmail(trimmedValue);
  }

  if (name === 'password') {
    if (!trimmedValue) {
      return 'Password is required';
    }

    if (/\s/.test(trimmedValue)) {
      return 'Password cannot contain spaces';
    }

    return validatePassword(trimmedValue);
  }

  return null;
};

const parseLoginResponse = (responseData) => {
  const payload = responseData?.data ?? responseData;
  const token = payload?.token || payload?.accessToken || payload?.access_token;
  const user = payload?.user || payload?.profile || payload?.student || payload;

  return { token, user };
};

export default function LoginPage() {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState(initialFormErrors);
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const redirectPath = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const isFormValid = useMemo(
    () => !getFieldError('email', form.email) && !getFieldError('password', form.password),
    [form.email, form.password]
  );

  const handleChange = ({ target: { name, value } }) => {
    setForm((current) => ({ ...current, [name]: value }));

    if (submitError) {
      setSubmitError('');
    }

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: getFieldError(name, value),
      }));
    }
  };

  const handleBlur = ({ target: { name, value } }) => {
    setErrors((current) => ({
      ...current,
      [name]: getFieldError(name, value),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    const nextErrors = {
      email: getFieldError('email', form.email),
      password: getFieldError('password', form.password),
    };

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) {
      setErrors(nextErrors);
      setSubmitError('');
      return;
    }

    setLoading(true);
    setSubmitError('');

    try {
      const { data } = await authService.login({
        email: form.email.trim(),
        password: form.password,
      });

      const { token, user } = parseLoginResponse(data);
      if (!token || !user) {
        throw new Error('Unexpected server response. Please try again.');
      }

      login(user, token);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      const isOffline = !navigator.onLine || error?.status === 0;
      const message = isOffline
        ? 'Unable to reach the server. Check your internet connection and try again.'
        : error?.message || 'Invalid email or password. Please try again.';

      setSubmitError(message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((current) => !current);
  };

  const passwordHint =
    'Minimum 8 characters, include an uppercase letter and a number.';

  return (
    <section className={styles.page} style={{ backgroundImage: `url(${cairoBg})` }}>
      <div className={styles.container}>
        <Card variant="elevated" padding="lg" className={styles.card}>
          <div className={styles.header}>
            <div>
              <p className={styles.overline}>Student Portal Login</p>
              <h1 className={styles.title}>Sign in to your account</h1>
            </div>
            <p className={styles.description}>
              Use your university credentials to access your schedule, grades,
              attendance, and campus services.
            </p>
          </div>

          {submitError && (
            <div className={styles.errorBanner} role="alert">
              {submitError}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <Input
              name="email"
              type="email"
              label="Email address"
              placeholder="you@student.edu.eg"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              disabled={loading}
              required
              autoComplete="email"
            />

            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              hint={!errors.password ? passwordHint : undefined}
              disabled={loading}
              required
              autoComplete="current-password"
              iconRight={() => (
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              )}
            />

            <div className={styles.actions}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                disabled={!isFormValid}
              >
                Sign in
              </Button>

              <p className={styles.footerText}>
                Don&apos;t have an account?{' '}
                <Link className={styles.link} to={ROUTES.REGISTER}>
                  Create a new account
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}

