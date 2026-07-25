'use client';

import React from 'react';
import { Employee } from '../../types/employee';
import { EmployeeGridCard } from './EmployeeGridCard';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

interface EmployeeListProps {
  employees: Employee[];
  total: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  search: string;
  onSearchChange: (query: string) => void;
  isActiveFilter: string;
  onFilterChange: (status: string) => void;
  sortBy: 'name' | 'salary' | 'createdAt' | 'doj';
  sortOrder: 'ASC' | 'DESC';
  onSortChange: (field: 'name' | 'salary' | 'createdAt' | 'doj') => void;
  onPageChange: (newPage: number) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
  onOpenCreateModal: () => void;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({
  employees,
  total,
  page,
  totalPages,
  isLoading,
  search,
  onSearchChange,
  isActiveFilter,
  onFilterChange,
  sortBy,
  sortOrder,
  onSortChange,
  onPageChange,
  onEdit,
  onDelete,
  onOpenCreateModal,
}) => {
  const renderSortIcon = (field: 'name' | 'salary' | 'createdAt' | 'doj') => {
    if (sortBy !== field) return <ArrowUpDown className="w-3 h-3 text-slate-400" />;
    return sortOrder === 'ASC' ? (
      <ArrowUp className="w-3 h-3 text-indigo-600 font-bold" />
    ) : (
      <ArrowDown className="w-3 h-3 text-indigo-600 font-bold" />
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Search, Filter & Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search employees by name or email..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        {/* Filter Dropdown & Add Button */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          {/* Status Filter */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 flex-1 sm:flex-initial">
            <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" />
            <select
              value={isActiveFilter}
              onChange={(e) => onFilterChange(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer w-full"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>

          <button
            onClick={onOpenCreateModal}
            className="px-4 sm:px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 flex-1 sm:flex-initial"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Main Data Container */}
      <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm mt-12 pt-4">
        {/* Column Headings Bar (Clickable Sorting on Desktop) */}
        <div className="hidden md:grid md:grid-cols-12 gap-2 px-4 py-3 bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500 select-none items-center">
          <div className="col-span-1">NO.</div>

          <button
            onClick={() => onSortChange('name')}
            className="col-span-3 flex items-center gap-1.5 hover:text-slate-900 transition-colors text-left"
          >
            <span>NAME</span>
            {renderSortIcon('name')}
          </button>

          <div className="col-span-3">EMAIL</div>

          <button
            onClick={() => onSortChange('salary')}
            className="col-span-2 flex items-center gap-1.5 hover:text-slate-900 transition-colors text-left"
          >
            <span>SALARY</span>
            {renderSortIcon('salary')}
          </button>

          <button
            onClick={() => onSortChange('doj')}
            className="col-span-1 flex items-center gap-1.5 hover:text-slate-900 transition-colors text-left"
          >
            <span>DOJ</span>
            {renderSortIcon('doj')}
          </button>

          <div className="col-span-1">SKILLS</div>

          <div className="col-span-1 text-right">ACTIONS</div>
        </div>

        {/* Employee List Content */}
        {isLoading ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium">Loading employee records...</p>
          </div>
        ) : employees.length === 0 ? (
          <div className="p-16 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-1">
              <Search className="w-6 h-6" />
            </div>
            <p className="text-base font-bold text-slate-900">No employees found</p>
            <p className="text-xs text-slate-500 max-w-sm">
              No matching records found. Try clearing search query or status filter.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {employees.map((emp, index) => (
              <EmployeeGridCard
                key={emp.id}
                index={(page - 1) * 10 + index}
                employee={emp}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}

        {/* Server-Side Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 bg-slate-50/50 border-t border-slate-200 text-xs text-slate-500">
            <div>
              Page <span className="font-bold text-slate-900">{page}</span> of{' '}
              <span className="font-bold text-slate-900">{totalPages}</span> ({total} total records)
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1 || isLoading}
                onClick={() => onPageChange(page - 1)}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={page >= totalPages || isLoading}
                onClick={() => onPageChange(page + 1)}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
