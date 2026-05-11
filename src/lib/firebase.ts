import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
// The app will break without specifying firestoreDatabaseId if it exists in config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');
export const auth = getAuth(app);

// Validation check to test connection to Firestore as per instructions
import { doc, getDocFromServer } from 'firebase/firestore';

async function testConnection() {
  try {
    // Testing specific collection 'guestbook' since that is what we expect
    await getDocFromServer(doc(db, 'guestbook', 'connection-test'));
    console.log("Firebase connection successful.");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. The client is offline.");
    } else {
      console.error("Firestore connection testing error:", error);
    }
  }
}
testConnection();
