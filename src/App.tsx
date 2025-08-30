import React, { useState, useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store, RootState } from './store';
import { Header } from './components/Header/Header';
import { CourseList } from './components/Course/CourseList';
import { AuthModal } from './components/Auth/AuthModal';
import { loadUserPurchases } from './store/slices/courseSlice';
import './styles/index.css';

function AppContent() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isAuthenticated && user?.id) {
            dispatch(loadUserPurchases(user.id));
        }
    }, [isAuthenticated, user?.id, dispatch]);

    const handleAuthOpen = () => {
        setIsAuthModalOpen(true);
    };

    const handleAuthClose = () => {
        setIsAuthModalOpen(false);
    };

    return (
        <div className="App">
            <Header onAuthOpen={handleAuthOpen} />

            <main className="main-content">
                <div className="container">
                    <CourseList onAuthRequired={handleAuthOpen} />
                </div>
            </main>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={handleAuthClose}
            />
        </div>
    );
}

function App() {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    );
}

export default App;
