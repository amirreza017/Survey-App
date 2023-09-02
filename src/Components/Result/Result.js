import React from "react";

const Result = ({ data }) => {
  return (
    <div className='container-results'>
      <h2 className="container-results-header">نتایج</h2>
      {data.map((ques) => (
        <div className="container-results-padding" key={ques.id}>
          <h4>{ques.textQuestion}{console.log(ques.textQuestion)}</h4>
          {ques.type === "test" && (
            <ul>
              {ques.radioAnswers.map((ans) => (
                <li key={ans.id}>
                  {ans.isChecked && <span>&#10003; </span>}
                  {ans.answer}
                  {ans.isChecked && console.log(ans.answer)}
                </li>
              ))}
            </ul>
          )}
          {ques.type === "multipleChoice" && (
            <ul>
              {ques.checkboxAnswers.map((ans) => (
                <li key={ans.id}>
                  {ans.isChecked && <span>&#10003; </span>}
                  {ans.answer}
                  {ans.isChecked && console.log(ans.answer)}
                </li>
              ))}
            </ul>
          )}
          {ques.type === "descriptive" && <p>{ques.answer}{console.log(ques.answer)}</p>}
        </div>
      ))}
    </div>
  );
};

export default Result;
