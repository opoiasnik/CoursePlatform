import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { purchaseCourse, setCurrentVideo } from '../../store/slices/courseSlice';
import { Course } from '../../types';

interface CourseCardProps {
    course: Course;
    onVideoPlay: (videoUrl: string, title: string) => void;
    onAuthRequired: () => void;
}

export const CourseCard = ({ course, onVideoPlay, onAuthRequired }: CourseCardProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { purchasedCourses, loading } = useSelector((state: RootState) => state.courses);

    const isPurchased = purchasedCourses.includes(course.id);

    const handlePurchase = async () => {
        if (!isAuthenticated) {
            onAuthRequired();
            return;
        }

        try {
            await dispatch(purchaseCourse(course.id)).unwrap();
        } catch (error) {
            console.error('Purchase failed:', error);
        }
    };

    const handleVideoPlay = () => {
        if (!isPurchased) {
            return;
        }

        dispatch(setCurrentVideo(course.videoUrl));
        onVideoPlay(course.videoUrl, course.title);
    };

    return (
        <div className="course-card">
            <div className="course-thumbnail" onClick={handleVideoPlay}>
                <div className="play-overlay">
                    {isPurchased ? (
                        <div className="play-button">▶</div>
                    ) : (
                        <div className="locked-overlay">
                            <div className="lock-icon">🔒</div>
                            <span>Purchase to watch</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>

                <div className="course-footer">
                    <span className="course-price">${course.price}</span>

                    {isPurchased ? (
                        <button className="purchased-btn" disabled>
                            ✓ Purchased
                        </button>
                    ) : (
                        <button
                            className="purchase-btn"
                            onClick={handlePurchase}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Buy Now'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
