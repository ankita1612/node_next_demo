'use client';

import React from 'react';
import { Employee } from '../types/employee';
import { Edit3, Trash2, Calendar, DollarSign, CheckCircle2, XCircle } from 'lucide-react';

interface EmployeeTableRowProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

export const EmployeeTableRow: React.FC<EmployeeTableRowProps> = ({
  employee,
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
    <tr className="hover:bg-slate-50/80 transition-colors group">
      {/* Name & Email */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-600 uppercase">
            {employee.name.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {employee.name}
            </div>
            <div className="text-xs text-slate-500">{employee.email}</div>
          </div>
        </div>
      </td>

      {/* Date of Joining */}
      <td className="py-4 px-6 text-slate-700 font-medium">
        <div className="flex items-center gap-1.5 text-xs">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{formatDate(employee.doj)}</span>
        </div>
      </td>

      {/* Salary & Type */}
      <td className="py-4 px-6 font-bold text-slate-900">
        <div className="flex items-center gap-1 text-xs">
          <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-emerald-700">
            {formatCurrency(employee.salary, employee.salaryType)}
          </span>
        </div>
      </td>

      {/* Skills */}
      <td className="py-4 px-6">
        <div className="flex flex-wrap gap-1.5 max-w-xs">
          {employee.skills && employee.skills.length > 0 ? (
            employee.skills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-[11px] font-semibold text-indigo-700"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-400">None</span>
          )}
        </div>
      </td>

      {/* Status */}
      <td className="py-4 px-6">
        {employee.isActive ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 border border-rose-200 text-rose-700">
            <XCircle className="w-3.5 h-3.5 text-rose-600" /> Inactive
          </span>
        )}
      </td>

      {/* Actions */}
      <td className="py-4 px-6 text-right">
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => onEdit(employee)}
            className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
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
            className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-slate-100 transition-colors"
            title="Delete Employee"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};
