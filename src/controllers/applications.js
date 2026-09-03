import { Op } from 'sequelize';
import JobApplication from '../models/job-application.js';
import { createApplicationSchema, listApplicationsSchema, updateApplicationSchema } from '../validators/application.js';

const today = () => new Date().toISOString().slice(0, 10);
const owned = (id, userId) => JobApplication.findOne({ where: { id, userId } });
const missing = (res) => res.status(404).json({ error: { message: 'Application not found' } });

export async function create(req, res) { const application = await JobApplication.create({ ...createApplicationSchema.parse(req.body), userId: req.user.id }); res.status(201).json({ data: application }); }

export async function list(req, res) {
  const { page, limit, q, status, followUp } = listApplicationsSchema.parse(req.query); const where = { userId: req.user.id };
  if (q) where[Op.or] = [{ companyName: { [Op.iLike]: `%${q}%` } }, { jobTitle: { [Op.iLike]: `%${q}%` } }];
  if (status) where.status = status;
  if (followUp) where.nextFollowUpAt = { [followUp === 'today' ? Op.eq : followUp === 'overdue' ? Op.lt : Op.gt]: today() };
  const { count, rows } = await JobApplication.findAndCountAll({ where, order: [['updatedAt', 'DESC']], limit, offset: (page - 1) * limit });
  res.json({ data: rows, pagination: { page, limit, total: count, totalPages: Math.ceil(count / limit) } });
}

export async function get(req, res) { const application = await owned(req.params.id, req.user.id); return application ? res.json({ data: application }) : missing(res); }
export async function update(req, res) { const application = await owned(req.params.id, req.user.id); if (!application) return missing(res); await application.update(updateApplicationSchema.parse(req.body)); return res.json({ data: application }); }
export async function remove(req, res) { const application = await owned(req.params.id, req.user.id); if (!application) return missing(res); await application.destroy(); return res.status(204).end(); }
