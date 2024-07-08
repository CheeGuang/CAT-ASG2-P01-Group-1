import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

const dynamo = DynamoDBDocument.from(new DynamoDB());

const TABLE_NAME = "cat-assg2-serverlessarchitecture-dynamodb";

export const handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2)); // Log the event

  let body;
  let statusCode = "200";
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // Allow CORS
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  try {
    if (event.httpMethod === "GET") {
      const params = {
        TableName: TABLE_NAME,
      };
      const result = await dynamo.scan(params);
      body = result.Items;
    } else {
      throw new Error(`Unsupported method "${event.httpMethod}"`);
    }
  } catch (err) {
    statusCode = "400";
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  console.log("Response:", body); // Log the response

  return {
    statusCode,
    body,
    headers,
  };
};
