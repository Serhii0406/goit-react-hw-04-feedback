import { useState } from 'react';
import { Statistics } from 'components/Statistics/Statistics';
import { FeedbackOptions} from 'components/FeedbackOptions/FeedbackOptions';
import { Section} from 'components/Section/Section';
import { Notification } from 'components/Notification/Notification';

export const Feedback = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  

  const countValue = option => {
    switch (option) {
      case 'Good':
        return setGood(prevState => prevState + 1);
      case 'Neutral':
        return setNeutral(prevState => prevState + 1);
      case 'Bad':
        return setBad(prevState => prevState + 1);
      default:
        return;
    }
  };

  const countTotalFeedback = () =>
    Object.values([good, neutral, bad]).reduce(
      (previous, current) => previous + current
    );

  const countPositiveFeedbackPercentage = () =>
    ((good / countTotalFeedback()) * 100).toFixed(0);

  const options = ['Good', 'Neutral', 'Bad'];

  return (
      <>
       <Section title="Please leave feedback">
         <FeedbackOptions
              options={options} onLeaveFeedback={countValue}
           ></FeedbackOptions>        
       </Section>

       <Section
         title={'Statistics'}
         children={
            countTotalFeedback() === 0 ? (
             <Notification message={'There is no feedback'} />
           ) : (
             <Statistics
               good={good}
               neutral={neutral}
               bad={bad}
               total={countTotalFeedback()}
               positivePercentage={countPositiveFeedbackPercentage()}
              ></Statistics>
           )
         }
        ></Section>
      </>
    );
  }