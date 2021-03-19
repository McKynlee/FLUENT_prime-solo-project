// Main page learners will use to practice the foreign language
// '/challenge'

import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';

function InfoPage() {
  const dispatch = useDispatch();

  ///////////////////GENERATE RANDOM WORD ID://///////////////
  function getRandomWordInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  let randomWordId = getRandomWordInt(75);
  console.log('randomWordInt:', randomWordId);


  ///////////////////GENERATE RANDOM PHOTO ID://///////////////
  // Function to generate random id number to pull new photo from Lorem Picsum:
  function getRandomPhotoId(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  let randomPhotoId = getRandomPhotoId(207);
  console.log('randomPhotoInt:', randomPhotoId);


  ///////////////////FETCH RANDOM WORD AND PHOTO_ID FROM DB://///////////////
  useEffect(() => {
    fetchRandomWord();
    fetchRandomPhotoId();
  }, []);

  const fetchRandomWord = () => {
    dispatch({
      type: 'FETCH_RANDOM_WORD',
      payload: randomWordId
    })
  }

  const fetchRandomPhotoId = () => {
    dispatch({
      type: 'FETCH_RANDOM_PHOTO',
      payload: randomPhotoId
    })
  }

  ///////////////////BRING IN DATA FROM REDUCERS://///////////////
  // Bring in all available words in foreign language:
  const words = useSelector((store) => store.words);
  console.log('words:', words);

  const randomWord = words[0].word;
  console.log('randomWord:', randomWord);
  const wordId = words[0].id;
  console.log('wordId:', wordId);

  // Bring in random photo_id:
  const photoId = useSelector((store) => store.photo);
  console.log('photoId:', photoId);

  // const loremPicsumId = photoId[0].photo_id
  // console.log('randomPhotoId', loremPicsumId);

  // Bring in learner's user data:
  const user = useSelector((store) => store.user);
  console.log('user:', user);

  // Bring in learner's learner data:
  const learner = useSelector((store) => store.learner[0]);
  console.log('learner:', learner);

  // Bring in instructor data (with whom learner is paired):
  const pairedInstructor = useSelector((store) => store.pairedInstructor[0]);
  console.log('pairedInstructor:', pairedInstructor);


  ///////////////////GET LOREM PICSUM PHOTO URL TO RENDER://///////////////
  let imageSRC = `https://picsum.photos/id/${photoId}/200/300`


  ///////////////////CONDITIONAL RENDERING://///////////////
  // Control grammar of welcome message depending on pronouns:
  let welcomeMessage = '¡Bienvenidos!';
  if (user.pronouns === 'she/her/hers') {
    welcomeMessage = '¡Bienvenida!';
  }
  if (user.pronouns === 'he/him/his') {
    welcomeMessage = '¡Bienvenido!';
  }


  ///////////////////MANAGE TEXT TO SPEECH://///////////////
  const [textToSpeak, setTextToSpeak] = useState('');
  // useRef hook returns a mutable object with .current property,
  // refs are React's equivalent to the vanillaJS document.querySelector,
  // useRef allows us to keep non-state per-component info around, like the text we want spoken:
  // const textInput = useRef(null);


  // Info from Web API for mexican spanish female voice:
  // let paulinasVoice = { id: 48, voiceURI: "Paulina", name: "Paulina", lang: "es-MX", localService: true };

  // When speak button is clicked, capture text in input area
  // inside inputToSpeak variable:
  const onWordClick = (speakThis) => {
    // console.log('on button click, inputToSpeak.current:', textInput.current.value);

    // // .current points to the mounted text input element
    // let textToSpeak = textInput.current.value;

    let msg = new SpeechSynthesisUtterance();
    console.log('msg:', msg);

    // LIST OF AVAILABLE VOICES:
    // speechSynthesis.getVoices().forEach(function (voice) {
    //   console.log('voice:', voice.name, voice.default ? voice.default : '');
    // });

    // Specify what voice you want speaking the message:
    msg.voice = speechSynthesis.getVoices().filter(function (voice) { return voice.name == 'Paulina'; })[0];
    msg.lang = "es-MX";
    msg.rate = 0.8;
    msg.text = speakThis;
    msg.volume = 10;
    speechSynthesis.speak(msg);
  }


  ///////////////////MANAGE CAPTURING INPUTS://///////////////
  const [photoDescription, setPhotoDescription] = useState('');
  const [wordSentence, setWordSentence] = useState('');
  const [qForInstructor, setQForInstructor] = useState('');

  console.log('photoDescription:', photoDescription);
  console.log('wordSentence:', wordSentence);
  console.log('qForInstructor:', qForInstructor);

  // When form is submitted, save inputs to db:
  const submitChallenge = () => {
    console.log('submitChallenge');
  }


  ///////////////////SEND INPUTS TO SAGA://///////////////
  // dispatch: imageSRC, photoDescription, wordSentence, wordId, learner.id, qForInstructor


  return (
    <div className="container">
      <h1>Welcome, {user.first_name}</h1>
      <h2>{welcomeMessage}</h2>

      <form onSubmit={submitChallenge}>
        <section className='challenge-picture-section'>
          <h4>La primera misión:</h4>
          <p><em>The first mission:</em></p>
          <label>Describe esta foto:
            <textarea rows="4" cols="50"
              value={photoDescription}
              onClick={() => onWordClick(photoDescription)}
              onChange={(event) => setPhotoDescription(event.target.value)}
              placeholder="Describe this photo"></textarea>
          </label>
          <img src={imageSRC} alt="randomly-generated photo" />
        </section>

        <section className='challenge-word-section'>
          <h4>La segunda misión:</h4>
          <p><em>The second mission:</em></p>
          <label>Escribe una frase con esta palabra: {randomWord}
            <textarea rows="4" cols="50"
              value={wordSentence}
              onClick={() => onWordClick(wordSentence)}
              onChange={(event) => setWordSentence(event.target.value)}
              placeholder="Write a complete sentence using this word.">
            </textarea>
          </label>
        </section>

        <section className='challenge-word-section'>
          <h4>Preguntas generales:</h4>
          <p><em>General questions:</em></p>
          <label>
            <textarea value={qForInstructor}
              onChange={(event) => setQForInstructor(event.target.value)}
              placeholder="Write any questions you have for your instructor.">
            </textarea>
          </label>
        </section>

        <button>Submit</button>
      </form>
      {/* <LogOutButton className="btn" /> */}
    </div >
  );
}

export default InfoPage;
