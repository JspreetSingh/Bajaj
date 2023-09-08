const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const userData = {
    user_id: 'JASPREET_SINGH_15112002',
    email: 'js9029@srmist.edu.in',
    roll_number: 'RA2011033010092',
  };


  app.post('/bfhl', (req, res) => {
    const { data } = req.body;
  
    // Extract numbers and alphabets from input data
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => typeof item === 'string' && /^[A-Za-z]$/.test(item));
    
    // Find the highest alphabet (case-insensitive)
    const highestAlphabet = alphabets.reduce((max, current) => {
      return current.toLowerCase() > max.toLowerCase() ? current : max;
    }, '');
    

    // No valid data in the input, consider it a failure
    if (numbers.length === 0 && alphabets.length === 0) {
        const response = {
          is_success: false,
          error: 'No valid data provided in the input.',
        };
        return res.status(400).json(response);
      }


    // Prepare the response object is data is provided
    const response = {
      is_success: true,
      user_id: userData.user_id,
      email: userData.email,
      roll_number: userData.roll_number,
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet ? [highestAlphabet] : [],
    };
  
    res.json(response);
  });

  // GET method endpoint
app.get('/bfhl', (req, res) => {
    // Respond with the operation_code
    res.json({ operation_code: 1 });
  });

  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});