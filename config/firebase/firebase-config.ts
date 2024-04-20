const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_FIREBASE_MESSAGING_ID,
  appId: process.env.NEXT_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_FIREBASE_MEASUREEMENT_ID,
}

export default firebaseConfig
