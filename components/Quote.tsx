import * as React from "react";

type Props = {
  children: React.ReactNode;
};

export const Quote: React.FC<Props> = (props) => {
  return <>{props.children}</>;
};
