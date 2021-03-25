// Main page learners will use to practice the foreign language
// '/challenge'

import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

function InfoPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  ///////////////////GENERATE RANDOM WORD ID://///////////////
  function getRandomWordInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  let randomWordId = getRandomWordInt(75);
  // console.log('randomWordInt:', randomWordId);


  ///////////////////GENERATE RANDOM PHOTO ID://///////////////
  // Function to generate random id number to pull new photo from Lorem Picsum:
  function getRandomPhotoId(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  let randomPhotoId = getRandomPhotoId(207);
  // console.log('randomPhotoInt:', randomPhotoId);


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
  // console.log('words:', words);

  const randomWord = words.word;
  // console.log('randomWord:', randomWord);

  // Bring in random photo_id:
  const photoId = useSelector((store) => store.photo);
  // console.log('photoId:', photoId);

  // Bring in learner's user data:
  const user = useSelector((store) => store.user);
  // console.log('user:', user);

  // Bring in learner's learner data:
  const learner = useSelector((store) => store.learner);
  // console.log('learner:', learner);

  // Bring in instructor data (with whom learner is paired):
  const pairedInstructor = useSelector((store) => store.pairedInstructor);
  // console.log('pairedInstructor:', pairedInstructor);


  /////////////////// GET LOREM PICSUM PHOTO URL TO RENDER: /////////////////
  let imageSRC = `https://picsum.photos/id/${photoId}/200/300`


  /////////////////// CONDITIONAL RENDERING: /////////////////
  // Control grammar of welcome message depending on pronouns:
  let welcomeMessage = '¡Bienvenidos!';
  if (user.pronouns === 'she/her/hers') {
    welcomeMessage = '¡Bienvenida!';
  }
  if (user.pronouns === 'he/him/his') {
    welcomeMessage = '¡Bienvenido!';
  }


  /////////////////// MANAGE TEXT TO SPEECH: /////////////////

  // When speak button is clicked, capture text in input area
  // inside inputToSpeak variable:
  const onWordClick = (speakThis) => {
    // console.log('on button click, inputToSpeak.current:', textInput.current.value);

    // // .current points to the mounted text input element
    // let textToSpeak = textInput.current.value;

    let msg = new SpeechSynthesisUtterance();
    console.log('msg:', msg);

    // Specify how voice will speak the message:
    msg.voice = speechSynthesis.getVoices().filter(function (voice) { return voice.name == 'Paulina'; })[0];
    msg.lang = "es-MX";
    msg.rate = 0.8;
    msg.text = speakThis;
    msg.volume = 10;
    speechSynthesis.speak(msg);
  }


  /////////////////// MANAGE CAPTURING INPUTS: /////////////////
  const [photoDescription, setPhotoDescription] = useState('');
  const [wordSentence, setWordSentence] = useState('');
  const [qForInstructor, setQForInstructor] = useState('');
  const learnerId = learner.id;
  const userId = user.id;

  // console.log('photoDescription:', photoDescription);
  // console.log('wordSentence:', wordSentence);
  // console.log('qForInstructor:', qForInstructor);


  ///////////////////SEND INPUTS TO SAGA://///////////////
  // dispatch: imageSRC, photoDescription, wordSentence, randomWord, learner.id, qForInstructor
  // When form is submitted, save inputs to db:
  const submitChallenge = () => {
    swal({
      title: "Submit this challenge?",
      buttons: {
        cancel: 'Cancel',
        confirm: { text: 'Confirm', className: 'btn' }
      },
    })
      .then((confirmSubmit) => {
        if (confirmSubmit) {
          swal("Your challenge has been successfully submitted!", {
            icon: "success",
          });
          dispatch({
            type: 'CREATE_SUBMISSION',
            payload: {
              learnerId,
              imageSRC,
              photoDescription,
              randomWord,
              wordSentence,
              qForInstructor,
              userId
            },
            onComplete: history.push('/success')
          })
        }
      });
  } //end submitChallenge

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

        <button>
          Submit
        </button>
      </form>
      {/* <LogOutButton className="btn" /> */}
    </div >
  );
}

export default InfoPage;
