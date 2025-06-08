import { Type } from "@/modules/records/types";
import { User } from "../types";

type GetTransactionUpdatesParams = {
  type: Type;
  amount: number;
  user: User;
  reverse?: boolean;
};

export function getTransactionUpdates({
  type,
  amount,
  user,
  reverse,
}: GetTransactionUpdatesParams) {
  let expensesCount = user.expensesCount;
  let incomesCount = user.incomesCount;
  let balance = user.balance;

  const multiplier = reverse ? -1 : 1;

  switch (type) {
    case "EXPENSE":
      expensesCount += amount * multiplier;
      balance -= amount * multiplier;
      break;
    case "INCOME":
      incomesCount += amount * multiplier;
      balance += amount * multiplier;
      break;
    case "TRANSFER":
      expensesCount += amount * multiplier;
      incomesCount += amount * multiplier;
      balance -= amount * multiplier;
      break;
    default:
      return { expensesCount, incomesCount, balance };
  }

  return { expensesCount, incomesCount, balance };
}
