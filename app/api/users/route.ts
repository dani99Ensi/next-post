//import { NextResponse } from "next/server"

/*

export const GET = () => {
    return new NextResponse("This is my first API")
}*/

import { db } from '@vercel/postgres';
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
}
