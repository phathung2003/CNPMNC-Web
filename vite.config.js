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
    'process.env.VITE_API_INFO': JSON.stringify(process.env.VITE_API_INFO)
  }
})
