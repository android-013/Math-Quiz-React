import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [result, setResult] = useState('');

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 90) + 10; // Two-digit number
    const num2 = Math.floor(Math.random() * 90) + 10; // Two-digit number
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let correctAnswer;
    if (operation === '+') correctAnswer = num1 + num2;
    if (operation === '-') correctAnswer = num1 - num2;
    if (operation === '*') correctAnswer = num1 * num2;
    if (operation === '/') correctAnswer = parseFloat((num1 / num2).toFixed(2));

    setQuestion(`What is ${num1} ${operation} ${num2}?`);
    setCorrectAnswer(correctAnswer);
    setOptions(generateOptions(correctAnswer, operation));
  };

  const generateOptions = (correctAnswer, operation) => {
    const options = new Set();
    while (options.size < 5) {
      let randomOption;
      if (operation === '/') {
        randomOption = parseFloat((Math.random() * 100).toFixed(2));
      } else if (operation === '-') {
        randomOption = Math.floor(Math.random() * 200) - 100;
      } else {
        randomOption = Math.floor(Math.random() * 200);
      }
      options.add(randomOption);
    }
    options.delete(correctAnswer);
    options.add(correctAnswer);
    return Array.from(options).sort(() => Math.random() - 0.5);
  };

  const checkAnswer = (selectedAnswer) => {
    if (selectedAnswer === correctAnswer) {
      setResult('Correct!');
    } else {
      setResult(`Wrong! The correct answer was ${correctAnswer}.`);
    }
    setTimeout(() => {
      setResult('');
      generateQuestion();
    }, 2000);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  return (
    <div className="App">
      <div className="question">{question}</div>
      <div className="options">
        {options.map((option, index) => (
          <button key={index} onClick={() => checkAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
      <div className="result" style={{ color: result.startsWith('Correct') ? 'green' : 'red' }}>
        {result}
      </div>
    </div>
  );
};

export default App;
