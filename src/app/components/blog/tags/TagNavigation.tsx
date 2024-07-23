import { TagWithCount } from '@/src/lib/fetchTagsFacet';
import { SearchableTag } from "./SearchableTag";

interface Props {
  allTags: TagWithCount[];
  tagName: string;
}

export function TagNavigation ({ allTags, tagName }: Props) {
  return (
    <div className="w-full flex flex-row gap-2 flex-wrap mb-6">
      {allTags.map(tagOption => (
        <SearchableTag 
          key={tagOption.id} 
          tag={tagOption} 
          currentTagName={tagName} 
        />
      ))}
    </div>
  );
}
