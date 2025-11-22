import crypto from 'crypto';

// JazzCash Payment Gateway Configuration
const jazzCashConfig = {
  merchantId: process.env.JAZZCASH_MERCHANT_ID || '03288691013',
  password: process.env.JAZZCASH_PASSWORD || 'test_password',
  integritySalt: process.env.JAZZCASH_INTEGRITY_SALT || 'test_salt',
  returnUrl: process.env.JAZZCASH_RETURN_URL || 'http://localhost:3000/payment/success',
  paymentUrl: 'https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform'
};

// EasyPaisa Payment Gateway Configuration
const easyPaisaConfig = {
  storeId: process.env.EASYPAISA_STORE_ID || '03288691013',
  apiKey: process.env.EASYPAISA_API_KEY || 'test_api_key',
  returnUrl: process.env.EASYPAISA_RETURN_URL || 'http://localhost:3000/payment/success',
  paymentUrl: 'https://easypaisa.com.pk/easypay'
};

// Bank Transfer Configuration
const bankConfig = {
  accountTitle: 'Swat Car Rental',
  accountNumber: '0123456789012345',
  bankName: 'Meezan Bank',
  branchCode: '0456',
  iban: 'PK36MEZN0000000123456789'
};

// Generate JazzCash Hash
const generateJazzCashHash = (data) => {
  const hashString = `${jazzCashConfig.integritySalt}&${data.amount}&${data.billReference}&${data.description}&${jazzCashConfig.merchantId}&${data.returnUrl}&${data.txnDateTime}&${data.txnRefNumber}`;
  return crypto.createHmac('sha256', jazzCashConfig.integritySalt).update(hashString).digest('hex');
};

// Generate EasyPaisa Token
const generateEasyPaisaToken = (data) => {
  const tokenString = `${easyPaisaConfig.storeId}${data.amount}${data.orderId}${easyPaisaConfig.apiKey}`;
  return crypto.createHash('sha256').update(tokenString).digest('hex');
};

// Create JazzCash Payment
const createJazzCashPayment = async (bookingData) => {
  const txnDateTime = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
  const txnRefNumber = `TXN${Date.now()}`;
  
  const paymentData = {
    amount: (bookingData.totalAmount * 100).toString(), // Convert to paisa
    billReference: bookingData.bookingId,
    description: `Car Rental - ${bookingData.carName}`,
    merchantId: jazzCashConfig.merchantId,
    returnUrl: jazzCashConfig.returnUrl,
    txnDateTime,
    txnRefNumber,
    txnExpiryDateTime: new Date(Date.now() + 30 * 60000).toISOString().replace(/[-:T.]/g, '').slice(0, 14)
  };

  paymentData.secureHash = generateJazzCashHash(paymentData);

  return {
    paymentUrl: jazzCashConfig.paymentUrl,
    paymentData,
    txnRefNumber
  };
};

// Create EasyPaisa Payment
const createEasyPaisaPayment = async (bookingData) => {
  const orderId = `ORD${Date.now()}`;
  
  const paymentData = {
    storeId: easyPaisaConfig.storeId,
    amount: bookingData.totalAmount.toString(),
    orderId,
    orderRefNum: bookingData.bookingId,
    returnUrl: easyPaisaConfig.returnUrl,
    postBackUrl: `${process.env.BACKEND_URL}/api/payments/easypaisa/callback`,
    emailAddress: bookingData.userEmail,
    mobileNumber: bookingData.userPhone || '03001234567'
  };

  paymentData.token = generateEasyPaisaToken(paymentData);

  return {
    paymentUrl: easyPaisaConfig.paymentUrl,
    paymentData,
    orderId
  };
};

// Verify JazzCash Payment
const verifyJazzCashPayment = (responseData) => {
  const receivedHash = responseData.pp_SecureHash;
  delete responseData.pp_SecureHash;
  
  const sortedData = Object.keys(responseData).sort().reduce((acc, key) => {
    acc[key] = responseData[key];
    return acc;
  }, {});
  
  const hashString = jazzCashConfig.integritySalt + '&' + Object.values(sortedData).join('&');
  const calculatedHash = crypto.createHmac('sha256', jazzCashConfig.integritySalt).update(hashString).digest('hex');
  
  return receivedHash === calculatedHash && responseData.pp_ResponseCode === '000';
};

// Verify EasyPaisa Payment
const verifyEasyPaisaPayment = (responseData) => {
  const receivedToken = responseData.token;
  const tokenString = `${easyPaisaConfig.storeId}${responseData.amount}${responseData.orderId}${easyPaisaConfig.apiKey}`;
  const calculatedToken = crypto.createHash('sha256').update(tokenString).digest('hex');
  
  return receivedToken === calculatedToken && responseData.paymentStatus === 'SUCCESS';
};

export {
  jazzCashConfig,
  easyPaisaConfig,
  bankConfig,
  createJazzCashPayment,
  createEasyPaisaPayment,
  verifyJazzCashPayment,
  verifyEasyPaisaPayment
};
