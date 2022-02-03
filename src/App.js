import { useState } from 'react';
import FeedbackButtons from './FeedbackButtons/FeedbackButton';
import Section from './Section/Section';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';
import s from './App.module.css';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = button => {
    switch (button) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    if (!good) {
      return 0;
    }
    return ((good * 100) / countTotalFeedback()).toFixed(0);
  };

  return (
    <section className={s.feedbackSection}>
      <Section title="Please leave feedback!">
        <FeedbackButtons
          options={['good', 'neutral', 'bad']}
          onHandleClick={handleClick}
        />
      </Section>
      {countTotalFeedback() === 0 ? (
        <Notification message="No feedback given" />
      ) : (
        <Section title="Statistics">
          <Statistics
            options={{ good, neutral, bad }}
            onCountTotalFeedback={countTotalFeedback()}
            onCountPositiveFeedbackPercentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      )}
    </section>
  );
};

export default App;
