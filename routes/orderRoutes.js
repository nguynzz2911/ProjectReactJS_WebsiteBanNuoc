import { Router } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import updateOrderQuantity from '../utils/updateOrder.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, '../data/order.json');

const router = Router();

router.post('/update-quantity', (req, res) => {
  const { username, item_id, newQuantity } = req.body;

  if (!username || !item_id || typeof newQuantity !== 'number') {
    return res.status(400).json({ success: false, message: 'Thiếu dữ liệu đầu vào' });
  }

  const success = updateOrderQuantity(username, item_id, newQuantity);
  if (success) {
    res.json({ success: true, message: 'Cập nhật thành công' });
  } else {
    res.status(404).json({ success: false, message: 'Không tìm thấy người dùng hoặc sản phẩm' });
  }
});

router.post('/delete-item', (req, res) => {
  const { username, itemId } = req.body;

  if (!username || !itemId) {
    return res.status(400).json({ success: false, message: 'Thiếu thông tin' });
  }

  try {
    const data = JSON.parse(readFileSync(filePath, 'utf8'));
    const userOrder = data.find(order => order.customer === username);
    if (!userOrder) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }

    userOrder.item = userOrder.item.filter(item => item.item_id !== itemId);

    writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    res.json({ success: true, message: 'Đã xoá sản phẩm khỏi đơn hàng' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

router.post('/add-to-order', (req, res) => {
  const { username, itemId } = req.body;

  if (!username || !itemId) {
    return res.status(400).json({ success: false, message: 'Thiếu thông tin' });
  }

  const data = JSON.parse(readFileSync(filePath, 'utf8'));

  let userOrder = data.find(order => order.customer === username);

  if (!userOrder) {
    // Nếu chưa có đơn hàng, tạo mới
    userOrder = {
      customer: username,
      item: [{ item_id: itemId, quantity: 1 }]
    };
    data.push(userOrder);
  } else {
    // Nếu đã có, kiểm tra sản phẩm đã tồn tại
    const existingItem = userOrder.item.find(i => i.item_id === itemId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      userOrder.item.push({ item_id: itemId, quantity: 1 });
    }
  }

  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  res.json({ success: true, message: 'Đã thêm sản phẩm vào giỏ hàng' });
});

export default router;
