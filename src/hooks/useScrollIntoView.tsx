import { RefObject } from "react";

const UseScrollIntoView = (ref: RefObject<HTMLElement>) =>
  ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

export { UseScrollIntoView };
