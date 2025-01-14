//import { NextResponse } from "next/server"

/*
export const GET = () => {
    return new NextResponse("This is my first API")
}*/

/*import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  const client = await db.connect();

  try {
    // Create table if it doesn't already exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS Pets (
        Name varchar(255),
        Owner varchar(255)
      );
    `;

    // Insert data into the table
    const names: [string, string] = ['Fiona', 'Lucy'];
    await client.sql`
      INSERT INTO Pets (Name, Owner)
      VALUES (${names[0]}, ${names[1]});
    `;

    // Query data from the table
    const pets = await client.sql`SELECT * FROM Pets;`;

    // Return the pets data as JSON
    return NextResponse.json({ pets: pets.rows });
  } catch (error) {
    // Handle errors and return the error message
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}*/

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Insert data into the Pets table

    /*const pets = await prisma.pets.createMany({
      data: [
        { Name: "Fiona", Owner: "Alice" },
        { Name: "Lucy", Owner: "Bob" },
      ],
      skipDuplicates: true, // Prevent duplicate entries
    });*/

    const allPops = await prisma.popusertable.findMany();
    return NextResponse.json({ user: allPops });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
      const { first_name, last_name } = await request.json(); // Parse request body
      
      if (!first_name || !last_name) {
        return NextResponse.json(
          { error: "Both 'Name' and 'Last Name' are required fields." },
          { status: 400 }
        );
      }
  
      const newpop = await prisma.popusertable.create({
        data: {
          first_name,
          last_name,
        },
      });
  
      return NextResponse.json({ newUser: newpop }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
  }

  export async function PUT(request: Request){
    try{
      const {pop_user_id,first_name,last_name}= await request.json();
  
      if(!pop_user_id || (!first_name&&!last_name)){
        return NextResponse.json({error:"please enter the id"},{status:400})
      }
  
      const updatePet = await prisma.popusertable.update(
        {where:{pop_user_id},
        data:{...(first_name && {first_name}),...(last_name && {last_name})}}
      )

      return NextResponse.json({updated:updatePet});
    }catch(error){
      return NextResponse.json({error: (error as Error).message},{status:400})
    }
  }

  export async function DELETE(request: Request){
    try{
      const {pop_user_id} = await request.json();
      if(!pop_user_id){
        return NextResponse.json({error:"please enter an id"})
      }

      const deletedPop = await prisma.popusertable.delete({where:{pop_user_id}})
      return NextResponse.json({popDeleted:deletedPop})

    }catch(error){
      return NextResponse.json({error: (error as Error).message},{status:400});
    }
  }