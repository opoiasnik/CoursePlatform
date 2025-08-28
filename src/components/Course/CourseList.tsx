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
    const { courses, loading, error } = useSelector((state: RootState) => state.courses);
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
            {error && (
                <div className="error-banner">
                    <span>{error}</span>
                    <button onClick={() => dispatch(clearError())}>×</button>
                </div>
            )}

            <div className="course-grid">
                {courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        onVideoPlay={handleVideoPlay}
                        onAuthRequired={onAuthRequired}
                    />
                ))}
            </div>

            <VideoModal
                isOpen={videoModal.isOpen}
                videoUrl={videoModal.videoUrl}
                title={videoModal.title}
                onClose={handleCloseVideo}
            />
        </div>
    );
};
