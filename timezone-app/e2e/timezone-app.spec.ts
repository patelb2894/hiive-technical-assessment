import { test, expect, Page } from '@playwright/test';
import { assert } from 'console';
import { addTimezoneLabel, openWebPage, saveButton, waitTime } from './timezone-utils';
import { DELETE_BUTTON, LABEL_NAME, PST_TIMEZONE, SELECT_TIMEZONE, TABLE_BODY, TABLE_CELLS, TABLE_ROW, TIMEZONE_VALUE } from './locators';

test('Verify addinng timezone to the table', async ({ page }) => {
    await openWebPage(page);
    // Adding all timezones
    const valuesToSelect = ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Juneau', 'Pacific/Honolulu'];
    for (const value of valuesToSelect) {
        await addTimezoneLabel(page);
        await page.selectOption(SELECT_TIMEZONE, value);
        await waitTime(page);
        await saveButton(page);
        await waitTime(page);
    }

    // Assert timezone is added as expected
    var table_body = await page.locator(TABLE_BODY);
    var rows = await table_body.locator(TABLE_ROW).all();

    for (const [index, row] of rows.entries()) {
        const cells = await row.locator(TABLE_CELLS).all();
        const label = await cells[0].textContent();
        const timezone = await cells[1].textContent();

        assert(label === LABEL_NAME);
        assert(timezone === valuesToSelect[index]);
    }
});

test('Verify adding and deleting e2e flow', async ({ page }) => {
    // Adding timezone 
    await openWebPage(page);
    await addTimezoneLabel(page);
    await page.selectOption(SELECT_TIMEZONE, PST_TIMEZONE);
    await waitTime(page);
    await saveButton(page);
    await waitTime(page);
    const selectTimezone = page.locator(TIMEZONE_VALUE);
    await expect(selectTimezone).toBeVisible();

    // Deletign timezone 
    var table_body = await page.locator(TABLE_BODY);
    var rows = await table_body.locator(TABLE_ROW).all();

    for (const [index, row] of rows.entries()) {
        const cells = await row.locator("td").all();
        const label = await cells[0].textContent();
        const timezone = await cells[1].textContent();

        assert(label === LABEL_NAME);
        assert(timezone === PST_TIMEZONE);

        const deleteButton = await cells[3].locator(DELETE_BUTTON).first();
        await deleteButton.click();
    }
});
