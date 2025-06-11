import { DynamoDBClient, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({ region: process.env.AWS_REGION });

export async function fetchChecklist(userId: string) {
  // Example: fetch checklist items for a user
  const params = {
    TableName: process.env.DYNAMODB_TABLE_CHECKLIST,
    Key: { userId: { S: userId } },
  };
  const data = await client.send(new GetItemCommand(params));
  return data.Item;
}

export async function saveChecklistItem(userId: string, itemId: string, item: any) {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_CHECKLIST,
    Item: {
      userId: { S: userId },
      itemId: { S: itemId },
      ...item,
    },
  };
  await client.send(new PutItemCommand(params));
}
