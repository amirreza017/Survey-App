import { useEffect, useState } from 'react';
import Questions from '../Questions/Questions'
import Pagination from '../Pagination/Pagination'
import Result from '../Result/Result';
import Survey from '../../Data/survey.json';
import './App.scss';


function App() {
  
  const [survey, setSurvey] = useState([...Survey])

  const [pageCounts, setPageCounts] = useState(0)
  const [activePageNumber, setActivePageNumber] = useState(1)

  const [showQuestions, setShowQuestions] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(() => {
    const storedTimer = localStorage.getItem('timer');
    return storedTimer ? parseInt(storedTimer, 10) : 120;
  })

  const [radios, setRadios] = useState({});
  const [checkboxes, setCheckboxes] = useState({});
  const [textarea, setTextarea] = useState({});

  const minute = Math.floor(timer / 60);
  const second = timer % 60;
  const formattedSecond = second < 10 ? `0${second}` : second;

  useEffect(() => {
    if (timer === 0) {
      setShowQuestions(false);
      setShowResults(true);
    }

    if (timer > 0 && showQuestions) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [timer, showQuestions]);

  useEffect(() => {
    setPageCounts(calculatePageCounts())
  },[survey])

  useEffect(() => {
    const transformedData = transformDataToJSON(survey, radios, checkboxes, textarea);
    setSurvey(transformedData)
  }, [radios, checkboxes, textarea])
  
  useEffect(() => {
    localStorage.setItem('timer', timer.toString());
  }, [timer]);

  const handleClick = (pageNumber) => {
    setActivePageNumber(pageNumber)
  }
  
  const calculatePageCounts = () => {
    if(survey.length % 1 > 0) {
      return parseInt(survey.length / 1 + 1)
    }
    return parseInt(survey.length / 1)
  }
  
  const transformDataToJSON = (sur, radios, checkboxes, textarea) => {
    return sur.map((ques) => {
      if (ques.type === "test") {
        const radioAnswers = ques.radioAnswers.map((ans) => ({
          ...ans,
          isChecked: radios[ques.id]?.[ans.id] || false,
        }));
  
        return {
          ...ques,
          radioAnswers,
        };
      } else if (ques.type === "multipleChoice") {
        const checkboxAnswers = ques.checkboxAnswers.map((ans) => ({
          ...ans,
          isChecked: checkboxes[ques.id]?.[ans.id] || false,
        }));
  
        return {
          ...ques,
          checkboxAnswers,
        };
      } else if (ques.type === "descriptive") {
        return {
          ...ques,
          answer: textarea[ques.id] || "",
        };
      }
    });
  }
  

  return (
    <div className="container">
      {showQuestions && (
        <div className='container-timer'>
          زمان باقی‌مانده: {minute}:{formattedSecond}
        </div>
      )}
      {showQuestions && (
        <>
          <h5 className='container-header'>لطفا به سوالات زیر پاسخ دهید</h5>
          <div className='container-question'>
            <Questions 
            sur={survey} 
            apn={activePageNumber}
            radioAnswers={radios}
            setRadioAnswers={setRadios}
            checkboxAnswers={checkboxes}
            setCheckboxAnswers={setCheckboxes}
            textareaValue={textarea}
            setTextareaValue={setTextarea}
            />
            <Pagination 
            pc={pageCounts} 
            apn={activePageNumber} 
            hc={handleClick} 
            />
          </div>
        </>
      )}
      {showResults && (
        <Result
        data={survey}
        />
      )}
    </div>
  );
}

export default App;
