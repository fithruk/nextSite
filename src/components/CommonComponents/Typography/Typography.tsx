type Components = "h1" | "h2" | "p" | "span";

type Props = {
  type: Components;
  children: React.ReactNode;
  classnames?: string;
};

export const Typography = ({ type, children, classnames }: Props) => {
  switch (type) {
    case "h1":
      return <h1 className={classnames}>{children}</h1>;
    case "h2":
      return <h2 className={classnames}>{children}</h2>;
    case "p":
      return <p className={classnames}>{children}</p>;
    case "span":
      return <span className={classnames}>{children}</span>;
    default:
      return <div>{children}</div>;
  }
};
