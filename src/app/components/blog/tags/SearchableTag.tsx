"use client" 

 import { TagWithCount } from "@/src/lib/fetchTagsFacet";
import { Button, ButtonType } from "../../widgets/Button";

export function SearchableTag({ tag }: { tag: TagWithCount }) {
  
  const handleTagClick = () => {
    window.location.href = `/?tag=${tag.name}`;
  };

  return (
    <Button type={ButtonType.Tag} onClick={handleTagClick}>
      <span className="text-lg">{tag.readableName}</span>
      <span className="text-sm">{tag.count}</span>
    </Button>
  );
}
