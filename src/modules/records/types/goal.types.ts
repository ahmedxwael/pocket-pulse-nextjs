export type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
