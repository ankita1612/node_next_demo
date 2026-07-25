export declare class EmployeeController {
    /**
     * POST /employees - Create new employee
     */
    static createEmployee: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    /**
     * GET /employees - Fetch all employees with pagination, search, sorting
     */
    static getAllEmployees: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    /**
     * GET /employees/:id - Fetch employee by ID
     */
    static getEmployeeById: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    /**
     * PUT /employees/:id - Update employee
     */
    static updateEmployee: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    /**
     * DELETE /employees/:id - Soft delete employee
     */
    static deleteEmployee: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
}
