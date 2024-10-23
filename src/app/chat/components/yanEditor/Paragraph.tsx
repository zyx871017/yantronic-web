interface IChildren {
  emphasis?: boolean;
  inlineCode?: boolean;
  strong?: boolean;
  text: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Paragraph = (props: { objList: IChildren[]; child: any }) => {
  const { objList, child } = props;
  return (
    <p className="leading-8">
      {objList.map((obj, index) => {
        if (!obj.text) {
          return child?.[index];
        }
        if (obj.emphasis && obj.strong) {
          return (
            <span key={index}>
              <strong>
                <em>{obj.text}</em>
              </strong>
            </span>
          );
        }
        if (obj.emphasis) {
          return (
            <span key={index}>
              <em>{obj.text}</em>
            </span>
          );
        }
        if (obj.inlineCode) {
          return (
            <code
              className="bg-main-surface-tertiary px-1 py-0.5 rounded-[0.25rem] text-sm font-medium"
              key={index}
            >
              {obj.text}
            </code>
          );
        }
        if (obj.strong) {
          return (
            <strong key={index} className="font-semibold">
              {obj.text}
            </strong>
          );
        }
        return obj.text;
      })}
    </p>
  );
};

export default Paragraph;
