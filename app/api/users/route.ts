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

    const allPets = await prisma.pets.findMany();
    return NextResponse.json({ pets: allPets });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
      const { Name, Owner } = await request.json(); // Parse request body
      
      if (!Name || !Owner) {
        return NextResponse.json(
          { error: "Both 'Name' and 'Owner' are required fields." },
          { status: 400 }
        );
      }
  
      const newPet = await prisma.pets.create({
        data: {
          Name,
          Owner,
        },
      });
  
      return NextResponse.json({ petssdasd: newPet }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
  }

  export async function PUT(request: Request){
    try{
      const {id,Name,Owner}= await request.json();
  
      if(!id || (!Name&&!Owner)){
        return NextResponse.json({error:"please enter the id"},{status:400})
      }
  
      const updatePet = await prisma.pets.update(
        {where:{id},
        data:{...(Name && {Name}),...(Owner && {Owner})}}
      )

      return NextResponse.json({updated:updatePet});
    }catch(error){
      return NextResponse.json({error: (error as Error).message},{status:400})
    }
  }

  export async function DELETE(request: Request){
    try{
      const id = await request.json();
      if(!id){
        return NextResponse.json({error:"please enter an id"})
      }

      const deletedPet = await prisma.pets.delete({where:{id}})
      return NextResponse.json({petDeleted:deletedPet})

    }catch(error){
      return NextResponse.json({error: (error as Error).message},{status:400});
    }
  }