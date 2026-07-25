'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Employee, EmployeeFormInputs } from '../../types/employee';
import {
  fetchEmployees,
  createEmployeeApi,
  updateEmployeeApi,
  deleteEmployeeApi,
} from '../../services/employee/employeeApi';
import { EmployeeList } from '../../components/employee/EmployeeList';
import { EmployeeFormModal } from '../../components/employee/EmployeeFormModal';
import { AlertTriangle } from 'lucide-react';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'salary' | 'createdAt' | 'doj'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadEmployees = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const activeParam =
        statusFilter === 'active' ? true : statusFilter === 'inactive' ? false : undefined;

      const result = await fetchEmployees({
        page,
        limit: 10,
        search,
        sortBy,
        sortOrder,
        isActive: activeParam,
      });

      setEmployees(result.data);
      setTotal(result.meta.total);
      setTotalPages(result.meta.totalPages);
    } catch (err: any) {
      console.error('Failed to load employees:', err);
      setApiError(err.message || 'Unable to connect to Node.js backend server at http://localhost:4000');
    } finally {
      setIsLoading(false);
    }
  }, [page, search, statusFilter, sortBy, sortOrder]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const handleSortChange = (field: 'name' | 'salary' | 'createdAt' | 'doj') => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
    } else {
      setSortBy(field);
      setSortOrder('ASC');
    }
    setPage(1);
  };

  const handleOpenCreateModal = () => {
    setSelectedEmployee(null);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData: EmployeeFormInputs) => {
    setIsSubmitting(true);
    setFormError(null);
    try {
      if (selectedEmployee) {
        await updateEmployeeApi(selectedEmployee.id, formData);
      } else {
        await createEmployeeApi(formData);
      }
      setIsModalOpen(false);
      setSelectedEmployee(null);
      await loadEmployees();
    } catch (err: any) {
      setFormError(err.message || 'Failed to save employee');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEmployee = async (id: number) => {
    try {
      await deleteEmployeeApi(id);
      await loadEmployees();
    } catch (err: any) {
      alert(err.message || 'Failed to delete employee');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Employee Directory</h2>
          <p className="text-xs text-slate-500 mt-1">
            searching
          </p>
        </div>
      </div>

      {apiError && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <span className="font-bold">Backend Connection Notice: </span>
              <span className="text-xs text-amber-800 font-medium">{apiError}</span>
            </div>
          </div>
          <button
            onClick={loadEmployees}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
          >
            Retry Connection
          </button>
        </div>
      )}

      <EmployeeList
        employees={employees}
        total={total}
        page={page}
        totalPages={totalPages}
        isLoading={isLoading}
        search={search}
        onSearchChange={(q) => {
          setSearch(q);
          setPage(1);
        }}
        isActiveFilter={statusFilter}
        onFilterChange={(status) => {
          setStatusFilter(status);
          setPage(1);
        }}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        onPageChange={(p) => setPage(p)}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteEmployee}
        onOpenCreateModal={handleOpenCreateModal}
      />

      <EmployeeFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedEmployee}
        isLoading={isSubmitting}
        errorMessage={formError}
      />
    </div>
  );
}
