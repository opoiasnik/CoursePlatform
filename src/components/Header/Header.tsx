import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';

interface HeaderProps {
    onAuthOpen: () => void;
}

export const Header = ({ onAuthOpen }: HeaderProps) => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { purchasedCourses } = useSelector((state: RootState) => state.courses);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="logo">
                        <h1>📚 CourseHub</h1>
                    </div>

                    <nav className="navigation">
                        {isAuthenticated ? (
                            <div className="user-section">
                                <span className="purchased-count">
                                    Purchased: {purchasedCourses.length} courses
                                </span>
                                <span className="user-email">{user?.email}</span>
                                <button className="logout-btn" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button className="login-btn" onClick={onAuthOpen}>
                                Login / Register
                            </button>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};
