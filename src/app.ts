import fastifyServer from 'fastify';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { ulid } from 'ulid';

const app = fastifyServer();
const documentClient = new DocumentClient({ convertEmptyValues: true });
const tableName = String(process.env.tableName);

// For testing. This will return a same response as a sample endpoint which is created by "create-serverless-stack".
app.get('/', async (request, reply) => {
  const event = JSON.parse(decodeURIComponent(String(request.headers['x-apigateway-event'])));
  const requestContextTime = !event ? 'unknown' : event.requestContext.time;
  const statusCode = 200;
  const headers = { 'Content-Type': 'text/plain' };
  const body = `Hello, World! Your request was received at ${requestContextTime}.`;
  reply.headers(headers).status(statusCode).send(body);
});

app.get('/boards', async (request, reply) => {
  const data = await documentClient
    .query({
      TableName: tableName,
      IndexName: 'Reference',
      ExpressionAttributeValues: { ':sk': 'Board#', ':pk': 'Board#' },
      KeyConditionExpression: 'sk = :sk and begins_with(pk, :pk)',
    })
    .promise();
  reply.send({ boards: data.Items });
});

app.post('/boards', async (request, reply) => {
  const { name = 'no name' } = request.body as { name?: string };
  const boardId = ulid();
  await documentClient
    .put({
      TableName: tableName,
      Item: {
        pk: `Board#${boardId}#`,
        sk: 'Board#',
        boardId,
        name,
      },
    })
    .promise();
  reply.send({ ok: true });
});

app.get('/boards/:boardId', async (request, reply) => {
  const { boardId = 'missing' } = request.params as { boardId?: string };
  const data = await documentClient
    .query({
      TableName: tableName,
      ExpressionAttributeValues: { ':pk': `Board#${boardId}#` },
      KeyConditionExpression: 'pk = :pk',
    })
    .promise();
  if (!data.Items) {
    reply.status(404).send({ error: 'Not Found' });
    return;
  }
  const ret = data.Items.reduce(
    (ret, item) => {
      if ('messageId' in item) return { ...ret, messages: [...ret.messages, item] };
      if ('boardId' in item) return { ...item, messages: ret.messages };
      return ret;
    },
    { messages: [] }
  );
  reply.send(ret);
});

app.post('/boards/:boardId', async (request, reply) => {
  const { boardId = 'missing' } = request.params as { boardId?: string };
  const { message = 'empty' } = request.body as { message?: string };
  const messageId = ulid();
  await documentClient
    .put({
      TableName: tableName,
      Item: {
        pk: `Board#${boardId}#`,
        sk: `Message#${messageId}#`,
        boardId,
        messageId,
        message,
      },
    })
    .promise();
  reply.send({ ok: true });
});

export default app;
