import { test, expect } from '@playwright/test'

const TEST_EMAIL = 'test@venture.com'
const TEST_PASSWORD = 'password123'
const TEST_NAME = 'Test User'

// ── Login flow ────────────────────────────────────────────────────────────────
test('login flow — shows error for wrong credentials', async ({ page }) => {
  await page.goto('/login')
  await expect(page.getByText('Nice to see you again')).toBeVisible()

  await page.getByPlaceholder('Email or phone number').fill('wrong@email.com')
  await page.getByPlaceholder('Enter password').fill('wrongpassword')
  await page.getByRole('button', { name: 'Sign in' }).click()

  await expect(page.locator('.bg-red-50')).toBeVisible({ timeout: 5000 })
})

test('login flow — navigates to register page', async ({ page }) => {
  await page.goto('/login')
  await page.getByRole('link', { name: 'Sign up now' }).click()
  await expect(page).toHaveURL('/register')
  await expect(page.getByText('Create an account')).toBeVisible()
})

// ── Register + Login + Notes flow ─────────────────────────────────────────────
test('register, login, create note, delete note', async ({ page }) => {
  // Register
  await page.goto('/register')
  await page.getByPlaceholder('Enter your full name').fill(TEST_NAME)
  await page.getByPlaceholder('Email address').fill(TEST_EMAIL)
  await page.getByPlaceholder('Create a password').fill(TEST_PASSWORD)
  await page.getByRole('button', { name: 'Create account' }).click()

  // Should land on notes page (or login if email already exists)
  await page.waitForURL(/\/(notes|login)/, { timeout: 8000 })

  // If redirected to login (email exists), log in
  if (page.url().includes('/login')) {
    await page.getByPlaceholder('Email or phone number').fill(TEST_EMAIL)
    await page.getByPlaceholder('Enter password').fill(TEST_PASSWORD)
    await page.getByRole('button', { name: 'Sign in' }).click()
    await page.waitForURL('/notes', { timeout: 8000 })
  }

  await expect(page.getByText('Notes')).toBeVisible()

  // Create a note
  await page.getByRole('button', { name: /Add Notes/i }).click()
  await expect(page.getByText('Add Note')).toBeVisible()

  await page.getByPlaceholder('Note title').fill('E2E Test Note')
  await page.getByPlaceholder('Note description').fill('Created by Playwright test')
  await page.getByRole('button', { name: 'Create Note' }).click()

  await expect(page.getByText('E2E Test Note')).toBeVisible({ timeout: 5000 })

  // Delete the note
  await page.locator('[title=""]').first().click() // MoreHorizontal menu
  // Find the card with our note and click its menu
  const card = page.locator('.bg-white.rounded-lg').filter({ hasText: 'E2E Test Note' })
  await card.getByRole('button').first().click()
  await page.getByRole('button', { name: 'Delete' }).first().click()

  // Confirm delete in modal
  await expect(page.getByText('Are you sure you want to delete')).toBeVisible()
  await page.getByRole('button', { name: 'Delete' }).last().click()

  await expect(page.getByText('E2E Test Note')).not.toBeVisible({ timeout: 5000 })
})
