"use client" 

import { TagWithCount } from "@/src/lib/fetchTagsFacet";
import { Button, ButtonType } from "../../widgets/Button";
import { useRouter } from "next/navigation";
import { getTagPath } from "../utils/getTagPath";

interface Props {
  tag: TagWithCount;
  currentTagName: string;
}

export function SearchableTag({ tag, currentTagName }: Props) {
  const router = useRouter();
    
  const isCurrentTag = tag.name === currentTagName;

  const handleTagClick = () => {
    const newPath = isCurrentTag ? '/' : getTagPath(tag.name);
    router.push(newPath, { scroll: false });
  };

  const buttonState = isCurrentTag ? ButtonType.TagActive : ButtonType.Tag;

  return (
    <Button type={buttonState} onClick={handleTagClick}>
      <span className="text-lg">{tag.readableName}</span>
      <span className="text-sm">{tag.count}</span>
    </Button>
  );
}
