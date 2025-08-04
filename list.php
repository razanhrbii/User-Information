<?php
require 'db.php';
// أثناء التطوير فقط:
// ini_set('display_errors', 1);
// error_reporting(E_ALL);

$sql = "SELECT id, name, age, status FROM userdata ORDER BY id ASC";
$result = $conn->query($sql);

echo '<table>
  <tr>
    <th>ID</th><th>Name</th><th>Age</th><th>Status</th><th>Action</th>
  </tr>';

if ($result && $result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $id     = (int)$row['id'];
    $name   = htmlspecialchars($row['name']);
    $age    = (int)$row['age'];
    $status = (int)$row['status'];

    echo "<tr>
      <td>{$id}</td>
      <td>{$name}</td>
      <td>{$age}</td>
      <td id='status-{$id}'>{$status}</td>
      <td><button class='toggle-btn' data-id='{$id}'>Toggle</button></td>
    </tr>";
  }
} else {
  echo "<tr><td colspan='5'>لا توجد بيانات بعد</td></tr>";
}
echo '</table>';

$conn->close();