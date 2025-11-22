import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingId, totalAmount } = location.state || {};
  
  const [selectedMethod, setSelectedMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [bankDetails, setBankDetails] = useState(null);
  const [receiptImage, setReceiptImage] = useState('');

  const paymentMethods = [
    {
      id: 'jazzcash',
      name: 'JazzCash',
      icon: '📱',
      color: 'from-red-500 to-orange-500',
      description: 'Pay instantly with JazzCash mobile wallet'
    },
    {
      id: 'easypaisa',
      name: 'EasyPaisa',
      icon: '💚',
      color: 'from-green-500 to-emerald-500',
      description: 'Quick payment through EasyPaisa'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: '🏦',
      color: 'from-blue-500 to-cyan-500',
      description: 'Direct bank transfer with instant verification'
    }
  ];

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast.error('Please select a payment method');
      return;
    }

    setLoading(true);

    try {
      const response = await API.post('/payments/initialize', {
        bookingId,
        paymentMethod: selectedMethod
      });

      if (selectedMethod === 'jazzcash' || selectedMethod === 'easypaisa') {
        // Redirect to payment gateway
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = response.data.paymentResponse.paymentUrl;

        Object.keys(response.data.paymentResponse.paymentData).forEach(key => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = response.data.paymentResponse.paymentData[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } else if (selectedMethod === 'bank') {
        setBankDetails(response.data.paymentResponse.bankDetails);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Payment initialization failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReceiptUpload = async () => {
    if (!receiptImage) {
      toast.error('Please provide payment receipt');
      return;
    }

    setLoading(true);

    try {
      await API.post('/payments/bank/receipt', {
        bookingId,
        receiptImage
      });

      toast.success('Receipt uploaded! Payment will be verified shortly.');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Receipt upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Complete Your Payment
          </h1>
          <p className="text-xl text-gray-600">
            Total Amount: <span className="font-bold text-teal-600">Rs {totalAmount?.toLocaleString()}</span>
          </p>
        </div>

        {!bankDetails ? (
          /* Payment Method Selection */
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`relative cursor-pointer transform transition-all duration-300 ${
                  selectedMethod === method.id
                    ? 'scale-105 shadow-2xl'
                    : 'hover:scale-105 hover:shadow-xl'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${method.color} rounded-3xl opacity-10 ${
                  selectedMethod === method.id ? 'opacity-20' : ''
                }`}></div>
                
                <div className={`relative bg-white rounded-3xl p-8 border-4 transition-all ${
                  selectedMethod === method.id
                    ? 'border-teal-500'
                    : 'border-transparent'
                }`}>
                  <div className="text-center">
                    <div className="text-6xl mb-4">{method.icon}</div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                  
                  {selectedMethod === method.id && (
                    <div className="absolute -top-3 -right-3 bg-teal-500 text-white rounded-full p-2">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Bank Transfer Details */
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <span className="mr-3">🏦</span>
              Bank Transfer Details
            </h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="font-semibold text-gray-700">Account Title:</span>
                <span className="text-gray-900">{bankDetails.accountTitle}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="font-semibold text-gray-700">Account Number:</span>
                <span className="text-gray-900 font-mono">{bankDetails.accountNumber}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="font-semibold text-gray-700">Bank Name:</span>
                <span className="text-gray-900">{bankDetails.bankName}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="font-semibold text-gray-700">IBAN:</span>
                <span className="text-gray-900 font-mono">{bankDetails.iban}</span>
              </div>
            </div>

            <div className="border-t pt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Payment Receipt
              </label>
              <input
                type="text"
                placeholder="Paste receipt image URL or base64"
                value={receiptImage}
                onChange={(e) => setReceiptImage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-4"
              />
              <button
                onClick={handleReceiptUpload}
                disabled={loading || !receiptImage}
                className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? 'Uploading...' : 'Submit Receipt'}
              </button>
            </div>
          </div>
        )}

        {!bankDetails && (
          <div className="text-center">
            <button
              onClick={handlePayment}
              disabled={loading || !selectedMethod}
              className="px-12 py-5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-2xl hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
