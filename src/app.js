import { watch } from 'melanke-watchjs';
import axios from 'axios';
import validator from 'validator';
import formRenderer from './formRenderer';
import parseXml from './xmlParser';
import feedRenderer from './feedRenderer';
import alert from './alerter';


export default () => {
  // const proxy = 'https://crossorigin.me/';
  const proxy = 'https://cors-anywhere.herokuapp.com/';

  const state = {
    input: '',
    inputIsValid: false,
    loading: false,
    feedURLs: [],
    feedItems: [],
    errors: [],
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
    state.loading = true;
    state.feedURLs = [...state.feedURLs, state.input];

    const link = `${proxy}${state.input}`;
    axios.get(link).then((response) => {
      const data = parseXml(response.data);
      state.feedItems = [...state.feedItems, data];
    })
      .then(() => {
        state.loading = false;
        state.input = '';
        state.inputIsValid = false;
      })
      .catch((err) => {
        if (err) {
          state.loading = false;
          state.errors = [err, ...state.errors];
          console.log('Something went wrong. Please, reload the page and try again');
        }
      });
  });

  watch(state, 'errors', () => alert(state));
  watch(state, ['input', 'loading'], () => formRenderer(state));
  watch(state, 'feedItems', () => feedRenderer(state));
};
