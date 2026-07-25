import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  createEmployeeSchema,
  updateEmployeeSchema,
  getEmployeeByIdSchema,
  getEmployeesQuerySchema,
} from '../validations/employee.validation.js';

const router: Router = Router();

router
  .route('/')
  .post(validate(createEmployeeSchema), EmployeeController.createEmployee)
  .get(validate(getEmployeesQuerySchema), EmployeeController.getAllEmployees);

router
  .route('/:id')
  .get(validate(getEmployeeByIdSchema), EmployeeController.getEmployeeById)
  .put(validate(updateEmployeeSchema), EmployeeController.updateEmployee)
  .delete(validate(getEmployeeByIdSchema), EmployeeController.deleteEmployee);

export default router;
