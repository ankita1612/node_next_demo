import { Employee } from '../../types/employee';
import { fetchEmployees } from '../employee/employeeApi';
import { fetchPosts } from '../post/postApi';

export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  totalPosts: number;
}

export const fetchDashboardOverview = async (): Promise<DashboardStats> => {
  try {
    const [employeeResult, postResult] = await Promise.all([
      fetchEmployees({ limit: 100 }),
      fetchPosts({ limit: 100 }),
    ]);

    const totalEmployees = employeeResult.meta.total;
    const activeEmployees = employeeResult.data.filter((e: Employee) => e.isActive).length;
    const totalPosts = postResult.meta.total;

    return {
      totalEmployees,
      activeEmployees,
      totalPosts,
    };
  } catch {
    return {
      totalEmployees: 0,
      activeEmployees: 0,
      totalPosts: 0,
    };
  }
};
