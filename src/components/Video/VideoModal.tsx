import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentVideo } from '../../store/slices/courseSlice';

interface VideoModalProps {
    isOpen: boolean;
    videoUrl: string | null;
    title: string;
    onClose: () => void;
}

export const VideoModal = ({ isOpen, videoUrl, title, onClose }: VideoModalProps) => {
    const dispatch = useDispatch();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isOpen && videoRef.current) {
            videoRef.current.load();
        }
    }, [isOpen, videoUrl]);

    const handleClose = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
        dispatch(setCurrentVideo(null));
        onClose();
    };

    if (!isOpen || !videoUrl) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content video-modal" onClick={(e) => e.stopPropagation()}>
                <div className="video-header">
                    <h3>{title}</h3>
                    <button className="close-btn" onClick={handleClose}>
                        ×
                    </button>
                </div>

                <div className="video-container">
                    <video
                        ref={videoRef}
                        controls
                        preload="metadata"
                        className="video-player"
                    >
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
};
