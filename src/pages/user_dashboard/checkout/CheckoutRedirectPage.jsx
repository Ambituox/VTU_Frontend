// CheckoutRedirectPage.jsx

const CheckoutRedirectPage = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Redirecting to Checkout...</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body {
          font-family: 'Inter', sans-serif;
          background-color: #f9fafb;
        }
      </style>
    </head>
    <body class="flex items-center justify-center h-screen">
      <div class="text-center px-6 py-8 bg-white rounded-xl shadow-md w-[90%] max-w-md">
        <div class="mb-4">
          <svg class="mx-auto h-16 w-16 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Redirecting to Checkout...</h2>
        <p class="text-gray-600">Please wait while we take you to the secure payment page.</p>
      </div>
    </body>
  </html>
`;

export default CheckoutRedirectPage;
