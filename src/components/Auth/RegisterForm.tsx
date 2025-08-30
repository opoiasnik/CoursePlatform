import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { validateEmail, validatePassword, getPasswordErrors } from '../../utils/validation';
import { RegisterFormData } from '../../types';

interface RegisterFormProps {
    onToggleMode: () => void;
    onSuccess: () => void;
}

export const RegisterForm = ({ onToggleMode, onSuccess }: RegisterFormProps) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<RegisterFormData>({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<Partial<RegisterFormData & { general?: string }>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof RegisterFormData]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<RegisterFormData & { general?: string }> = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!validatePassword(formData.password)) {
            const passwordErrors = getPasswordErrors(formData.password);
            newErrors.password = passwordErrors.join(', ');
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        setTimeout(() => {
            const userKey = `user_${formData.email}`;
            const existingUser = localStorage.getItem(userKey);

            if (existingUser) {
                setErrors({ email: 'User already exists. Please login instead.' });
                setIsSubmitting(false);
            } else {
                const userData = {
                    id: `user_${Date.now()}`,
                    email: formData.email,
                    balance: 1000,
                };

                localStorage.setItem(userKey, JSON.stringify(userData));
                dispatch(login(userData));
                setIsSubmitting(false);
                onSuccess();
            }
        }, 1000);
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>Register</h2>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="Enter your email"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'error' : ''}
                    placeholder="Enter your password"
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'error' : ''}
                    placeholder="Confirm your password"
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <button type="submit" disabled={isSubmitting} className="submit-btn">
                {isSubmitting ? 'Creating account...' : 'Register'}
            </button>

            <p className="toggle-text">
                Already have an account?{' '}
                <button type="button" onClick={onToggleMode} className="toggle-btn">
                    Login here
                </button>
            </p>
        </form>
    );
};
