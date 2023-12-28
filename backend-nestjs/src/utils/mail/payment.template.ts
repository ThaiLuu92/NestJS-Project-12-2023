export const paymentTemplate  = (course_name: string, course_price: number): string => `
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    padding: 20px;
    margin: 0;
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  h2 {
    color: #333333;
  }

  p {
    color: #555555;
  }

  .reset-link {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #4caf50;
    color: #ffffff;
    text-decoration: none;
    border-radius: 4px;
    font-weight: bold;
  }
</style>
</head>
<body>
<div class="container">
  <h2>Emai xác nhận mua khóa học thành công</h2>
  <p>Cảm ơn bạn đã mua khóa học từ phía chúng tôi</p>
  <p>Tên khóa học đã mua: ${course_name}.</p>
  <p>Giá khóa học đã mua ${course_price} VND.</p>
</div>
</body>
</html>
`;
