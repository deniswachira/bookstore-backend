import {Hono} from "hono"
import { deleteBook, getBookById, insertBook, listAllBooks, updateBook } from "./book.controller";
import { createBookValidator } from "../validators/book.validator";
import { zValidator } from "@hono/zod-validator";

export const bookRouter = new Hono();

//get all books
bookRouter.get('/books', listAllBooks)

//get book by id
bookRouter.get('/book/:id', getBookById)

//insert book
bookRouter.post('/books', zValidator('json',createBookValidator,(result,c)=>{
    if(!result.success) return c.text( result.error.message + "😒",400)}), insertBook)

//update book
bookRouter.put('/books/:id', updateBook)

//delete book
bookRouter.delete('/books/:id', deleteBook)
