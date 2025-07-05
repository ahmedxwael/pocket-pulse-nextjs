import prisma from "@/prisma/config";

export async function getOverviewRecords() {
  const records = await prisma.income.findMany({
    where: {
      userId: "",
    },
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
}
