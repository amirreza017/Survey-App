import Form from "react-bootstrap/Form";
import { v4 as uuidv4 } from "uuid";
import "./Questions.scss";
import React, { useRef } from "react";

const Questions = ({ sur, apn, radioAnswers, setRadioAnswers, checkboxAnswers, setCheckboxAnswers, textareaValue, setTextareaValue }) => {

  const textareaRef = useRef(null)

  const handleRadioOptionChange = (questionId, optionId, isChecked) => {
    setRadioAnswers((prevRadios) => ({
      ...prevRadios,
      [questionId]: {
        [optionId]: isChecked,
      },
    }));
  };

  const handleCheckboxOptionChange = (questionId, optionId, isChecked) => {
    setCheckboxAnswers((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionId]: {
        ...prevSelectedOptions[questionId],
        [optionId]: isChecked,
      },
    }));
  };

  // const handleTextareaChange = (e, questionId) => {
  //   setTextareaValue(() => ({
  //     [questionId]: e
  //   }))
  // }

  return (
    <>
      {sur.slice(apn - 1, apn).map((ques) => {
        if (ques.type === "test") {
          return (
            <div className="animation" key={`test-${uuidv4()}`}>
              <h4>{ques.textQuestion}</h4>
              <Form>
                {ques.radioAnswers.map((ans, indexRadio) => {
                  return (
                    <div
                      className="mb-3"
                      key={`inline-${indexRadio}-${uuidv4()}`}
                    >
                      <Form.Check
                        inline
                        key={`inline-${indexRadio}-${uuidv4()}`}
                        label={ans.answer}
                        onChange={(e) =>
                          handleRadioOptionChange(
                            ques.id,
                            ans.id,
                            e.target.checked
                          )
                        }
                        checked={radioAnswers[ques.id]?.[ans.id] || false}
                        value={ans.symbol}
                        name="group1"
                        type="radio"
                        id={`inline-radio-1`}
                      />
                    </div>
                  );
                })}
              </Form>
            </div>
          );
        } else if (ques.type === "multipleChoice") {
          return (
            <div className="animation" key={`multipleChoice-${uuidv4()}`}>
              <h4>{ques.textQuestion}</h4>
              <Form>
                {ques.checkboxAnswers.map((ans, indexCheckbox) => {
                  return (
                    <div
                      className="mb-3"
                      key={`inline-${indexCheckbox}-${uuidv4()}`}
                    >
                      <Form.Check
                        inline
                        key={`inline-${indexCheckbox}-${uuidv4()}`}
                        label={ans.answer}
                        onChange={(e) => 
                          handleCheckboxOptionChange(
                            ques.id,
                            ans.id,
                            e.target.checked
                          )
                        }
                        value={ans.symbol}
                        checked={checkboxAnswers[ques.id]?.[ans.id] || false}
                        name="group1"
                        type="checkbox"
                        id={`inline-checkbox-1`}
                      />
                    </div>
                  );
                })}
              </Form>
            </div>
          );
        } else if (ques.type === "descriptive") {
          return (
            <div className="animation" key={`descriptive-${uuidv4()}`}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>{ques.textQuestion}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  ref={textareaRef}
                  onChange={(e) => {
                    setTextareaValue(() => ({
                      [ques.id]: e.target.value
                    }))
                  }}
                  onFocus={(e) => {
                    e.target.selectionStart = e.target.selectionEnd = e.target.value.length;
                  }}
                  autoFocus
                  value={textareaValue[ques.id] || ''}
                />
                {/* {console.log(Boolean(textareaValue))} */}
              </Form.Group>
            </div>
          );
        }
      })}
    </>
  );
};

export default Questions;
