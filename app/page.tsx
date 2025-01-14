"use client"
import Image from "next/image";
import ListTable from './components/ListTable';
import {Item} from './components/ListTable'
import { useState,useEffect } from "react";

//<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

export default function Home() { 
  //npm install node-fetch do not do it
  //const fetch = require("node-fetch");

  const API_URL="http://localhost:3000/api/users";
  const [users,setUsers]=useState<Item[]>([]);

  async function fetchUsers(){
    try{
      const response= await fetch(API_URL);
      const data = await response.json();
      return data.user
    }catch(error){
      console.error("Erorr fetching",error)
      return [];
    }
  }
  
  useEffect(()=>{
    async function loadUsers(){
    const result = await fetchUsers();
    setUsers(result)
    }

    loadUsers()

  },[])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <ListTable items={users}/>  
      </main>
    </div>
  );
}
