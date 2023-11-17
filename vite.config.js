import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    //Env variable from .env file
    'process.env.VITE_API_MAIN': JSON.stringify(process.env.VITE_API_MAIN),
    'process.env.VITE_API_CONTACT': JSON.stringify(process.env.VITE_API_CONTACT),
    'process.env.VITE_API_INFO': JSON.stringify(process.env.VITE_API_INFO),

    'process.env.VITE_API_CAR_ADD': JSON.stringify(process.env.VITE_API_CAR_ADD),
    'process.env.VITE_API_CAR_EDIT': JSON.stringify(process.env.VITE_API_CAR_EDIT),
    'process.env.VITE_API_CAR_DELETE': JSON.stringify(process.env.VITE_API_CAR_DELETE),
    'process.env.VITE_API_CAR_MAIN': JSON.stringify(process.env.VITE_API_CAR_MAIN),
    'process.env.VITE_API_CAR_DETAIL': JSON.stringify(process.env.VITE_API_CAR_DETAIL),

    'process.env.VITE_API_CUSTOMER_ADD': JSON.stringify(process.env.VITE_API_CUSTOMER_ADD),
    'process.env.VITE_API_CUSTOMER_EDIT': JSON.stringify(process.env.VITE_API_CUSTOMER_EDIT),
    'process.env.VITE_API_CUSTOMER_MAIN': JSON.stringify(process.env.VITE_API_CUSTOMER_MAIN),

    'process.env.VITE_API_RENT_ADD': JSON.stringify(process.env.VITE_API_RENT_ADD),
    'process.env.VITE_API_RENT_EDIT': JSON.stringify(process.env.VITE_API_RENT_EDIT),
    'process.env.VITE_API_RENT_CHECKOUT': JSON.stringify(process.env.VITE_API_RENT_CHECKOUT),

    'process.env.VITE_API_RENT_DETAIL': JSON.stringify(process.env.VITE_API_RENT_DETAIL),

    'process.env.VITE_API_BOOK_ADD': JSON.stringify(process.env.VITE_API_BOOK_ADD),
    'process.env.VITE_API_BOOK_CANCEL': JSON.stringify(process.env.VITE_API_BOOK_CANCEL),
    'process.env.VITE_API_BOOK_CREATE_RENT': JSON.stringify(process.env.VITE_API_BOOK_CREATE_RENT),
    'process.env.VITE_API_BOOK_DETAIL': JSON.stringify(process.env.VITE_API_BOOK_DETAIL),

    'process.env.VITE_API_STAFF_ADD': JSON.stringify(process.env.VITE_API_STAFF_ADD),
    'process.env.VITE_API_STAFF_EDIT': JSON.stringify(process.env.VITE_API_STAFF_EDIT),
    'process.env.VITE_API_STAFF_DELETE': JSON.stringify(process.env.VITE_API_STAFF_DELETE),
    'process.env.VITE_API_STAFF_MAIN': JSON.stringify(process.env.VITE_API_STAFF_MAIN)
  }
})
