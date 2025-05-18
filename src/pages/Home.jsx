import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';

import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  //const isError = false;

  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleConvert = async () => {
    setError(null);
    setResult(null);

    // Приклад: "15 USD in UAH"
    const match = input.match(/^(\d+(?:\.\d+)?)\s+([A-Z]{3})\s+in\s+([A-Z]{3})$/i);

    if (!match) {
      setError('Invalid format. Please use "15 USD in UAH".');
      return;
    }

    const [, amount, fromCurrency, toCurrency] = match;

    try {
      const response = await axios.get(`https://api.apilayer.com/exchangerates_data/convert`, {
        params: {
          from: fromCurrency.toUpperCase(),
          to: toCurrency.toUpperCase(),
          amount: parseFloat(amount),
        },
        headers: {
          apikey: 'WuLPmWcaZHBQaOtbREdroOpwTJ77R0fS',
        },
      });

      setResult(`${amount} ${fromCurrency.toUpperCase()} = ${response.data.result} ${toCurrency.toUpperCase()}`);
    } catch (err) {
      setError('Conversion failed. Try again.');
    }
  };

  return (
    <Section>
      <Container>
        <Heading info title="What currencies do you want to exchange?🙂" />

        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="15 USD in UAH"
        />
        <button onClick={handleConvert}>Convert</button>

        {result && <p>{result}</p>}
        {error && <Heading error title={error} />}
      </Container>
    </Section>
  );
};

export default Home;
/*  {isError && (
          <Heading
            error
            title="Something went wrong...😐 Check the data validity and try again!"
          />
        )}*/
