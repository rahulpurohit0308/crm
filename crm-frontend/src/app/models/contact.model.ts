export interface Contact {
  id?: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  company?: string;
  status?: 'LEAD' | 'PROSPECT' | 'CUSTOMER' | 'CHURNED';
  ownerName?: string;
  createdAt?: string;
}