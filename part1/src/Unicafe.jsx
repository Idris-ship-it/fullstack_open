import { useState } from 'react';

const Button = ({ onClick, text }) => {
    return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({statistic, text}) => {
    
    return (
        <table>
            <tr>
                <td>{text}</td>
                <td>{statistic}</td>
            </tr>
        </table>
    )
}

const Statistics = ({ good, neutral, bad, total, average, percentage }) => {
    if (total  === 0){
        return <h1> No feedback given</h1>
    }
    return (
        <>
            <h1>Statistics</h1>
            <StatisticLine statistic={good} text="good" />
            <StatisticLine statistic={neutral} text="neutral"/>
            <StatisticLine statistic={bad} text="bad"/>
            <StatisticLine statistic={total} text="all"/>
            <StatisticLine statistic={average} text="average"/>
            <StatisticLine statistic={percentage} text="percentage"/>
            
        </>
    );
};

const Unicafe = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [total, setTotal] = useState(0);
    const [average, setAverage] = useState(0);
    const [percentage, setPercentage] = useState(0);

    const updateTotal = (newGood, newNeutral, newBad) => {
        setTotal(newGood + newNeutral + newBad);
    };

    const updateAverage = (newGood, newNeutral, newBad) => {
        setAverage((newGood + newNeutral + newBad) / 3)
    }

    const updatePercentage = (newGood, newTotal) => {
        console.log("Good", newGood)
        console.log("Total", newTotal)
        setPercentage(newGood / newTotal * 100)
    }
    const handleGood = () => {
        const newGood = good + 1;
        const newTotal = newGood + bad + neutral
        setGood(newGood);
        updateTotal(newGood, neutral, bad);
        updateAverage(newGood, neutral, bad)
        updatePercentage(newGood, newTotal)
    };

    const handleNeutral = () => {
        const newNeutral = neutral + 1;
        const newTotal = good + bad + newNeutral
        setNeutral(newNeutral);
        updateTotal(good, newNeutral, bad);
        updateAverage(good, newNeutral, bad)
        updatePercentage(good, newTotal)
    };

    const handleBad = () => {
        const newBad = bad + 1;
        const newTotal = good + newBad + neutral
        setBad(newBad);
        updateTotal(good, neutral, newBad);
        updateAverage(good, neutral, newBad)
        updatePercentage(good, newTotal)
    };



    return (
        <div>
            <Button onClick={handleGood} text={'good'} />
            <Button onClick={handleNeutral} text={'neutral'} />
            <Button onClick={handleBad} text={'bad'} />
            <br /> <br />
            <Statistics 
            good={good} 
            neutral={neutral} 
            bad={bad} 
            total={total}
            average={average}
            percentage={percentage} />
        </div>
    );
};

export default Unicafe;
