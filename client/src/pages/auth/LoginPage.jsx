import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/lib/constants';
import styles from './LoginPage.module.css';

// Using the university background image
import cairoBg from '@/assets/images/tools/cairo3-large.jpg';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Hardcoded credentials logic
    setTimeout(() => {
      if (email === 'student@miuegypt.edu.eg' && password === '12345678') {
        const dummyUser = {
          id: '1',
          name: 'MIU Student',
          email: 'student@miuegypt.edu.eg',
          role: 'student'
        };
        const dummyToken = 'dummy-jwt-token-123456';
        
        login(dummyUser, dummyToken);
        navigate(ROUTES.DASHBOARD);
      } else {
        setError('The email address or password you entered is incorrect.');
        setLoading(false);
      }
    }, 800);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.page}>
      {/* Left Side: University Image */}
      <div className={styles.leftSide}>
        <img src={cairoBg} alt="MIU Campus" className={styles.bgImage} />
        <div className={styles.overlay}>
          <p>© 2026 Misr International University. All Rights Reserved.</p>
          <div className={styles.legalLinks}>
            <span className={styles.legalLink}>Privacy Policy</span>
            <span className={styles.legalLink}>Terms of Service</span>
            <span className={styles.legalLink}>Cookie Policy</span>
            <span className={styles.legalLink}>Accessibility</span>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className={styles.rightSide}>
        <div className={styles.topNav}>
          <Link to={ROUTES.HOME}>
            <img src="/MIU.png" alt="MIU Logo" className={styles.logoImage} />
          </Link>
          <div className={styles.helpIcon}>ⓘ</div>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.headerArea}>
            <p className={styles.overline}>Student Portal Login</p>
            <h1 className={styles.title}>Sign in to your account</h1>
            <p className={styles.description}>
              Use your university credentials to access your schedule, grades, attendance, and campus services.
            </p>
          </div>

          {error && <div className={styles.errorBanner}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email address</label>
              <input
                type="email"
                placeholder="you@student.edu.eg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
                autoFocus
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Password</label>
              <div className={styles.inputWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  required
                />
                <button 
                  type="button" 
                  className={styles.passwordToggle}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <p className={styles.hint}>
                Minimum 8 characters, include an uppercase letter and a number.
              </p>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Logging in...' : 'Continue'}
            </button>
          </form>

          <div className={styles.footer}>
            Don't have an account? <Link to={ROUTES.REGISTER} className={styles.registerLink}>Create a new account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
