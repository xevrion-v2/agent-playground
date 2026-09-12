// src/app/api/todos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { todos } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import { z } from 'zod';

// Request validation schemas
const todoInputSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  completed: z.boolean().optional(),
});

export async function GET() {
  try {
    const allTodos = await db.select().from(todos);
    return NextResponse.json(allTodos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = todoInputSchema.parse(body);
    
    const newTodo = await db
      .insert(todos)
      .values({
        title: validatedData.title,
        completed: validatedData.completed ?? false,
      })
      .returning();
    
    return NextResponse.json(newTodo[0], { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 });
    }
    console.error('Error creating todo:', error);
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Todo ID is required' }, { status: 400 });
    }
    
    const validatedData = todoInputSchema.partial().parse(updateData);
    
    const updatedTodo = await db
      .update(todos)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
      .where(eq(todos.id, id))
      .returning();
    
    if (!updatedTodo[0]) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedTodo[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 });
    }
    console.error('Error updating todo:', error);
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Todo ID is required' }, { status: 400 });
    }
    
    const deletedTodo = await db
      .delete(todos)
      .where(eq(todos.id, id))
      .returning();
    
    if (!deletedTodo[0]) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}