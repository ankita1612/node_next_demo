'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Post, PostFormInputs } from '../../types/post';
import {
  fetchPosts,
  createPostApi,
  updatePostApi,
  deletePostApi,
} from '../../services/post/postApi';
import { PostList } from '../../components/post/PostList';
import { PostFormModal } from '../../components/post/PostFormModal';
import { AlertTriangle } from 'lucide-react';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const result = await fetchPosts({
        page,
        limit: 10,
        search,
      });

      setPosts(result.data);
      setTotal(result.meta.total);
      setTotalPages(result.meta.totalPages);
    } catch (err: any) {
      console.error('Failed to load posts:', err);
      setApiError(err.message || 'Unable to connect to Node.js backend server at http://localhost:4000');
    } finally {
      setIsLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleOpenCreateModal = () => {
    setSelectedPost(null);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (post: Post) => {
    setSelectedPost(post);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData: PostFormInputs) => {
    setIsSubmitting(true);
    setFormError(null);
    try {
      if (selectedPost) {
        await updatePostApi(selectedPost.id, formData);
      } else {
        await createPostApi(formData);
      }
      setIsModalOpen(false);
      setSelectedPost(null);
      await loadPosts();
    } catch (err: any) {
      setFormError(err.message || 'Failed to save post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      await deletePostApi(id);
      await loadPosts();
    } catch (err: any) {
      alert(err.message || 'Failed to delete post');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Post Management</h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage author comments and post messages with PostgreSQL persistence
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
            onClick={loadPosts}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
          >
            Retry Connection
          </button>
        </div>
      )}

      <PostList
        posts={posts}
        total={total}
        page={page}
        totalPages={totalPages}
        isLoading={isLoading}
        search={search}
        onSearchChange={(q) => {
          setSearch(q);
          setPage(1);
        }}
        onPageChange={(p) => setPage(p)}
        onEdit={handleOpenEditModal}
        onDelete={handleDeletePost}
        onOpenCreateModal={handleOpenCreateModal}
      />

      <PostFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedPost}
        isLoading={isSubmitting}
        errorMessage={formError}
      />
    </div>
  );
}
