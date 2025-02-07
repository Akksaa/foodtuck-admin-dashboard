// types.ts
export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  created: string;
};

export type SortConfig = {
  key: keyof User;
  direction: 'asc' | 'desc';
};

export type CustomersTableProps = {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (userId: string) => void;
  onBulkDelete?: (userIds: string[]) => void;
};