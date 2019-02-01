import { watch } from 'melanke-watchjs';
import axios from 'axios';
import validator from 'validator';
import formRenderer from './formRenderer';
import xmlParser from './xmlParser';
import feedRenderer from './feedRenderer';


export default () => {
  // const proxy = 'https://crossorigin.me/';
  const proxy = 'https://cors-anywhere.herokuapp.com/';

  const state = {
    input: '',
    inputIsValid: false,
    feedURLs: [],
    feedFlow: [],
  };


  const inputField = document.getElementById('rss-link');
  inputField.addEventListener('input', (e) => {
    const currentInput = e.target.value;
    state.input = currentInput;
    state.inputIsValid = validator.isURL(currentInput) && !state.feedURLs.includes(currentInput);
  });

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    state.feedURLs = [...state.feedURLs, state.input];

    const link = `${proxy}${state.input}`;
    axios.get(link).then((response) => {
      const xmlData = xmlParser(response.data);
      state.feedFlow = [...state.feedFlow, xmlData];
    })
      .then((err) => {
        if (err) {
          console.log('Something went wrong. Please, reload the page and try again');
        }
      })
      .then(() => {
        state.input = '';
        state.inputIsValid = false;
        form.reset();
      });
  });

  watch(state, 'input', () => formRenderer(state));
  watch(state, 'feedFlow', () => feedRenderer(state));
};
