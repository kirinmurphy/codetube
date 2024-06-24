interface PageInnerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageInner({ children, className = '' }: PageInnerProps) {
  return (
    <div className={`max-w-screen-md mx-auto py-4 px-8 ${className}`}>
      {children}
    </div>
  );
}
