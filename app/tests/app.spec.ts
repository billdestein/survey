import { test, expect } from '@playwright/test';

test('all palettes, worksheet scoring, state retention and answer download', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'A practical way out of the COI circle.' })).toBeVisible();
  const select = page.getByLabel('Color palette');
  await expect(select.locator('option')).toHaveCount(15);
  for (const id of ['original', ...'abcdefghijklmn']) {
    await select.selectOption(id);
    await expect(page.locator('.palette-label')).toContainText(`Palette ${id === 'original' ? 'Original' : id.toUpperCase()}`);
  }
  await select.selectOption('original');
  await page.screenshot({ path: '/tmp/tricheck-render/app-desktop.png', fullPage: true });
  await page.pdf({ path: '/tmp/tricheck-render/app-flyer.pdf', preferCSSPageSize: true });
  await page.getByRole('button', { name: 'Take the survey' }).click();
  for (let i = 0; i < 7; i++) await page.locator(`input[name="question-${i}"]`).nth(i < 3 ? 3 : 0).check();
  await expect(page.getByLabel('Right-column count')).toHaveText('3');
  await expect(page.getByText('Your answers point to the circle.', { exact: false })).toBeVisible();
  await page.locator('input[name="question-0"]').first().check();
  await expect(page.getByLabel('Right-column count')).toHaveText('2');
  await page.getByLabel('Name', { exact: true }).fill('Test User');
  await page.getByLabel('Email', { exact: true }).fill('test@example.com');
  await page.getByLabel('Where does it break most for you?', { exact: true }).fill('Renewal handoffs');
  await page.getByRole('button', { name: 'The approach' }).click();
  await page.getByRole('button', { name: 'The worksheet' }).click();
  await expect(page.getByLabel('Name', { exact: true })).toHaveValue('Test User');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download my answers' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('tricheck-urmia-2026-answers.json');
  const stream = await download.createReadStream();
  const chunks = [];
  for await (const chunk of stream!) chunks.push(chunk);
  const result = JSON.parse(Buffer.concat(chunks).toString());
  expect(result.rightColumnCount).toBe(2);
  expect(result.answers).toHaveLength(7);
  expect(result.contact.email).toBe('test@example.com');
  expect(result.whereItBreaks).toBe('Renewal handoffs');
  await page.screenshot({ path: '/tmp/tricheck-render/app-worksheet.png', fullPage: true });
  await page.pdf({ path: '/tmp/tricheck-render/app-worksheet.pdf', preferCSSPageSize: true });
});

test('mobile layout and required answers', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(375);
  await page.screenshot({ path: '/tmp/tricheck-render/app-mobile.png', fullPage: true });
  await page.getByRole('button', { name: 'Take the survey' }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(375);
  await page.getByRole('button', { name: 'Download my answers' }).click();
  await expect(page.locator('input:invalid').first()).toBeFocused();
  await page.getByRole('radio', { name: 'Same day', exact: true }).check();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('radio', { name: '2–5 days', exact: true })).toBeChecked();
  await page.screenshot({ path: '/tmp/tricheck-render/app-mobile-worksheet.png', fullPage: true });
});
