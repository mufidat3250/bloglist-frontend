const {test, expect, beforeEach, describe} = require('@playwright/test')

describe('Blog App', ()=>{

    beforeEach(async({page, request})=>{
        await request.post('http:localhost:10000/api/testing/reset')
        await request.post('http://localhost:10000/api/users', {
            data:{
                name:'Aramide Oluwatobi',
                username:'Oluwapelumi',
                password:'iyanu3250'
            }
        })
        await request.post('http://localhost:10000/api/blogs', {
            data:{
                title:'How to make Jollof spag',
                author:'Mufidat',
                url:'Localhost://3000/jollof spag is ready',
                likes:0
            }
        })
        await page.goto('http://localhost:5173')
    })
    test('login form is shown', async ({ page }) => {
        const locator = await page.getByText('Log In to Application')
        await expect(locator).toBeVisible()
        await expect(page.getByText('username')).toBeVisible()
        await expect(page.getByText('password')).toBeVisible()
    })
    describe('Login', ()=> {
        test('suceeds with correct credentials', async({page}) => {
            await page.getByTestId('username').fill('Oluwapelumi')
            await page.getByTestId('password').fill('iyanu3250')
            await page.getByRole('button', {name: 'login' }).click()
            await expect(page.getByText('Aramide Oluwatobi is logged In')).toBeVisible()
        
        })
        test('fail with wrong credentials', async({page})=> {
            await page.getByTestId('username').fill('Oluwapelumi')
            await page.getByTestId('password').fill('wrong')
            await page.getByRole('button', {name: 'login'}).click()
            await expect(page.getByText('Aramide Oluwatobi is logged in')).not.toBeVisible()
        })
    })
    describe('When Logged In ', () => {
        beforeEach(async({page})=> {
            await page.getByTestId('username').fill('Oluwapelumi')
            await page.getByTestId('password').fill('iyanu3250')
            await page.getByRole('button', {name:'login'}).click()
        })

        test('A new blog can be created', async({page}) => {
            await page.getByRole('button', {name:'Create new Blog'}).click()
            await page.getByTestId('title').fill('How to make Jollof spag')
            await page.getByTestId('author').fill('Mufidat')
            await page.getByRole('button', {name:'create'}).click()
            await expect(page.getByText('How to make Jollof spag Mufidat')).toBeVisible()
        })
    })
})