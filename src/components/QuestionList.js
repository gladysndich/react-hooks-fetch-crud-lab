import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);



  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(response => response.json())
      .then((data) => {
        setIsLoaded(true);
        setQuestions(data);
      },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((question) => {
          if (question.id === updatedQuestion.id) return updatedQuestion;
          return question;
        });
        setQuestions(updatedQuestions);
      });
  }

  function deleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE'
    }).then(response => {
      return response.json()
    }).then(() => {
      const updatedQuestions = questions.filter((q) => q.id !== id);
      // this is the data we get after deleting our data,
      console.log(updatedQuestions)
      setQuestions(updatedQuestions);
    });
    alert(`Question ${id} deleted successfully`);
  }




  if (error) {
    return <div> Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <section>
        <h1>Quiz Questions</h1>

        {questions.map(question => (
          <ul key={question.id}>{/* display QuestionItem components here after fetching */}
            <QuestionItem question={question} deleteQuestion={deleteQuestion} handleAnswerChange={handleAnswerChange}/>
          </ul>
        ))}

      </section>
    );
  }
}

export default QuestionList;
