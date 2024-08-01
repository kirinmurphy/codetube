"use client";

import { useRouter } from "next/navigation";
import { Button, ButtonType } from "../../widgets/Button";
import { getTagPath } from "../utils/getTagPath";

interface Props {
  tagName: string;
}

export function ViewMoreByTagButton ({ tagName}: Props) {
  const router = useRouter();

  const handlPlayMoreTag = () => {
    router.push(getTagPath(tagName));
  };

  return (
    <Button type={ButtonType.Text} onClick={handlPlayMoreTag}>
      <span className="underline">More</span>
    </Button>
  );
}
