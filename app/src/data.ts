export const palettes = [
  { id: 'original', name: 'Navy & rust', ink: '#1d2b3a', accent: '#c4471c', paper: '#f5f1e9', line: '#d9d2c5', cta: '#c4471c' },
  { id: 'a', name: 'Teal & copper', ink: '#0e3b3c', accent: '#b8662a', paper: '#f2f4f1', line: '#d3dad5', cta: '#0e3b3c' },
  { id: 'b', name: 'Ink & signal green', ink: '#15191e', accent: '#1b7f4e', paper: '#ffffff', line: '#dde1e4', cta: '#1b7f4e' },
  { id: 'c', name: 'Oxblood & brass', ink: '#4a1c24', accent: '#b08a2e', paper: '#f7f3ea', line: '#ddd3c6', cta: '#4a1c24' },
  { id: 'd', name: 'Cobalt & safety orange', ink: '#12305e', accent: '#e0561f', paper: '#f4f5f7', line: '#d6dae1', cta: '#e0561f' },
  { id: 'e', name: 'Charcoal & mustard', ink: '#2b2d30', accent: '#c99a1e', paper: '#edebe6', line: '#cfccc4', cta: '#c99a1e', ctaInk: '#2b2d30' },
  { id: 'f', name: 'Forest & terracotta', ink: '#22422f', accent: '#c0603a', paper: '#f6f2e8', line: '#d8d3c4', cta: '#c0603a' },
  { id: 'g', name: 'Midnight & lime', ink: '#0b1b33', accent: '#4c8c1e', paper: '#ffffff', line: '#dde2ea', cta: '#0b1b33' },
  { id: 'h', name: 'Burgundy & slate', ink: '#6b1f2a', accent: '#3e5c78', paper: '#fafaf8', line: '#e0dad8', cta: '#3e5c78' },
  { id: 'i', name: 'Espresso & sky', ink: '#3a2a22', accent: '#2e7fa6', paper: '#f3ede3', line: '#d9cfc2', cta: '#2e7fa6' },
  { id: 'j', name: 'Ink & red', ink: '#111111', accent: '#d62828', paper: '#ffffff', line: '#dadada', cta: '#111111' },
  { id: 'k', name: 'Plum & coral', ink: '#3b2140', accent: '#e2654e', paper: '#f8f1f0', line: '#e2d5d6', cta: '#e2654e' },
  { id: 'l', name: 'Slate & sea glass', ink: '#3c4a52', accent: '#2a9d8f', paper: '#f1f3f3', line: '#d3dadc', cta: '#2a9d8f' },
  { id: 'm', name: 'Navy & gold', ink: '#14264a', accent: '#b8912b', paper: '#ffffff', line: '#dcdfe6', cta: '#14264a' },
  { id: 'n', name: 'Black & tangerine', ink: '#151515', accent: '#f26a1b', paper: '#fbf6de', line: '#e3ddbf', cta: '#f26a1b', ctaInk: '#151515' },
];
export const steps = [
  ['Read.', 'Pull the insurance requirements from the contract itself — limits, endorsements, additional-insured wording — not from a generic template.'],
  ['Check.', "Compare the certificate and its endorsements against those requirements line by line. A COI that's current isn't the same as one that's right for the job."],
  ['Route.', "State the gap in plain terms and send it to the agent of record. When a vendor can't meet a requirement, the exception goes to a named decision-maker."],
  ['Clear.', 'Publish one status — eligible, exception, or blocked — with the reason attached, where Risk, Procurement, and AP all see the same answer.'],
];
export const teams = [
  ['Risk', 'Decides on evidence, not on email volume. Exceptions are documented and age visibly instead of disappearing into a thread.'],
  ['Procurement', "Knows a vendor is cleared before the PO is cut — and knows exactly why not when they aren't."],
  ['Accounts Payable', 'Pays against a status, not a forwarded email. No more asking Risk whether a vendor is “okay.”'],
];
export const questions = [
  { text: 'From vendor request to “cleared to work,” how long does it usually take?', options: ['Same day', '2–5 days', '1–2 weeks', "We don't really know"] },
  { text: 'Where do the insurance requirements for a given vendor actually live?', options: ['The contract', 'A standard exhibit', 'A campus policy', "Someone’s head"] },
  { text: 'Who reviews the COI against the requirement?', options: ['Risk', 'Procurement', 'The hiring department', 'Whoever has time'] },
  { text: 'When a COI is short — limit, endorsement, date — what happens?', options: ['We email the vendor', 'We email the broker', 'We forward it and wait', 'We often let it slide'] },
  { text: "Who approves an exception when a vendor can't meet the requirement?", options: ["Risk, and it’s documented", 'A department head, informally', 'Whoever is asked', 'Nobody — we just proceed'] },
  { text: 'How does Accounts Payable know a vendor is cleared to be paid?', options: ['System status', 'Email from Risk', 'They ask', "They don't check"] },
  { text: 'How many renewals per month do you chase?', options: ['0–10', '10–50', '50–200', '200+'] },
];
