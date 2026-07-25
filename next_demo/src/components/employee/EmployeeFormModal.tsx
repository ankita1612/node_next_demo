'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { X, User, Mail, Calendar, DollarSign, Tag, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { employeeFormSchema } from '../../validations/employeeSchema';
import { Employee, EmployeeFormInputs } from '../../types/employee';

interface EmployeeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeFormInputs) => Promise<void>;
  initialData?: Employee | null;
  isLoading: boolean;
  errorMessage?: string | null;
}

export const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
  errorMessage,
}) => {
  const isEditing = Boolean(initialData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormInputs>({
    resolver: yupResolver(employeeFormSchema),
    defaultValues: {
      name: '',
      email: '',
      doj: new Date().toISOString().split('T')[0],
      salary: 50000,
      skills: '',
      salaryType: 'MONTH',
      isActive: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      const formattedDoj = initialData.doj ? new Date(initialData.doj).toISOString().split('T')[0] : '';
      reset({
        name: initialData.name,
        email: initialData.email,
        doj: formattedDoj,
        salary: Number(initialData.salary),
        skills: Array.isArray(initialData.skills) ? initialData.skills.join(', ') : '',
        salaryType: initialData.salaryType || 'MONTH',
        isActive: initialData.isActive,
      });
    } else {
      reset({
        name: '',
        email: '',
        doj: new Date().toISOString().split('T')[0],
        salary: 50000,
        skills: 'TypeScript, React, Node.js',
        salaryType: 'MONTH',
        isActive: true,
      });
    }
  }, [initialData, reset, isOpen]);

  if (!isOpen) return null;

  const handleFormSubmit = async (data: EmployeeFormInputs) => {
    await onSubmit(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-2xl text-slate-900 p-6 sm:p-8 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                <User className="w-5 h-5" />
              </span>
              {isEditing ? 'Edit Employee Details' : 'Add New Employee'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isEditing
                ? 'Update employee record information and save changes'
                : 'Enter employee details below to add a new team member'}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Error Callout */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-rose-900">Submission Error</p>
              <p className="text-xs text-rose-700 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* RHF Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="e.g. Sarah Connor"
                {...register('name')}
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.name
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
                    : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-500/20'
                }`}
              />
            </div>
            {errors.name && <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.name.message}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                placeholder="e.g. sarah@example.com"
                {...register('email')}
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
                    : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-500/20'
                }`}
              />
            </div>
            {errors.email && <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.email.message}</p>}
          </div>

          {/* Date of Joining & Salary Type (2 Columns Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date of Joining */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Date of Joining <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  type="date"
                  {...register('doj')}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.doj
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
                      : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-500/20'
                  }`}
                />
              </div>
              {errors.doj && <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.doj.message}</p>}
            </div>

            {/* Salary Type Enum */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Salary Type <span className="text-rose-500">*</span>
              </label>
              <select
                {...register('salaryType')}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              >
                <option value="MONTH">MONTH (Monthly)</option>
                <option value="YEAR">YEAR (Annual CTC)</option>
              </select>
              {errors.salaryType && <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.salaryType.message}</p>}
            </div>
          </div>

          {/* Salary Amount */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Salary Amount (USD) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <DollarSign className="w-4 h-4" />
              </div>
              <input
                type="number"
                step="0.01"
                placeholder="e.g. 75000"
                {...register('salary', { valueAsNumber: true })}
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.salary
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
                    : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-500/20'
                }`}
              />
            </div>
            {errors.salary && <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.salary.message}</p>}
          </div>

          {/* Skills (Comma Separated) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Skills (Comma Separated) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Tag className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="e.g. React, Node.js, PostgreSQL, TypeScript"
                {...register('skills')}
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.skills
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
                    : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-500/20'
                }`}
              />
            </div>
            {errors.skills && <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.skills.message}</p>}
          </div>

          {/* Active Status Checkbox */}
          <div className="pt-2">
            <label className="inline-flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                {...register('isActive')}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Active Employee Status
              </span>
            </label>
          </div>

          {/* Modal Actions Footer */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEditing ? 'Save Changes' : 'Create Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
