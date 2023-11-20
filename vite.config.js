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

    'process.env.VITE_API_RENT_MAIN': JSON.stringify(process.env.VITE_API_RENT_MAIN),
    'process.env.VITE_API_RENT_ADD': JSON.stringify(process.env.VITE_API_RENT_ADD),
    'process.env.VITE_API_RENT_EDIT': JSON.stringify(process.env.VITE_API_RENT_EDIT),
    'process.env.VITE_API_RENT_CHECKOUT': JSON.stringify(process.env.VITE_API_RENT_CHECKOUT),

    'process.env.VITE_API_RENT_DETAIL': JSON.stringify(process.env.VITE_API_RENT_DETAIL),

    'process.env.VITE_API_BOOK_ADD': JSON.stringify(process.env.VITE_API_BOOK_ADD),
    'process.env.VITE_API_BOOK_EDIT': JSON.stringify(process.env.VITE_API_BOOK_EDIT),
    'process.env.VITE_API_BOOK_CANCEL': JSON.stringify(process.env.VITE_API_BOOK_CANCEL),
    'process.env.VITE_API_BOOK_CREATE_RENT': JSON.stringify(process.env.VITE_API_BOOK_CREATE_RENT),
    'process.env.VITE_API_BOOK_DETAIL': JSON.stringify(process.env.VITE_API_BOOK_DETAIL),

    'process.env.VITE_API_SETTING_MAIN': JSON.stringify(process.env.VITE_API_SETTING_MAIN),
    'process.env.VITE_API_HISTORY_MAIN': JSON.stringify(process.env.VITE_API_HISTORY_MAIN),

    //API Firebase
    'process.env.VITE_API_FIREBASE_API_KEY': JSON.stringify(process.env.VITE_API_FIREBASE_API_KEY),
    'process.env.VITE_API_AUTH_DOMAIN': JSON.stringify(process.env.VITE_API_AUTH_DOMAIN),
    'process.env.VITE_API_PROJECT_ID': JSON.stringify(process.env.VITE_API_PROJECT_ID),
    'process.env.VITE_API_STORAGE_BUCKET': JSON.stringify(process.env.VITE_API_STORAGE_BUCKET),
    'process.env.VITE_API_MESSAGING_SENDER_ID': JSON.stringify(process.env.VITE_API_MESSAGING_SENDER_ID),   
    'process.env.VITE_API_APP_ID': JSON.stringify(process.env.VITE_API_APP_ID),   
    APP_ID
  }
})
