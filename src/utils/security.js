const bcrypt = require('bcrypt')
// npm i bcrypt ( nếu lỗi chạy 'npm i node-gyp' xong rồi chạy npm i bcrypt)
const jwt = require('jsonwebtoken')

const { JWT_SECRET_KEY } = process.env;

const SALT_ROUND = 10
// 1. mã hoá 1 chiều - mã hoá password ở dạng plaintext => lưu vào database
const generatePassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUND)

  return hashedPassword;
}

// 2. mã hoá 2 chiều - tạo access_token 
const generateToken = ({ username, role, adminID }) => {
  const token = jwt.sign(
    { username, role, adminID },
    JWT_SECRET_KEY,
    {
      expiresIn: 60 * 60 * 6
    }
  );
  return token;
}


// 3. xác thực mã hoá 1 chiều 
const verifyPassword = async (password, hashedPassword) => {
  const result =
    await bcrypt.compare(
      password,
      hashedPassword
    );

  return result;
};

// 4. giải mã mã hoá 2 chiều
const verifyToken = token => {
  try {
    const data = jwt.verify(token, JWT_SECRET_KEY);
    return {
      status:200,
      data
    }
  } catch (error) {
    return {
      status: 401,
      name: 'TokenExpiredError',
      message: 'jwt expired',
      expiredAt: error.expiredAt
    }
  }
}
// 5. mã hoá 2 chiều - tạo access_token cho customer
const generateTokenCustomer = ({ username, customerId }) => {
  const token = jwt.sign(
    { username, customerId },
    JWT_SECRET_KEY,
    {
      expiresIn: 1 * 60 * 60 * 24
    }
  );
  return token;
}
module.exports = {
  generatePassword,
  verifyPassword,
  generateToken,
  verifyToken,
  generateTokenCustomer
}