import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: Retrieve all pets
export async function GET() {
  try {
    const allPets = await prisma.pets.findMany();
    return NextResponse.json({ pets: allPets });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// POST: Add a new pet
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

    return NextResponse.json({ pet: newPet }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// PUT: Update a pet by ID
export async function PUT(request: Request) {
  try {
    const { id, Name, Owner } = await request.json(); // Parse request body
    if (!id || (!Name && !Owner)) {
      return NextResponse.json(
        { error: "'id' is required. Provide at least one field to update ('Name' or 'Owner')." },
        { status: 400 }
      );
    }

    const updatedPet = await prisma.pets.update({
      where: { id },
      data: { ...(Name && { Name }), ...(Owner && { Owner }) },
    });

    return NextResponse.json({ pet: updatedPet });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// DELETE: Remove a pet by ID
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json(); // Parse request body
    if (!id) {
      return NextResponse.json({ error: "'id' is required to delete a pet." }, { status: 400 });
    }

    const deletedPet = await prisma.pets.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Pet deleted successfully", pet: deletedPet });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
