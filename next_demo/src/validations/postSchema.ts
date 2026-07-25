import * as yup from 'yup';

export const postFormSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .required('Name is required'),
  comment: yup
    .string()
    .trim()
    .min(3, 'Comment must be at least 3 characters')
    .required('Comment is required'),
  date: yup
    .string()
    .required('Date is required')
    .test('valid-date', 'Please enter a valid date', (val) => !val || !isNaN(Date.parse(val))),
});
