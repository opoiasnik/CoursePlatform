import React from 'react';

interface BalanceModalProps {
    isOpen: boolean;
    onClose: () => void;
    needed: number;
    current: number;
}

export const BalanceModal = ({ isOpen, onClose, needed, current }: BalanceModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content balance-modal" onClick={(e) => e.stopPropagation()}>
                <div className="balance-modal-header">
                    <div className="balance-modal-icon">💸</div>
                    <h3>Insufficient Balance</h3>
                    <button className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="balance-modal-content">
                    <div className="balance-info">
                        <div className="balance-item needed">
                            <span className="label">Required:</span>
                            <span className="amount">${needed}</span>
                        </div>
                        <div className="balance-item current">
                            <span className="label">Your Balance:</span>
                            <span className="amount">${current}</span>
                        </div>
                        <div className="balance-item shortage">
                            <span className="label">Short by:</span>
                            <span className="amount shortage-amount">${needed - current}</span>
                        </div>
                    </div>

                    <p className="balance-message">
                        You need ${needed - current} more to purchase this course.
                        Complete more purchases or add funds to your account.
                    </p>

                    <button className="balance-modal-btn" onClick={onClose}>
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
};
