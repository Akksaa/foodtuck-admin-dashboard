"use client"

import React, { useState, useCallback } from 'react';
import { Table } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  ChevronUp, 
  ChevronDown,
  User as UserIcon,
  Mail,
  Calendar,
  UserCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Edit,
} from 'lucide-react';
import type { User, SortConfig, CustomersTableProps } from '@/types/customers';

const ITEMS_PER_PAGE = 5;

const CustomersTable: React.FC<CustomersTableProps> = ({ 
  users,
  onEdit,
  onDelete,
  onBulkDelete
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ 
    key: 'created', 
    direction: 'desc' 
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  // Search and filter with type safety
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Type-safe sorting
  const sortData = useCallback((key: keyof User) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  const getSortedData = useCallback((): User[] => {
    return [...filteredUsers].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredUsers, sortConfig]);

  // Pagination with safety checks
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  
  const paginatedData = getSortedData().slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE
  );

  // Bulk selection with type safety
  const toggleSelectAll = useCallback(() => {
    setSelectedUsers(prev => 
      prev.length === paginatedData.length ? [] : paginatedData.map(user => user.id)
    );
  }, [paginatedData]);

  const toggleSelectUser = useCallback((userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  }, []);

  const formatDate = useCallback((dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Invalid date format:', error);
      return 'Invalid date';
    }
  }, []);

  const handleBulkDelete = useCallback(() => {
    if (selectedUsers.length > 0 && onBulkDelete) {
      onBulkDelete(selectedUsers);
      setSelectedUsers([]);
    }
  }, [selectedUsers, onBulkDelete]);

  const SortIcon: React.FC<{ columnKey: keyof User }> = ({ columnKey }) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === 'asc' ? 
        <ChevronUp className="w-4 h-4 inline ml-1" /> : 
        <ChevronDown className="w-4 h-4 inline ml-1" />;
    }
    return null;
  };

  // Safety check for empty state
  if (users.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No customers found
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Search and Bulk Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4  text-gray-500" />
            <Input
              placeholder="Search customers..."
              className="pl-8 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {selectedUsers.length > 0 && onBulkDelete && (
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-600"
              onClick={handleBulkDelete}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Selected ({selectedUsers.length})
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={selectedUsers.length === paginatedData.length}
                  onChange={toggleSelectAll}
                />
              </th>
              {[
                { key: 'username' as const, icon: UserIcon, label: 'Username' },
                { key: 'email' as const, icon: Mail, label: 'Email' },
                { key: 'role' as const, icon: UserCircle, label: 'Role' },
                { key: 'created' as const, icon: Calendar, label: 'Joined' },
              ].map(({ key, icon: Icon, label }) => (
                <th 
                  key={key}
                  className="p-4 text-left text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => sortData(key)}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                    <SortIcon columnKey={key} />
                  </div>
                </th>
              ))}
              <th className="p-4 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((user) => (
              <tr 
                key={user.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleSelectUser(user.id)}
                  />
                </td>
                <td className="p-4 text-sm text-gray-900">{user.username}</td>
                <td className="p-4 text-sm text-gray-500">{user.email}</td>
                <td className="p-4 text-sm">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.role === 'admin' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-amber-100 text-primYellow'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-500">{formatDate(user.created)}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    {onEdit && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onEdit(user)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600"
                        onClick={() => onDelete(user.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {((safeCurrentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(safeCurrentPage * ITEMS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length} customers
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomersTable;