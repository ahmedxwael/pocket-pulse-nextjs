import prisma from "@/prisma/index";

export async function getOverviewRecords() {
  const records = await prisma.record.findMany({
    where: {
      OR: [
        {
          type: "INCOME",
        },
        {
          type: "EXPENSE",
        },
      ],
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
