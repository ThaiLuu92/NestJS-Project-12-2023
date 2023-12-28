export const resetPasswordTemplate = (resetPassword: string, resetPasswordExpiryInMinutes: number): string => `
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
  <h2>Lấy lại mật khẩu</h2>
  <p>Đường link phía dưới để lấy lại mật khẩu</p>
  <a href="http://localhost:3001/ResetPassword" class="reset-link">Lấy lại mật khẩu</a>
  <p>Mã xác nhận lấy lại mật khẩu: ${resetPassword}.</p>
  <p>Thời hạn có hiệu lực là ${resetPasswordExpiryInMinutes} phút.</p>
</div>
</body>
</html>
`;
