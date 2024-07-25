"use client" 

import { TagWithCount } from "@/src/lib/fetchTagsFacet";
import { Button, ButtonType } from "../../widgets/Button";

export interface HandleTagSelectionProps {
  tagName: string;
  isActiveTag: boolean;
}

interface Props {
  tag: TagWithCount;
  currentTagName: string;
  handleTagSelection: (props: HandleTagSelectionProps) => void;
}

export function SearchableTag(props: Props) {

  const { tag, currentTagName, handleTagSelection } = props;
      
  const isActiveTag = tag.name === currentTagName;

  const handleTagClick = () => {
    handleTagSelection({ tagName: tag.name, isActiveTag });
  };

  const buttonState = isActiveTag ? ButtonType.TextActive : ButtonType.Text;

  return (
    <Button type={buttonState} onClick={handleTagClick}>
      <span className="text-lg">{tag.readableName}</span>
      <span className="text-sm">({tag.count})</span>
    </Button>
  );
}
