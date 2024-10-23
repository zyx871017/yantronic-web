interface IChildren {
  emphasis?: boolean;
  inlineCode?: boolean;
  strong?: boolean;
  text: string;
}
const Paragraph = (props: { objList: IChildren[] }) => {
  const { objList } = props;
  return (
    <p className="leading-8 mb-1">
      {objList.map((obj, index) => {
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
            <code className="bg-slate-200 px-1 py-1 rounded-sm" key={index}>
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
