import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Input } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';
import { ROUTES } from '../../lib/constants';
import { validateEmail, validatePassword } from '../../lib/validators';
import styles from './RegisterPage.module.css';

const initialFormState = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const initialFormErrors = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const getFieldError = (name, value, form = {}) => {
  const trimmedValue = typeof value === 'string' ? value.trim() : value;

  if (name === 'fullName') {
    if (!trimmedValue) return 'Full name is required';
    if (trimmedValue.length < 2) return 'Full name must be at least 2 characters';
    return null;
  }

  if (name === 'email') {
    return validateEmail(trimmedValue);
  }

  if (name === 'password') {
    if (!trimmedValue) return 'Password is required';
    if (/\s/.test(trimmedValue)) return 'Password cannot contain spaces';

    const baseError = validatePassword(trimmedValue);
    if (baseError) return baseError;
    if (!/[a-z]/.test(trimmedValue)) return 'Password must contain a lowercase letter';
    if (/password|123456|qwerty|abc123/i.test(trimmedValue)) {
      return 'Choose a stronger password';
    }
    return null;
  }

  if (name === 'confirmPassword') {
    if (!trimmedValue) return 'Please confirm your password';
    if (trimmedValue !== form.password) return 'Passwords do not match';
    return null;
  }

  return null;
};

const parseRegisterResponse = (responseData) => {
  const payload = responseData?.data ?? responseData;
  const token = payload?.token || payload?.accessToken || payload?.access_token;
  const user = payload?.user || payload?.profile || payload?.student || payload;

  return { token, user };
};

export default function RegisterPage() {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState(initialFormErrors);
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const redirectPath = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const isFormValid = useMemo(() => {
    return (
      !getFieldError('fullName', form.fullName, form) &&
      !getFieldError('email', form.email, form) &&
      !getFieldError('password', form.password, form) &&
      !getFieldError('confirmPassword', form.confirmPassword, form)
    );
  }, [form.fullName, form.email, form.password, form.confirmPassword]);

  const handleChange = ({ target: { name, value } }) => {
    setForm((current) => ({ ...current, [name]: value }));

    if (submitError) {
      setSubmitError('');
    }

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: getFieldError(name, value, { ...form, [name]: value }),
      }));
    }

    if (name === 'password' && form.confirmPassword) {
      setErrors((current) => ({
        ...current,
        confirmPassword: getFieldError('confirmPassword', form.confirmPassword, {
          ...form,
          [name]: value,
        }),
      }));
    }
  };

  const handleBlur = ({ target: { name, value } }) => {
    setErrors((current) => ({
      ...current,
      [name]: getFieldError(name, value, form),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    const nextErrors = {
      fullName: getFieldError('fullName', form.fullName, form),
      email: getFieldError('email', form.email, form),
      password: getFieldError('password', form.password, form),
      confirmPassword: getFieldError('confirmPassword', form.confirmPassword, form),
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
      const { data } = await authService.register({
        name: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      const { token, user } = parseRegisterResponse(data);
      if (!token || !user) {
        throw new Error('Unexpected server response. Please try again.');
      }

      login(user, token);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      const isOffline = !navigator.onLine || error?.status === 0;
      const message = isOffline
        ? 'Unable to reach the server. Check your internet connection and try again.'
        : error?.message || 'Registration failed. Please review your details and try again.';

      setSubmitError(message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((current) => !current);
  };

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <Card variant="elevated" padding="lg" className={styles.card}>
          <div className={styles.header}>
            <div>
              <p className={styles.overline}>Create your account</p>
              <h1 className={styles.title}>Register with MIU Guide</h1>
            </div>
            <p className={styles.description}>
              Sign up to access your student portal, track attendance, view grades, and explore campus tools.
            </p>
          </div>

          {submitError && (
            <div className={styles.errorBanner} role="alert">
              {submitError}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <Input
              name="fullName"
              type="text"
              label="Full Name"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.fullName}
              disabled={loading}
              required
              autoComplete="name"
            />

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
              placeholder="Create a secure password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              hint="At least 8 characters, uppercase, lowercase, and a number."
              disabled={loading}
              required
              autoComplete="new-password"
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

            <Input
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              label="Confirm Password"
              placeholder="Repeat your password"
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.confirmPassword}
              disabled={loading}
              required
              autoComplete="new-password"
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
                Register
              </Button>

              <p className={styles.footerText}>
                Already have an account?{' '}
                <Link className={styles.link} to={ROUTES.LOGIN}>
                  Login
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}

