import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { setFilter, clearUserPurchases } from '../../store/slices/courseSlice';

interface HeaderProps {
    onAuthOpen: () => void;
}

export const Header = ({ onAuthOpen }: HeaderProps) => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { purchasedCourses, filter } = useSelector((state: RootState) => state.courses);

    const handleLogout = () => {
        dispatch(clearUserPurchases());
        dispatch(logout());
    };

    const handleFilterChange = (newFilter: 'all' | 'purchased') => {
        dispatch(setFilter(newFilter));
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="logo">
                        <h1>🎓 EduHub</h1>
                    </div>

                    <nav className="navigation">
                        {isAuthenticated ? (
                            <div className="user-section">
                                <div className="balance-display">
                                    💰 <span className="balance-amount">${user?.balance || 0}</span>
                                </div>

                                <div className="filter-tabs">
                                    <button
                                        className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                                        onClick={() => handleFilterChange('all')}
                                    >
                                        All Courses
                                    </button>
                                    <button
                                        className={`filter-tab ${filter === 'purchased' ? 'active' : ''}`}
                                        onClick={() => handleFilterChange('purchased')}
                                    >
                                        My Courses ({purchasedCourses.length})
                                    </button>
                                </div>

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
