import React from 'react';
import { useLoading } from '../service/LoadingContextType';

const Spinner: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="global-spinner-overlay d-flex justify-content-center align-items-center">
      <div className="spinner-border text-success" style={{ width: '3rem', height: '3rem' }} />
    </div>
  );
};

export default Spinner;