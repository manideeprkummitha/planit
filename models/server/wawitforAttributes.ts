// waitForAttribute.ts
import { databases } from "./config";

export async function waitForAttribute(
  databaseId: string,
  collectionId: string,
  attributeKey: string
) {
  // Poll the attribute until its status is "available"
  let attribute;
  do {
    attribute = await databases.getAttribute(databaseId, collectionId, attributeKey);
    if (attribute.status !== "available") {
      console.log(`Waiting for attribute "${attributeKey}" to be ready... (current status: ${attribute.status})`);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds
    }
  } while (attribute.status !== "available");
}
