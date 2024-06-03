import { expect, test } from 'vitest';
import request from "supertest";
import app from "../app.js";


describe('POST /api/v1/send', async ()=> {

    test('should throw 404 if name is not on datastorage', async()=> {
        const response = await request(app).post('/api/v1/send').send(
            {
                name: "albert.deleon",
                wish: "1 million dollars"
            });

        await expect(response.statusCode).toBe(404);
    })

    test('should throw 403 if age is greater that 10', async()=> {
        const response = await request(app).post('/api/v1/send').send(
            {
                name: "james.bond",
                wish: "ferarri 250 gto"
            });

        await expect(response.statusCode).toBe(403);
    })

    test('should send letter to Santa', async()=> {
        const response = await request(app).post('/api/v1/send').send(
            {
                name: "charlie.brown",
                wish: "Gifts"
            });

        await expect(response.statusCode).toBe(200);
    })

})