import {
  createIncomeService,
  deleteIncomeService,
  getIncomesService,
  updateIncomeService,
} from "../services/incomes.service";

export const getIncomesAction = getIncomesService.bind(null);

export const createIncomeAction = createIncomeService.bind(null);

export const updateIncomeAction = updateIncomeService.bind(null);

export const deleteIncomeAction = deleteIncomeService.bind(null);
