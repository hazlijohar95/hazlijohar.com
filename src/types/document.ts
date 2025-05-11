
export interface Document {
  id: string;
  name: string;
  serviceType: string;
  uploadDate: string;
  year: number;
  userId: string;
  size?: number;
  fileUrl?: string;
  fileType?: string;
}

export type DocumentFormData = {
  file: File;
  serviceType: string;
};

export const SERVICE_TYPES = [
  'Tax',
  'Audit',
  'Payroll',
  'Advisory',
  'Insurance',
  'Legal',
  'Other'
];
