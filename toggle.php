<?php
require 'db.php';
// أثناء التطوير فقط:
// ini_set('display_errors', 1);
// error_reporting(E_ALL);

if (!isset($_POST['id'])) {
  http_response_code(400);
  echo "Missing id";
  exit;
}

$id = (int)$_POST['id'];

// اجلب الحالة الحالية
$stmt = $conn->prepare("SELECT status FROM userdata WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$stmt->bind_result($currentStatus);
if (!$stmt->fetch()) {
  http_response_code(404);
  echo "Not found";
  exit;
}
$stmt->close();

$newStatus = ($currentStatus == 1) ? 0 : 1;

// حدّث الحالة
$upd = $conn->prepare("UPDATE userdata SET status = ? WHERE id = ?");
$upd->bind_param("ii", $newStatus, $id);
$upd->execute();
$upd->close();

// أعد القيمة الجديدة للنص
echo $newStatus;

$conn->close();