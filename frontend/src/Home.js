import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "./Header";
import StudentHome from "./StudentHome";
import SchoolHome from "./SchoolHome";

function Home(props) {
  const [user, setUser] = useState("");
  const [is_student, setStatus] = useState(null);
  const [school, setSchool] = useState("");
  const [quizes, setQuizes] = useState([]);
  const [refresh,setRefresh] = useState(false)

  const handleRefresh = () => { 
    setRefresh(!refresh)
  }
  const handleLogout = () => {
    fetch("account/logout").then((response) => {
      if (response.ok) {
        setUser(null);
      }
    });
  };

  const handleQuizDelete = (id) => {
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quiz_id: id }),
    };
    fetch("/quizes/delete-quiz", requestOption)
      .then((response) => response.json())
      .then((data) => {
        handleRefresh()
      });
  };

  useEffect(() => {
    async function fetchuser() {
      let response = await fetch("/account/get-user")
        .then((response) => response.json())
        .then((data) => {
          if (data.is_student != null) {
            setStatus(data.is_student);
            if (is_student) {
              setUser(data.username);
              setSchool(data.student_schoolName);
            } else setUser(data.schoolname);
          } else {
            props.history.push("/login");
          }
        });
    }
    fetchuser();
  }, [user]);
  useEffect(() => {
    async function fetchQuizes() {
      let response = await fetch("/quizes/get-quizes")
        .then((response) => response.json())
        .then((data) => {
          setQuizes(data);
        });
    }
    fetchQuizes();
  }, [refresh])
  return (
    <div className='home'>
      {is_student ? (
        <StudentHome user={user} school={school} quizes={quizes} handleLogout={handleLogout} />
      ) : (
          <SchoolHome user={user} quizes={quizes} handleQuizDelete={handleQuizDelete} handleRefresh={handleRefresh} handleLogout={handleLogout}/>
      )}
    </div>
  );
}

export default Home;
