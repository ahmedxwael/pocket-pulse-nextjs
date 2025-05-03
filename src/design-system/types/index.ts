import { HTMLAttributes } from "react";

export type IconProps = HTMLAttributes<SVGElement>;

export type Params = {
  take?: number;
  where?: {
    [key: string]: any;
  };
  skip?: number;
  orderBy?: {
    [key: string]: "asc" | "desc";
  };
  select?: {
    [key: string]: boolean;
  };
  include?: {
    [key: string]: boolean;
  };
};
