import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { TIBook, TSBookSelect, bookTable } from "../drizzle/schema";


export const booksService = async ():Promise<TSBookSelect[] | null>=> {
    return await db.query.bookTable.findMany();    
}

export const getBookByIdService = async (id:number):Promise<TSBookSelect | undefined> => {
    return await db.query.bookTable.findFirst({
       where: eq(bookTable.book_id, id)
    })
}

// insertBookService function adjusted to return the created book
export const insertBookService = async (book: TIBook) => {
    const result = await db.insert(bookTable).values(book)
        .returning({ book_id: bookTable.book_id, title: bookTable.title, author: bookTable.author, year: bookTable.year})
        .execute();

    if (result) {
        // Assuming result is an array with the inserted book as the first item
        const createdBook = result[0];
        return createdBook;
    } else {
        throw new Error("Failed to insert book");
    }
}


export const updateBookService = async(id:number,book:TIBook) => {
    await db.update(bookTable).set(book).where(eq(bookTable.book_id,id));
    return "Book updated successfully 🎉"
}

export const deleteBookService = async(id:number) => {
    await db.delete(bookTable).where(eq(bookTable.book_id,id));
    return "Book deleted successfully 🎉"
}



