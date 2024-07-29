"use client" 
import { MdCancel } from 'react-icons/md';
import { TagWithCount } from "@/src/app/requests/fetchTagsFacet";
import { Button, ButtonType } from "../../widgets/Button";
import clsx from 'clsx';

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
    <Button 
      type={buttonState} 
      onClick={handleTagClick} 
      className={clsx('group w-full flex items-center gap-2')}>

      <div className="flex-1 translate-y-[-1px]">
        <span className="text-lg">{tag.readableName}</span>
      </div>

      <div className="w-[40px] grid grid-cols-2 gap-2 items-center">
        <span className="text-sm">
          {tag.count > 0 && <>({tag.count})</>} 
        </span>

        <span>
          {isActiveTag && (
            <MdCancel className=" group-hover:text-white translate-y-[1px]" />
          )}
        </span>
      </div>
    </Button>
  );
}
