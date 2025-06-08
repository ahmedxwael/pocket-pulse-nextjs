import {
  createExpenseService,
  deleteExpenseService,
  getExpensesService,
  updateExpenseService,
} from "../services/expenses.service";

export const getExpensesAction = getExpensesService.bind(null);

export const createExpenseAction = createExpenseService.bind(null);

export const updateExpenseAction = updateExpenseService.bind(null);

export const deleteExpenseAction = deleteExpenseService.bind(null);
