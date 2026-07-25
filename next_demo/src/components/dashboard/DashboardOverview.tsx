'use client';

import React from 'react';
import Link from 'next/link';
import { Users, FileText, ArrowRight, ShieldCheck, Database, LayoutDashboard } from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-indigo-100 border border-white/20">
            <LayoutDashboard className="w-3.5 h-3.5" /> Next.js & Express Platform
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Enterprise Overview Dashboard</h1>
          <p className="text-indigo-100 text-sm sm:text-base leading-relaxed">
            Manage employee directories and user posts with PostgreSQL database persistence and Yup schema validations.
          </p>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Employee Module Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Employee Management</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Complete Employee CRUD with Yup validation, PostgreSQL SERIAL primary keys, salary types, and active status filtering.
            </p>
          </div>
          <Link
            href="/employees"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors pt-4 border-t border-slate-100"
          >
            <span>Open Employee Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Post Module Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-4 group-hover:scale-105 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Post Management</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Full Post CRUD supporting name, comment text, entry date, and PostgreSQL soft deletes.
            </p>
          </div>
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors pt-4 border-t border-slate-100"
          >
            <span>Open Post Management</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tech Stack Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Architecture & Security</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Yup validation on Express backend and React Hook Form frontend. Light theme design tokens with Tailwind CSS.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Database className="w-4 h-4 text-slate-400" />
            <span>PostgreSQL Engine on Port 4000</span>
          </div>
        </div>
      </div>
    </div>
  );
};
