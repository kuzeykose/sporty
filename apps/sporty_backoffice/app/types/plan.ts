export type CreatePlan = {
  programId: string;
  planName: string;
  planDescription: string;
  planNote: string;
  startDate: string;
  endDate: string;
  image: { key: string; data: string; type: string };
};
