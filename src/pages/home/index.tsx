import React, { useState, useEffect } from 'react';
import './style.css';
import { Card, CardProps } from '../../components/card/';

type ProfileResponse = {
  name: string;
  avatar_url: string;
}

type User = {
  name: string;
  avatar_url: string;
}

export function Home() {

  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState<User>({} as User);

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudents(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {
    //tudo o que tiver aqui dentro, serão as ações ou o que eu quero que execute
    // o useEffect é executado assim que nossa interface é renderizada, executado automáticamente
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/brunosuza')
      const data = await response.json() as ProfileResponse;
      setUser({
        name: data.name,
        avatar_url: data.avatar_url,
      });
    }

    fetchData();
  }, [])

  return (
    <div className="container">
      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar_url} alt="" />
        </div>
      </header>
      <input 
        type="text"  
        placeholder="Digite aqui..."
        onChange={e => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>Adicionar</button>
      {
        students.map(student => <Card key={student.time} name={student.name} time={student.time} />)
      }
    </div>
  )
}
