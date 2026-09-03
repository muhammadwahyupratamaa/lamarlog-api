import { Op } from 'sequelize';
import JobApplication from '../models/job-application.js';
import ApplicationStatusHistory from '../models/application-status-history.js';
import { sequelize } from '../config/database.js';
import { createApplicationSchema, listApplicationsSchema, updateApplicationSchema, updateStatusSchema } from '../validators/application.js';

const today = () => new Date().toISOString().slice(0, 10);
const owned = (id, userId) => JobApplication.findOne({ where: { id, userId } });
const missing = (res) => res.status(404).json({ error: { message: 'Application not found' } });

export async function create(req, res) {
  const input = createApplicationSchema.parse(req.body);
  const application = await sequelize.transaction(async (transaction) => {
    const created = await JobApplication.create({ ...input, userId: req.user.id }, { transaction });
    await ApplicationStatusHistory.create({ applicationId: created.id, oldStatus: null, newStatus: created.status }, { transaction });
    return created;
  });
  res.status(201).json({ data: application });
}

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
export async function status(req, res) {
  const input = updateStatusSchema.parse(req.body); const application = await owned(req.params.id, req.user.id); if (!application) return missing(res);
  await sequelize.transaction(async (transaction) => {
    const oldStatus = application.status; await application.update({ status: input.status }, { transaction });
    await ApplicationStatusHistory.create({ applicationId: application.id, oldStatus, newStatus: input.status, note: input.note }, { transaction });
  });
  res.json({ data: application });
}
export async function history(req, res) { const application = await owned(req.params.id, req.user.id); if (!application) return missing(res); res.json({ data: await ApplicationStatusHistory.findAll({ where: { applicationId: application.id }, order: [['createdAt', 'ASC']] }) }); }
