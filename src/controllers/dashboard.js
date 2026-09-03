import { Op } from 'sequelize';
import JobApplication, { TERMINAL_STATUSES } from '../models/job-application.js';

const today = () => new Date().toISOString().slice(0, 10);
const active = { [Op.notIn]: TERMINAL_STATUSES };

export async function summary(req, res) {
  const userId = req.user.id; const base = { userId };
  const [total, activeApplications, interview, accepted, rejected, followUpDue] = await Promise.all([
    JobApplication.count({ where: base }), JobApplication.count({ where: { ...base, status: active } }), JobApplication.count({ where: { ...base, status: ['INTERVIEW', 'TECHNICAL_TEST', 'USER_INTERVIEW'] } }), JobApplication.count({ where: { ...base, status: 'ACCEPTED' } }), JobApplication.count({ where: { ...base, status: 'REJECTED' } }), JobApplication.count({ where: { ...base, status: active, nextFollowUpAt: { [Op.lte]: today() } } }),
  ]);
  res.json({ data: { total, active: activeApplications, interview, accepted, rejected, followUpDue } });
}

export async function followUps(req, res) {
  const current = today(); const applications = await JobApplication.findAll({ where: { userId: req.user.id, status: active, nextFollowUpAt: { [Op.not]: null } }, order: [['nextFollowUpAt', 'ASC']] });
  res.json({ data: applications.map((application) => ({ ...application.toJSON(), followUpType: application.nextFollowUpAt < current ? 'overdue' : application.nextFollowUpAt === current ? 'today' : 'upcoming' })) });
}
