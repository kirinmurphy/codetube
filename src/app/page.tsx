import { Suspense } from 'react';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { HomePage } from './components/HomePage';

const HOMEPAGE_TAG_GROUP_NAMES = [
  'featured',
  'new_react_stuff',
  'new_javascript_stuff',
  'javascript_basics',
  'nextjs', 
  'code_assist',
  'css'
];

interface Props {
  searchParams: Record<string, string>;
}

export default async function Home ({ searchParams = {} }: Props) {
  const selectedTagName = searchParams?.tag || '';

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <HomePage
          selectedTagName={selectedTagName} 
          tagGroupNames={HOMEPAGE_TAG_GROUP_NAMES} 
        />
      </Suspense> 
    </ErrorBoundary>
  );
}
