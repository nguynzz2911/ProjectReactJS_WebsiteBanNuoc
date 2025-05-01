import { Router } from 'express';
const router = Router();
import updateOrderQuantity from '../utils/updateOrder.js';

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

export default router;
