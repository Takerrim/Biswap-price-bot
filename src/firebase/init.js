import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

import dotenv from 'dotenv'
dotenv.config()

const app = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: "biswap-bot.appspot.com",
  messagingSenderId: "561984091119",
  appId: "1:561984091119:web:6e17bcde5fee2a7baf3c1a"
})

export const db = getFirestore(app)
