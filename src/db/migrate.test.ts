import assert from 'node:assert/strict';
import test from 'node:test';
import Database from 'better-sqlite3';
import { migrate } from './migrate.ts';

test('applies migrations and creates the SPEC §3 tables', () => {
  const db = new Database(':memory:');
  const applied = migrate(db);

  assert.ok(applied.includes('0001_init.sql'));

  const tables = new Set(
    (db.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all() as { name: string }[]).map(
      (r) => r.name
    )
  );
  for (const table of ['users', 'pages', 'page_versions', 'block_types', 'assets', 'leads']) {
    assert.ok(tables.has(table), `missing table ${table}`);
  }

  db.close();
});

test('is idempotent — re-running applies nothing new', () => {
  const db = new Database(':memory:');
  migrate(db);
  const second = migrate(db);
  assert.deepEqual(second, []);
  db.close();
});

test('enforces a single published version per page', () => {
  const db = new Database(':memory:');
  migrate(db);

  db.prepare("INSERT INTO users (email, password_hash, name) VALUES ('a@a.com', 'x', 'A')").run();
  db.prepare("INSERT INTO pages (slug, title, created_by) VALUES ('home', 'Home', 1)").run();
  db.prepare(
    "INSERT INTO page_versions (page_id, version_number, status, created_by) VALUES (1, 1, 'published', 1)"
  ).run();

  assert.throws(() => {
    db.prepare(
      "INSERT INTO page_versions (page_id, version_number, status, created_by) VALUES (1, 2, 'published', 1)"
    ).run();
  }, /UNIQUE constraint failed/);

  db.close();
});
