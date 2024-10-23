const Heading = (props: {
  data: {
    depth: number;
    children: { text: string }[];
  };
}) => {
  const { data } = props;
  switch (data.depth) {
    case 1:
      return (
        <h1 className="text-4xl font-bold leading-snug mb-8 tracking-tighter">
          {data.children[0].text}
        </h1>
      );
    case 2:
      return (
        <h2 className="text-2xl font-semibold leading-snug mt-8 mb-4">
          {data.children[0].text}
        </h2>
      );
    case 3:
      return (
        <h3 className="text-xl font-semibold leading-snug mt-4 mb-2">
          {data.children[0].text}
        </h3>
      );
    case 4:
      return (
        <h4 className="text-base font-semibold leading-snug mt-4 mb-2">
          {data.children[0].text}
        </h4>
      );
    case 5:
      return (
        <h5 className="text-base font-semibold leading-relaxed">
          {data.children[0].text}
        </h5>
      );
    case 6:
      return (
        <h6 className="text-base leading-relaxed">{data.children[0].text}</h6>
      );
    default:
      return (
        <h4 className="text-lg font-semibold leading-snug mt-4 mb-2">
          {data.children[0].text}
        </h4>
      );
  }
};

export default Heading;
