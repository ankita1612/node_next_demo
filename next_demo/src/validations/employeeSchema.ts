import * as yup from 'yup';

export const employeeFormSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .required('Name is required'),
  email: yup
    .string()
    .trim()
    .lowercase()
    .email('Please enter a valid email address')
    .max(150, 'Email cannot exceed 150 characters')
    .required('Email is required'),
  doj: yup
    .string()
    .required('Date of Joining is required')
    .test('valid-date', 'Please enter a valid date', (val) => !val || !isNaN(Date.parse(val))),
  salary: yup
    .number()
    .typeError('Salary must be a valid number')
    .positive('Salary must be a positive number greater than 0')
    .required('Salary is required'),
  skills: yup
    .string()
    .required('At least one skill is required (comma-separated)')
    .test('has-skill', 'Please enter at least one skill', (val) => {
      if (!val) return false;
      const parsed = val.split(',').map((s) => s.trim()).filter(Boolean);
      return parsed.length > 0;
    }),
  salaryType: yup
    .string()
    .oneOf(['MONTH', 'YEAR'], 'Salary type must be MONTH or YEAR')
    .required('Salary type is required'),
  isActive: yup
    .boolean()
    .default(true),
});
