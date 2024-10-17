import { QuestionItemType } from "@/types/question";
import cls from "classnames";
import Link from "next/link";

interface IProps {
  data: QuestionItemType[];
  currentId?: number;
}

export default function SideMenu(props: IProps) {
  const { data, currentId } = props;

  return (
    <div className="px-3 flex flex-col gap-[2px]">
      {data.map((item) => {
        return (
          <Link
            href={`/chat/${item.id}`}
            key={item.id}
            className={cls(
              "text-black  rounded-lg px-2.5 py-1.5 text-sm cursor-pointer",
              currentId === item.id ? "bg-white" : ""
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}
