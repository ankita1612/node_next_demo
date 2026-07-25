'use client';

import React from 'react';
import { Employee } from '../../types/employee';
import { Edit3, Trash2, Calendar, DollarSign, Mail } from 'lucide-react';

interface EmployeeGridCardProps {
  employee: Employee;
  index?: number;
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

export const EmployeeGridCard: React.FC<EmployeeGridCardProps> = ({
  employee,
  index,
  onEdit,
  onDelete,
}) => {
  const formatCurrency = (val: number, salaryType: string) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
    return `${formatted} / ${salaryType === 'YEAR' ? 'yr' : 'mo'}`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 p-4 hover:bg-slate-50/80 transition-colors text-sm">
      {/* Desktop Grid Row Layout (12 Columns) */}
      <div className="hidden md:grid md:grid-cols-12 gap-2 items-center">
        {/* 1. NO. */}
        <div className="col-span-1 text-xs font-bold font-mono text-slate-500">
          #{index !== undefined ? index + 1 : employee.id}
        </div>

        {/* 2. NAME */}
        <div className="col-span-3 flex items-center gap-2.5 min-w-0">
          <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
            {employee.name}
          </div>
        </div>

        {/* 3. EMAIL */}
        <div className="col-span-3 text-xs text-slate-600 flex items-center gap-1.5 min-w-0">
          <span className="truncate">{employee.email}</span>
        </div>

        {/* 4. SALARY */}
        <div className="col-span-2 text-xs font-bold text-emerald-700 flex items-center gap-1 min-w-0">
          <span>{employee.salary}</span>
        </div>

        {/* 5. DOJ */}
        <div className="col-span-1 text-xs text-slate-600 flex items-center gap-1 min-w-0">
          <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="truncate">{formatDate(employee.doj)}</span>
        </div>

        {/* 6. SKILLS */}
        <div className="col-span-1 flex flex-wrap gap-1 min-w-0">
          {employee.skills && employee.skills.length > 0 ? (
            <span
              className="px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-[11px] font-semibold text-indigo-700 truncate"
              title={employee.skills.join(', ')}
            >
              {employee.skills[0]} {employee.skills.length > 1 ? `+${employee.skills.length - 1}` : ''}
            </span>
          ) : (
            <span className="text-xs text-slate-400">None</span>
          )}
        </div>

        {/* 7. ACTIONS */}
        <div className="col-span-1 flex items-center justify-end gap-1.5 flex-shrink-0">
          <button
            onClick={() => onEdit(employee)}
            className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition-colors shadow-xs"
            title="Edit Employee"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
                onDelete(employee.id);
              }
            }}
            className="p-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors shadow-xs"
            title="Delete Employee"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Responsive Layout (< md) */}
      <div className="block md:hidden space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold font-mono text-slate-400">
              #{index !== undefined ? index + 1 : employee.id}
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-xs uppercase">
              {employee.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{employee.name}</h4>
              <p className="text-xs text-slate-500">{employee.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onEdit(employee)}
              className="p-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-indigo-600 shadow-xs"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
                  onDelete(employee.id);
                }
              }}
              className="p-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 shadow-xs"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
          <div>
            <span className="text-slate-400 block text-[11px]">Salary</span>
            <span className="font-bold text-emerald-700">
              {formatCurrency(employee.salary, employee.salaryType)}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">DOJ</span>
            <span className="text-slate-700 font-medium">{formatDate(employee.doj)}</span>
          </div>
        </div>

        {employee.skills && employee.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {employee.skills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-[11px] font-semibold text-indigo-700"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
