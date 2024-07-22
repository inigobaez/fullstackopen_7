import { createBlog, loginWith } from './helper.js'

const { test, expect, beforeEach, describe } = require('@playwright/test')


describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // empty the db here
    await request.post('/api/testing/reset')
    // create a user for the backend here
    // ...
    await request.post('/api/users', {
      data: {
        name: 'test user',
        username: 'bat',
        password: 'bat'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'test user 3',
        username: 'hiru',
        password: 'hiru'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('loginForm')).toBeVisible()
  })
  describe('Login', () => {

    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'bat', 'bat')
      await expect(page.getByText('successfully')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      // ...
      await loginWith(page, 'bat', 'xxx')
      await expect(page.getByText('wrong')).toBeVisible()
    })
  })
  describe('When logged in', () => {
    const newBlog = { title: 'Quién soy mientras trabajo', author: 'Maltita', url: 'https://thefemmeurge.maltita.es/2024/06/02/quien-soy-mientras-trabajo/' }
    const newBlog2 = { title: 'título2', author: 'autor2', url: 'https://blog2.com/' }
    const newBlog3 = { title: 'título3', author: 'autor3', url: 'https://blog3.com/' }
    beforeEach(async ({ page }) => {
      await loginWith(page, 'bat', 'bat')
    })
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, newBlog)
      await expect(page.getByTestId('blogItem').filter({ hasText: newBlog.title })).toBeVisible()
    })
    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, newBlog)
      await page.pause()
      const blogToLikeHeader = await page.getByText(newBlog.title)
      await blogToLikeHeader.getByRole('button', { name: 'show' }).click()
      const blogToLikeWrapper = await blogToLikeHeader.locator('..')
      await blogToLikeWrapper.getByRole('button', { name: 'like' }).click()
      await expect(blogToLikeWrapper.getByTestId('like').filter({ hasText: 1 })).toBeVisible()
    })
    test('the user who added the blog can delete it', async ({ page }) => {
      page.on('dialog', async (dialog) => {
        await dialog.accept()
      })
      await createBlog(page, newBlog)
      await page.pause()
      const blogList = await page.getByTestId('blogList')
      const blogToRemoveHeader = await blogList.getByText(newBlog.title)
      await blogToRemoveHeader.getByRole('button', { name: 'show' }).click()
      await page.pause()
      const blogToRemoveWrapper = await blogToRemoveHeader.locator('..')
      await blogToRemoveWrapper.getByRole('button', { name: 'Remove' }).click()
      //const notToBe = await blogList.getByText(newBlog.title)
      expect(page.getByTestId('blogList').getByText(newBlog.title)).not.toBeVisible()
      //expect(blogList).not.toContainText(newBlog.title)

    })

    test('only the user who added the blog sees the blog delete button', async ({ page }) => {
      page.on('dialog', async (dialog) => {
        await dialog.accept()
      })
      await createBlog(page, newBlog)
      await page.pause()
      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'hiru', 'hiru')
      const blogList = page.getByTestId('blogList')
      const blogToRemoveHeader = blogList.getByText(newBlog.title)
      await blogToRemoveHeader.getByRole('button', { name: 'show' }).click()
      const blogToRemoveWrapper = blogToRemoveHeader.locator('..')
      await page.pause()
      expect(blogToRemoveWrapper.getByRole('button', { name: 'Remove' })).not.toBeVisible()

    })

  })


})