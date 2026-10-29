# what it shows: #4471 split into its problems

This repo is the support desk's kb export (2026-10-04) with one page added. Ticket #4471 was
marked known as one issue with 412 reports. Placed by cause, those reports are three problems,
each filed as an issue here with the number of reports it covers:

- [#1](../../issues/1) `parser`: the shared parser reads day-first dates month first
- [#2](../../issues/2) `hint`: the booking-v3 form tells day-first tenants to type MM/DD/YYYY
- [#3](../../issues/3) `one-day`: dates that move by one day, not a day/month swap

Each issue states the count the desk's own cause table gives that problem. The page shows the
same table, rendered at build time.

## The page

- Source: [`src/routes/kb/incidents/4471/problems/+page.svx`](src/routes/kb/incidents/4471/problems/+page.svx), signed, ending with `<RenderStamp {signature} />`. It uses only the kb's own components, as exported (`CauseTable`, `Callout`, `RenderStamp`).
- As the desk sees it, rendered by this kb's own layout and components: [`desk-view/4471-problems.html`](desk-view/4471-problems.html) (standalone HTML) and [`desk-view/4471-problems.png`](desk-view/4471-problems.png) (screenshot).

## Render it yourself

The export ships `src/` only. `package.json`, `svelte.config.js`, `vite.config.js`, `src/app.html`
and `src/routes/+layout.js` are the build setup added here (SvelteKit + mdsvex, static output):

```
npm install
npm run build    # writes build/kb/incidents/4471/problems.html
```

---

# kb — the support knowledge base

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.
