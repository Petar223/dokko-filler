// Lists the placeholders of a .docx template and flags suspicious ones.
// Usage: npm run template:check -- path/to/template.docx
const mammoth = require('mammoth');
const path = require('path');
const CARD_FIELDS = require('../src/features/generate/cardFields.json');

const file = process.argv[2];
if (!file) {
  console.error('Usage: npm run template:check -- <template.docx>');
  process.exit(1);
}

const KNOWN_FIELDS = new Set(Object.values(CARD_FIELDS).flat());
const DERIVED = /^(name_\d+|date)$/;
const CASE = /^(\w+)_p([1-7])_(\d+)$/;
const FIELD = /^(\w+)_(\d+)$/;

(async () => {
  const { value: text } = await mammoth.extractRawText({
    path: path.resolve(file),
  });
  const raw = [...text.matchAll(/{{([^}]*)}}/g)].map((m) => m[1]);
  const names = [...new Set(raw)];
  const problems = [];

  const rows = names.map((name) => {
    if (!/^\w+$/.test(name)) {
      problems.push(`{{${name}}}: invalid characters (use letters, digits, _)`);
      return [name, 'INVALID'];
    }
    if (DERIVED.test(name)) return [name, 'derived'];
    const caseMatch = name.match(CASE);
    const field = caseMatch ? caseMatch[1] : name.match(FIELD)?.[1];
    const kind = caseMatch ? `case p${caseMatch[2]}` : 'field';
    if (!field) {
      problems.push(`{{${name}}}: missing _<order> suffix`);
      return [name, 'INVALID'];
    }
    if (field !== 'name' && !KNOWN_FIELDS.has(field)) {
      problems.push(
        `{{${name}}}: "${field}" is not a required field of any card type; ` +
          'it is only filled if the reader happens to return it'
      );
      return [name, `${kind} (unknown field)`];
    }
    return [name, kind];
  });

  console.log(`\n${names.length} placeholders in ${file}\n`);
  rows.forEach(([name, kind]) =>
    console.log(`  {{${name}}}`.padEnd(48) + kind)
  );

  const stray = (text.match(/{{|}}/g) || []).length / 2 - raw.length;
  if (stray > 0) problems.push(`${stray} unbalanced "{{" / "}}" pair(s)`);

  if (problems.length) {
    console.log('\nWarnings:');
    problems.forEach((p) => console.log(`  - ${p}`));
    process.exitCode = 1;
  } else {
    console.log('\nOK');
  }
})();
