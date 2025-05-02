import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, '../data/order.json');

function updateOrderQuantity(username, itemId, newQuantity) {
  const data = JSON.parse(readFileSync(filePath, 'utf8'));

  const userOrder = data.find(order => order.customer === username);
  if (!userOrder) return false;

  const item = userOrder.item.find(i => i.item_id === itemId);
  if (!item) return false;

  item.quantity = newQuantity;

  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  return true;
}

export default updateOrderQuantity;
