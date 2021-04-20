import React, { useEffect, useState} from 'react'
import './Result.css'
import Header from './Header';

function Result(props) {
  const [results,setResults]=useState([])
    useEffect(() => {
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quiz_id: props.id }),
    };
    fetch("/quizes/get-result", requestOption)
      .then((response) => response.json())
      .then((data) => {
        setResults(data)
        });
        
    }, [])
    return (
      <div className='results'>
        <Header
          handleLogout={props.handleLogout}
          back={true}
          backCallBack={props.handleShowResult}
        />
        <div className='result-header'>
          <h3>no</h3>
          <h3>username</h3>
          <h3>Percentage</h3>
          <h3>duration</h3>
        </div>
        {results.map((result, index) => {
          return (
            <div className='result'>
              <h3>{index + 1}</h3>
              <h3>{result.username}</h3>
              <h3>{(result.score*10)}%</h3>
              <h3>{result.duration} min</h3>
            </div>
          );
        })}
      </div>
    );
}

export default Result
