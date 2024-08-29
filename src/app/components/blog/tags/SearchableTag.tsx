"use client" 
import { MdCancel } from 'react-icons/md';
import { TagWithCount } from "@/src/app/requests/fetchTagsFacet";
import { Button, ButtonType } from "../../widgets/Button";
import clsx from 'clsx';
import { LoadingSpinner } from '../../widgets/Loading';
import { useTransition } from 'react';

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
  const {
     tag,
     currentTagName,
     handleTagSelection,
   } = props;
      
  const isActiveTag = tag.name === currentTagName;

  const [isFilterPending, startTransition] = useTransition();

  const handleTagClick = () => {
    startTransition(() => handleTagSelection({ tagName: tag.name, isActiveTag }));  
  };

  const buttonState = isActiveTag ? ButtonType.TextActive : ButtonType.Text;

  const hideTag = tag.id === null && currentTagName === '';

  return (
    <Button 
      type={buttonState} 
      onClick={handleTagClick} 
      className={clsx('group w-full flex items-center gap-2', { 
        'invisible': hideTag 
      })}>

      <div className="flex-1 flex items-center gap-2">
        <span className="text-lg">{tag.readableName}</span>

        <span>
          {isFilterPending && <LoadingSpinner />}

          {isActiveTag && !isFilterPending && (
            <MdCancel className=" group-hover:text-white translate-y-[1px]" />
          )}
        </span>
      </div>

      <div className="items-center">
        <span className="text-sm">
          {tag.count > 0 && <>({tag.count})</>} 
        </span>
      </div>
    </Button>
  );
}
