import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Header } from './components/Header/Header';
import { CourseList } from './components/Course/CourseList';
import { AuthModal } from './components/Auth/AuthModal';
import './styles/index.css';

function App() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const handleAuthOpen = () => {
        setIsAuthModalOpen(true);
    };

    const handleAuthClose = () => {
        setIsAuthModalOpen(false);
    };

    return (
        <Provider store={store}>
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
        </Provider>
    );
}

export default App;
