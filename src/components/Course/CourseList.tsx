import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchCourses, clearError } from '../../store/slices/courseSlice';
import { CourseCard } from './CourseCard';
import { VideoModal } from '../Video/VideoModal';

interface CourseListProps {
    onAuthRequired: () => void;
}

export const CourseList = ({ onAuthRequired }: CourseListProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { courses, loading, error, filter, purchasedCourses } = useSelector((state: RootState) => state.courses);
    const [videoModal, setVideoModal] = useState<{
        isOpen: boolean;
        videoUrl: string | null;
        title: string;
    }>({
        isOpen: false,
        videoUrl: null,
        title: '',
    });

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearError());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    const handleVideoPlay = (videoUrl: string, title: string) => {
        setVideoModal({
            isOpen: true,
            videoUrl,
            title,
        });
    };

    const handleCloseVideo = () => {
        setVideoModal({
            isOpen: false,
            videoUrl: null,
            title: '',
        });
    };

    const filteredCourses = filter === 'purchased'
        ? courses.filter(course => purchasedCourses.includes(course.id))
        : courses;

    if (loading && courses.length === 0) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading courses...</p>
            </div>
        );
    }

    return (
        <div className="course-list-container">
            <div className="page-header">
                <h1 className="page-title">
                    {filter === 'purchased' ? 'My Courses' : 'Explore Courses'}
                </h1>
                <p className="page-subtitle">
                    {filter === 'purchased'
                        ? 'Access your purchased courses and continue learning'
                        : 'Discover amazing courses and start your learning journey'
                    }
                </p>
            </div>

            {error && (
                <div className="error-banner">
                    <span>{error}</span>
                    <button onClick={() => dispatch(clearError())}>×</button>
                </div>
            )}

            {filteredCourses.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">
                        {filter === 'purchased' ? '📚' : '🔍'}
                    </div>
                    <h3 className="empty-state-title">
                        {filter === 'purchased' ? 'No purchased courses' : 'No courses found'}
                    </h3>
                    <p className="empty-state-description">
                        {filter === 'purchased'
                            ? 'You haven\'t purchased any courses yet. Browse our course catalog to get started!'
                            : 'We couldn\'t find any courses matching your criteria.'
                        }
                    </p>
                </div>
            ) : (
                <div className="course-grid">
                    {filteredCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            onVideoPlay={handleVideoPlay}
                            onAuthRequired={onAuthRequired}
                        />
                    ))}
                </div>
            )}

            <VideoModal
                isOpen={videoModal.isOpen}
                videoUrl={videoModal.videoUrl}
                title={videoModal.title}
                onClose={handleCloseVideo}
            />
        </div>
    );
};
