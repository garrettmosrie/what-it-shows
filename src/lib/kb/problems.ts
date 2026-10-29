// The problems inside one merged ticket. Pages explain them; this file is what runs.

// A report's problem is its cause by tenant (causes.ts), with one exception: the reports the desk
// read as a one-day move (desk-notes.json). A day/month swap can't move a date by one day, so those
// are a problem of their own, not a footnote under the cause their tenant would give them.
import { groupByCause, uniqueById, type CauseGroup, type Report, type Tenant } from '#lib/kb/causes';

export type Problem = CauseGroup['cause'] | 'one-day';

export type ProblemGroup = Omit<CauseGroup, 'cause'> & { problem: Problem };

export type TicketProblems = {
  // Rows in the export, before uniqueById: pages overlap, so a report can come twice.
  exported: number;
  reports: Report[];
  groups: ProblemGroup[];
};

export function problemsIn(
  all: Report[],
  ticket: number,
  tenantOf: (r: Report) => Tenant | undefined,
  oneDayMove: readonly string[],
): TicketProblems {
  const inTicket = all.filter((r) => r.mergedInto === ticket);
  const reports = uniqueById(inTicket);
  const moved = reports.filter((r) => oneDayMove.includes(r.id));
  const rest = reports.filter((r) => !oneDayMove.includes(r.id));

  const groups: ProblemGroup[] = groupByCause(rest, tenantOf).map(({ cause, ...g }) => ({ problem: cause, ...g }));
  // No tenant lookup: every moved report lands in one group, which is then named for what it is.
  for (const { cause: _, ...g } of groupByCause(moved, () => undefined)) groups.push({ problem: 'one-day', ...g });

  return { exported: inTicket.length, reports, groups: groups.sort((a, b) => b.reports.length - a.reports.length) };
}
