import * as yup from "yup";
export const scheduleSchema = yup.object({
  ajzaMemorized: yup.number(),
  page: yup.number(),
  password: yup.string().required().min(6),
});
