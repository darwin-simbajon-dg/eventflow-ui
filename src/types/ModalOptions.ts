export type ModalOptions = {
    message: string;
    title?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    showCancel?: boolean;
  };