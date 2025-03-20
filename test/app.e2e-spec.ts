import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('EntriesController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/entries (GET)', () => {
    return request(app.getHttpServer()).get('/entries').expect(200).expect([]);
  });

  it('/entries (POST)', async () => {
    const newEntry = { title: 'Test', content: 'This is a test entry' };
    const response = await request(app.getHttpServer())
      .post('/entries')
      .send(newEntry)
      .expect(201);

    expect(response.body).toMatchObject(newEntry);
  });

  it('/entries/:id (PUT)', async () => {
    const newEntry = { title: 'Test', content: 'This is a test entry' };
    const created = await request(app.getHttpServer())
      .post('/entries')
      .send(newEntry)
      .expect(201);

    const updatedData = { title: 'Updated', content: 'Updated content' };

    await request(app.getHttpServer())
      .put(`/entries/${created.body.id}`)
      .send(updatedData)
      .expect(200);

    const getUpdated = await request(app.getHttpServer())
      .get(`/entries/${created.body.id}`)
      .expect(200);

    expect(getUpdated.body).toMatchObject(updatedData);
  });

  it('/entries/:id (DELETE)', async () => {
    const newEntry = { title: 'Test', content: 'This is a test entry' };
    const created = await request(app.getHttpServer())
      .post('/entries')
      .send(newEntry)
      .expect(201);

    await request(app.getHttpServer())
      .delete(`/entries/${created.body.id}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/entries/${created.body.id}`)
      .expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
