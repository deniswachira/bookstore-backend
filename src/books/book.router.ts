import {Hono} from "hono"
import { deleteBook, getBookById, insertBook, listAllBooks, updateBook } from "./book.controller";
import { createBookValidator } from "../validators/book.validator";
import { zValidator } from "@hono/zod-validator";

export const bookRouter = new Hono();

//get all cities
bookRouter.get('/books', listAllBooks)

//get city by id
bookRouter.get('/book/:id', getBookById)

//insert city
bookRouter.post('/books', zValidator('json',createBookValidator,(result,c)=>{
    if(!result.success) return c.text( result.error.message + "😒",400)}), insertBook)

//update city
bookRouter.put('/books/:id', updateBook)

//delete city
bookRouter.delete('/books/:id', deleteBook)
