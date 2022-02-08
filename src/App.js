import { useState, useEffect } from 'react'; // importing hooks from react
import { getText, addText } from './firebase.js'; // importing our functions from the firebase.js file we made

function App() {
	const [inputText, setInputText] = useState(''); // text that the user inputs
	const [texts, setTexts] = useState([]); // text array we get from database

	const getData = async () => { // async function because we depend on getting a response from database for other following actions
		let tempText = await getText(); // get text from database
		setTexts(tempText); // set the text array to the useState texts
	}

	useEffect(() => {
		getData()
	}, []); // onload, this will call getData() function to get text from database

	const handleAddText = () => {
		addText(inputText);
		/* ^^ adding text that the user inputs to the database
			this function is not async because we do not depend on the data being written to the
			database before we continue with the next lines. If this was the case we would make
			this an async function and await this line.
		*/
		setTexts(prev => [...prev, {text: inputText}]);
		/* ^^ setting the texts array to have the new value the user enters
			the setTexts function for setting the useState has a paramater of a callback
			function we can use instead of just a value, this way we can get the current state of the value
			in the useState, mutate it, then return a new value to apply to it. This kind of arrow function
			syntax, with no curly braces, will automatically return whatever is after it. So this will return a new
			array with an object at the end with property text.

			The spread syntax (...) is for spreading an array into its elements, so in this case it would
			take the value of prev (which is the current array of texts), and it would add each element
			to the new array we specified with the square brackets
		*/
		setInputText(''); // setting the text in the input to nothing because its it looks better (also the user doesn't have to remove it themselfs when they want to add something new)
	}

  return (
    <div className="App">
			<input onChange={e => setInputText(e.target.value)} placeholder="Enter text" value={inputText} />
			{/* ^^ updates useState with value in input
					also, placeholder is a property of html inputs that makes gray text
					in the input before you start typing. its just a styling thing, not
					necessary for function
			*/}
			<button onClick={handleAddText}>Add to database</button>
			<ul>{/* ul element is unumbered list (bullet points)*/}
				{
					texts.map(item => { // mapping over texts array and returning bullet points
						return <li>{item.text}</li> // li element is list index, or the bullet point element
						// also if the li is in an ol element (ordered list) instead of ul (unumbered list), the li would be numbered
					})
				}
			</ul>
    </div>
  );
}

export default App;
