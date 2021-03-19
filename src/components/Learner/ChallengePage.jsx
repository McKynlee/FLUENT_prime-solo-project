// Main page learners will use to practice the foreign language
// '/challenge'

import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';

function InfoPage() {
  const dispatch = useDispatch();

  ///////////////////MANAGE RANDOM WORD ID://///////////////
  function getRandomWordInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  let randomWordId = getRandomWordInt(75);
  console.log('randomWordInt:', randomWordId);


  ///////////////////FETCH RANDOM WORD FROM DB://///////////////
  useEffect(() => {
    dispatch({
      type: 'FETCH_RANDOM_WORD',
      payload: randomWordId
    })
  }, []);



  ///////////////////BRING IN DATA FROM REDUCERS://///////////////
  // Bring in all available words in foreign language:
  const words = useSelector((store) => store.words);
  console.log('words:', words);

  const randomWord = words[0].word;
  console.log('randomWord:', randomWord);

  // Bring in specific word with randomId in foreign language list:
  // const randomWord = useSelector((store) => store.randomWord);
  // console.log('randomWord:', randomWord);

  // Bring in learner's user data:
  const user = useSelector((store) => store.user);
  console.log('user:', user);

  // Bring in learner's learner data:
  const learner = useSelector((store) => store.learner[0]);
  console.log('learner:', learner);

  // Bring in instructor data (with whom learner is paired):
  const pairedInstructor = useSelector((store) => store.pairedInstructor[0]);
  console.log('pairedInstructor:', pairedInstructor);


  ///////////////////CONDITIONAL RENDERING://///////////////
  // Control grammar of welcome message depending on pronouns:
  let welcomeMessage = '¡Bienvenidos!';
  if (user.pronouns === 'she/her/hers') {
    welcomeMessage = '¡Bienvenida!';
  }
  if (user.pronouns === 'he/him/his') {
    welcomeMessage = '¡Bienvenido!';
  }

  ///////////////////MANAGE RANDOM PHOTO://///////////////
  // Function to generate random id number to pull new photo from Lorem Picsum:
  // I know there are at least 1,000 but less than 1,100 photo ID's available.
  function getRandomPhotoId(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  // Capture random Int
  let randomPhotoId = getRandomPhotoId(1000);
  console.log('randomPhotoInt:', randomPhotoId);

  // Incorporate random Int as photo ID to be used in JSX:
  // Send this to db as picture_url
  let imageSRC = `https://picsum.photos/id/${randomPhotoId}/200/300`


  ///////////////////MANAGE TEXT TO SPEECH://///////////////


  return (
    <div className="container">
      <h1>Welcome, {user.first_name}</h1>
      <h2>{welcomeMessage}</h2>

      <section className='challenge-picture-section'>
        <h4>La primera misión:</h4>
        <p><em>The first mission:</em></p>
        <label>Describe esta foto:<textarea placeholder="Describe this photo"></textarea></label>
        <img src={imageSRC} alt="randomly-generated photo" />
      </section>

      <section className='challenge-word-section'>
        <h4>La segunda misión:</h4>
        <p><em>The second mission:</em></p>
        <label>Escribe una frase con esta palabra: {randomWord}
          <textarea placeholder="Write a complete sentence using this word."></textarea>
        </label>
      </section>

      <LogOutButton className="btn" />
    </div >
  );
}

export default InfoPage;
