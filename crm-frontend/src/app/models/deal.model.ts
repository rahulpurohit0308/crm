export interface Deal {
  id?: number;
  title: string;
  value?: number;
  currency?: string;
  stage: 'LEAD' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'WON' | 'LOST';
  contactId?: number;
  contactName?: string;
  ownerName?: string;
  createdAt?: string;
}