import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { validateEmail, validatePassword } from '../../utils/validation';
import { LoginFormData } from '../../types';

interface LoginFormProps {
    onToggleMode: () => void;
    onSuccess: () => void;
}

export const LoginForm = ({ onToggleMode, onSuccess }: LoginFormProps) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<Partial<LoginFormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof LoginFormData]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<LoginFormData> = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        setTimeout(() => {
            const existingUserKey = `user_${formData.email}`;
            const existingUser = localStorage.getItem(existingUserKey);

            if (existingUser) {
                const userData = JSON.parse(existingUser);
                dispatch(login(userData));
                setIsSubmitting(false);
                onSuccess();
            } else {
                setErrors({ email: 'User not found. Please register first.' });
                setIsSubmitting(false);
            }
        }, 1000);
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>Login</h2>

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

            <button type="submit" disabled={isSubmitting} className="submit-btn">
                {isSubmitting ? 'Logging in...' : 'Login'}
            </button>

            <p className="toggle-text">
                Don't have an account?{' '}
                <button type="button" onClick={onToggleMode} className="toggle-btn">
                    Register here
                </button>
            </p>
        </form>
    );
};
