import { initializeApp } from 'firebase/app'; // importing the initializeApp from the firebase dependency
import { collection, addDoc, getFirestore, getDocs } from 'firebase/firestore'; // importing function that we use for getting/setting data in firestore
/*
	there are other funciton you can import from different parts of the firebase dependency
	such as firebase/auth etc..., you can see more in the documentation.
	link to docs: https://firebase.google.com/docs
*/

const config = {
	// database key, this is unique to your firebase project, don't share this with anyone, or put it in a public file
	apiKey: "AIzaSyCYeH4JFdNXTDB2PpWghSeX-oFm4VEHdro",
  authDomain: "fir-fefc9.firebaseapp.com",
  projectId: "fir-fefc9",
  storageBucket: "fir-fefc9.appspot.com",
  messagingSenderId: "1075689103759",
  appId: "1:1075689103759:web:a8771ff5f658b72dba2bfa"
}

initializeApp(config); // initializing firebase with the config we got from firebase console
const db = getFirestore(); // getting a reference to the firestore database

const addText = async (text) => {
	const colRef = collection(db, 'text'); // getting a reference to the text collection in firestore
	let obj = {
		// because firestore document data is in key: value format, we must give the value of text a key, which in this case is also text
		text: text
	}
	await addDoc(colRef, obj); // adding the new doc to firestore with the imported function
}
			
const getText = async () => {
	const colRef = collection(db, 'text'); // reference to the text collection
	const snapshot = await getDocs(colRef); // getting the 'snapshot' of documents in the collection
	// getDocs will return information on a collection, including the documents inside
	// getDoc however, will only return a single document.
	let docs = [];
	snapshot.forEach(doc => { // looping over the snapshot of documents and adding them to the array
		docs.push(doc.data());
		// the object returned by firestore for a document is different than the content in the document
		// so to get the data in the particular document, you call the function 'data()'
	});
	return docs;
}

export { // exporting the functions with only the export keyword so they can be imported individually
	addText,
	getText
}