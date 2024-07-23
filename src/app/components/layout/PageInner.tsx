interface PageInnerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageInner ({ children, className = '' }: PageInnerProps) {
  return (
    <div className={`max-w-screen-lg mx-auto py-4 px-6 ${className}`}>
      {children}
    </div>
  );
}
