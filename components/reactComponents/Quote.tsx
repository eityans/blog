import * as React from "react";
import style from "./Quote.module.css";

type Props = {
  children: React.ReactNode;
};

// 引用

export const Quote: React.FC<Props> = (props) => {
  return <div className={style.blockquote}>{props.children}</div>;
};
