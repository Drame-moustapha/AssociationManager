export type BackendRole = 'ADMIN' | 'ASSOCIATION_ADMIN' | 'MEMBER';

export interface User {
  userId: string;
  email: string;
  role: BackendRole;
  associationId: string | null;
}
