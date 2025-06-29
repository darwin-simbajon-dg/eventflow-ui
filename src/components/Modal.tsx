import React from 'react';
import { useAppStore } from '../store/useAppStore';

const Modal: React.FC = () => {
  const { showModal, modalOptions, closeModal } = useAppStore();

  if (!showModal || !modalOptions) return null;

  const {
    title = "Confirmation",
    message,
    confirmButtonText = "Confirm",
    cancelButtonText = "Cancel",
    onConfirm,
    onCancel,
    showCancel = true,
  } = modalOptions;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    closeModal();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    closeModal();
  };

  return (
    <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <p className="text-dark">{message}</p>
          </div>
          <div className="modal-footer">
            {showCancel && (
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                {cancelButtonText}
              </button>
            )}
            <button type="button" className="btn btn-primary" onClick={handleConfirm}>
              {confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
