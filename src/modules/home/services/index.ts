import { db } from "@/drizzle/db";
import { incomes } from "@/drizzle/schema";
import { authorized } from "@/modules/account/utils";
import { eq } from "drizzle-orm";

export const getOverviewRecords = async () => {
  const { user } = await authorized();

  const records = await db.query.incomes.findMany({
    where: eq(incomes.userId, parseInt(user.id)),
  });

  if (!records || records.length === 0) {
    return {
      data: [],
      message: "No records found",
      error: "No records found",
    };
  }

  return {
    data: records,
    message: "Records found successfully",
    error: null,
  };
};
