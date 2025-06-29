import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { QrScanner } from 'react-qrcode-scanner';
import { handleQRCodeResult } from '../service/api';

const QRScanner: React.FC = () => {
  const handleScan = async (data: string | null) => {
    if (data) {
      await handleQRCodeResult(data);
      console.log('Scanned:', data);
      // Process your data (e.g., parse JSON, confirm attendance)
    }
  };

  const handleError = (err: any) => {
     enqueueSnackbar("Camera Device is not found", { variant: "error" });
    console.error('Scan error', err);
  };

  return (
    <div>
      <h5>Scan QR Code</h5>
      <QrScanner
        onScan={handleScan}
        onError={handleError}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default QRScanner;


