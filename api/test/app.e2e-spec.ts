import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import jwtDecode from 'jwt-decode';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/hello (GET)', () => {
    return request(app.getHttpServer())
      .get('/hello')
      .expect(200)
      .expect('Hello World!');
  });

  it('/auth/login Unauthorized (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .expect(401)
      .expect(JSON.stringify({ statusCode: 401, message: 'Unauthorized' }));
  });

  it('/auth/login Authorized (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'john', password: 'changeme' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect((res) =>
        expect(jwtDecode(res.body.access_token)).toEqual(
          expect.objectContaining({
            username: 'john',
          }),
        ),
      );
  });

  it('/profile', async () => {
    let token: string;

    await request(app.getHttpServer())
      .get('/profile')
      .expect(401)
      .expect(JSON.stringify({ statusCode: 401, message: 'Unauthorized' }));

    // TODO: Future tests could use an abstracted authenticate function.
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'john', password: 'changeme' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect((res) => {
        token = res.body.access_token;

        expect(jwtDecode(res.body.access_token)).toEqual(
          expect.objectContaining({
            username: 'john',
          }),
        );
      });

    await request(app.getHttpServer())
      .get('/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect(JSON.stringify({ userId: '1', username: 'john' }));
  });
});
