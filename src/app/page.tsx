import { Suspense } from 'react';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { HomePage } from './components/HomePage';

const HOMEPAGE_TAG_GROUP_NAMES = [
  'featured',
  'new_javascript_stuff',
  'javascript_basics',
  'nodeJS',
  'new_react_stuff',
  'nextjs',
];

interface Props {
  searchParams: Promise<Record<string, string>>;
}

export default async function Home ({ searchParams }: Props) {
  const params = await searchParams;
  const selectedTagName = params?.tag || '';

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
