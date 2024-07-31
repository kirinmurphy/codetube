"use client";

import React, { useState, useEffect, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorInfo {
  hasError: boolean;
  error: Error | null;
}

export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const [errorInfo, setErrorInfo] = useState<ErrorInfo>({ hasError: false, error: null });

  useEffect(() => {
    const handleError = (error: Error) => {
      setErrorInfo({ hasError: true, error });
    };

    const errorListener = (event: ErrorEvent) => handleError(event.error);
    const unhandledRejectionListener = (event: PromiseRejectionEvent) => handleError(event.reason);

    window.addEventListener('error', errorListener);
    window.addEventListener('unhandledrejection', unhandledRejectionListener);

    return () => {
      window.removeEventListener('error', errorListener);
      window.removeEventListener('unhandledrejection', unhandledRejectionListener);
    };
  }, []);

  if (errorInfo.hasError) {
    return <div>Error loading data: {errorInfo.error?.message || 'Unknown error'}</div>;
  }

  return <>{children}</>;
};
