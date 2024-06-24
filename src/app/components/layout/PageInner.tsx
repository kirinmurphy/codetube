interface PageInnerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageInner({ children, className = '' }: PageInnerProps) {
  return (
    <div className={`max-w-screen-md mx-auto p-4 ${className}`}>
      {children}
    </div>
  );
}
