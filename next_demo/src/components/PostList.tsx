'use client';

import React from 'react';
import { Post } from '../types/post';
import {
  Edit3,
  Trash2,
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  FileText,
  User,
} from 'lucide-react';

interface PostListProps {
  posts: Post[];
  total: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  search: string;
  onSearchChange: (query: string) => void;
  onPageChange: (newPage: number) => void;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
  onOpenCreateModal: () => void;
}

export const PostList: React.FC<PostListProps> = ({
  posts,
  total,
  page,
  totalPages,
  isLoading,
  search,
  onSearchChange,
  onPageChange,
  onEdit,
  onDelete,
  onOpenCreateModal,
}) => {
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
    <div className="w-full space-y-6">
      {/* Search & Action Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search posts by name or comment..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
        </div>

        {/* Add Post Button */}
        <button
          onClick={onOpenCreateModal}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md shadow-purple-500/20 transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Post</span>
        </button>
      </div>

      {/* Main Table / Grid Container */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium">Loading post records...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-16 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-400 mb-1">
              <FileText className="w-6 h-6" />
            </div>
            <p className="text-base font-bold text-slate-900">No posts found</p>
            <p className="text-xs text-slate-500 max-w-sm">
              No matching post records found. Click below to add your first post.
            </p>
            <button
              onClick={onOpenCreateModal}
              className="mt-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold text-xs rounded-xl border border-purple-200 transition-colors"
            >
              Create First Post
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3.5 px-6">ID</th>
                    <th className="py-3.5 px-6">Author Name</th>
                    <th className="py-3.5 px-6">Comment / Message</th>
                    <th className="py-3.5 px-6">Date</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {posts.map((post) => (
                    <tr
                      key={post.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* ID */}
                      <td className="py-4 px-6 font-mono text-xs text-slate-500 font-semibold">
                        #{post.id}
                      </td>

                      {/* Author */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center font-bold text-purple-600 uppercase">
                            <User className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                            {post.name}
                          </span>
                        </div>
                      </td>

                      {/* Comment */}
                      <td className="py-4 px-6 text-slate-700 font-medium max-w-md">
                        <p className="line-clamp-2 leading-relaxed text-xs sm:text-sm">
                          {post.comment}
                        </p>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-slate-700 font-medium">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-purple-500" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onEdit(post)}
                            className="p-2 rounded-xl text-slate-500 hover:text-purple-600 hover:bg-slate-100 transition-colors"
                            title="Edit Post"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete post by ${post.name}?`)) {
                                onDelete(post.id);
                              }
                            }}
                            className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                            title="Delete Post"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Responsive Card View */}
            <div className="block lg:hidden divide-y divide-slate-100">
              {posts.map((post) => (
                <div key={post.id} className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center font-bold text-purple-600 text-xs">
                        #{post.id}
                      </div>
                      <span className="font-bold text-slate-900">{post.name}</span>
                    </div>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-purple-500" /> {formatDate(post.date)}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                    {post.comment}
                  </p>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => onEdit(post)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-purple-700 transition-colors flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete post by ${post.name}?`)) {
                          onDelete(post.id);
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-xs font-semibold text-rose-700 border border-rose-200 transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50/50 text-xs text-slate-500">
            <div>
              Page <span className="font-bold text-slate-900">{page}</span> of{' '}
              <span className="font-bold text-slate-900">{totalPages}</span> ({total} total posts)
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
