import { React } from "jimu-core";
import { Alert, AlertType } from "jimu-ui";
import { useState, useEffect } from "react";

interface ToastMessage {
  text: string;
  level: AlertType; // 'info' | 'warning' | 'success' | 'error'
}

const UserMessages = ({ toast }) => {
  const [visibleToast, setVisibleToast] = useState(null);

  useEffect(() => {
    if (toast) {
      setVisibleToast(toast);
      const timeout = setTimeout(() => {
        setVisibleToast(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [toast]);

  return (
    <>
      {visibleToast && (
        <Alert
          open
          type={visibleToast.level}
          text={visibleToast.text}
          withIcon
          style={{
            position: "absolute",
            top: 15,
            right: 56,
            zIndex: 9999,
          }}
        />
      )}
    </>
  );
};

export default UserMessages;
