import { z } from 'zod';
import { STATUSES } from '../models/job-application.js';

const optional = (schema) => schema.optional().nullable();
const fields = {
  companyName: z.string().trim().min(1).max(255), jobTitle: z.string().trim().min(1).max(255), location: optional(z.string().trim().max(255)),
  workType: optional(z.enum(['WFO', 'WFH', 'HYBRID'])), source: optional(z.string().trim().max(255)), applicationUrl: optional(z.string().url()), appliedAt: z.string().date(), status: optional(z.enum(STATUSES)),
  salaryRange: optional(z.string().trim().max(255)), contactName: optional(z.string().trim().max(255)), contactEmail: optional(z.string().trim().email()), nextFollowUpAt: optional(z.string().date()), notes: optional(z.string().trim()),
};
export const createApplicationSchema = z.object(fields);
export const updateApplicationSchema = z.object(fields).partial().refine((value) => Object.keys(value).length, 'At least one field is required');
export const listApplicationsSchema = z.object({ page: z.coerce.number().int().min(1).default(1), limit: z.coerce.number().int().min(1).max(100).default(20), q: z.string().trim().max(255).optional(), status: z.enum(STATUSES).optional(), followUp: z.enum(['today', 'overdue', 'upcoming']).optional() });
