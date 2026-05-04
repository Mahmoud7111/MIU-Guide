import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/lib/constants';
import styles from './RegisterPage.module.css';

// Using the university background image
import cairoBg from '@/assets/images/tools/cairo3-large.jpg';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.');
      setLoading(false);
      return;
    }

    // Mock Registration logic (no backend)
    setTimeout(() => {
      const dummyUser = {
        id: Date.now().toString(),
        name: formData.fullName,
        email: formData.email,
        role: 'student'
      };
      const dummyToken = 'dummy-jwt-token-' + Date.now();
      
      login(dummyUser, dummyToken);
      navigate(ROUTES.DASHBOARD);
    }, 1000);
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

      {/* Right Side: Registration Form */}
      <div className={styles.rightSide}>
        <div className={styles.topNav}>
          <Link to={ROUTES.HOME}>
            <img src="/MIU.png" alt="MIU Logo" className={styles.logoImage} />
          </Link>
          <div className={styles.helpIcon}>ⓘ</div>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.headerArea}>
            <p className={styles.overline}>Join the Student Portal</p>
            <h1 className={styles.title}>Create your account</h1>
            <p className={styles.description}>
              Sign up to access your student dashboard, view your academic progress, and stay updated with campus events.
            </p>
          </div>

          {error && <div className={styles.errorBanner}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Email address</label>
              <input
                type="email"
                name="email"
                placeholder="you@student.edu.eg"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Password</label>
              <div className={styles.inputWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
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
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={styles.input}
                required
              />
              <p className={styles.hint}>
                At least 8 characters, including an uppercase letter and a number.
              </p>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <div className={styles.footer}>
            Already have an account? <Link to={ROUTES.LOGIN} className={styles.loginLink}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
