import { Prisma } from "@prisma/client";
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

export type GetParams = {
  take?: number;
  where: Prisma.UserWhereUniqueInput;
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
