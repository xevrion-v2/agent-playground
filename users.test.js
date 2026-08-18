const request = require('supertest');
const express = require('express');
const usersRouter = require('../apps/api/src/routes/users');

const app = express();
app.use(express.json());
app.use('/users', usersRouter);

async function runTests() {
    try {
        // Test GET /users
        const getRes = await request(app).get('/users');
        if (getRes.status !== 200 || getRes.body.message !== "User listing is not implemented yet.") {
            throw new Error(`GET /users failed: ${JSON.stringify(getRes.body)}`);
        }
        console.log('✅ GET /users passed');

        // Test POST /users
        const postData = { name: 'Test User', email: 'test@example.com' };
        const postRes = await request(app).post('/users').send(postData);
        if (postRes.status !== 201 || postRes.body.data.id !== 'stub-user-id' || postRes.body.data.name !== 'Test User') {
            throw new Error(`POST /users failed: ${JSON.stringify(postRes.body)}`);
        }
        console.log('✅ POST /users passed');

        console.log('All user route tests passed!');
    } catch (e) {
        console.error('❌ Test failed:', e.message);
        process.exit(1);
    }
}

runTests();
