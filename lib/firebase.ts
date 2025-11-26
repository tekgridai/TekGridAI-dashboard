import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"
import { getAuth, setPersistence, browserLocalPersistence, type Auth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD7b_hLEAPimqcsZQbe90jXpHEQgepnZjw",
  authDomain: "tekgridai.firebaseapp.com",
  projectId: "tekgridai",
  storageBucket: "tekgridai.firebasestorage.app",
  messagingSenderId: "1024945516781",
  appId: "1:1024945516781:web:7d231eacbc05a8b3d6dce4",
}

let app: FirebaseApp | null = null
let auth: Auth | null = null

try {
  const apps = getApps()
  app = apps.length > 0 ? getApp() : initializeApp(firebaseConfig)
  auth = getAuth(app)

  setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.warn("[v0] Persistence setup warning:", error.message)
  })
  console.log("[v0] Firebase initialized successfully")
} catch (error) {
  console.error("[v0] Firebase init error:", error instanceof Error ? error.message : String(error))
}

export { app, auth }
export const isFirebaseReady = () => app !== null && auth !== null
