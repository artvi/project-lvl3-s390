import { watch } from 'melanke-watchjs';
import axios from 'axios';
import validator from 'validator';
import renderForm from './formRenderer';
import parse from './xmlParser';
import renderFeed from './feedRenderer';
import alert from './alerter';
// import update from './update';


export default () => {
  // const proxy = 'https://crossorigin.me/';
  const proxy = 'https://cors-anywhere.herokuapp.com/';

  const state = {
    input: '',
    inputIsValid: false,
    loading: false,
    feedURLs: [],
    feedItems: [],
    error: null,
    articles: {},
    updates: [],
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
    state.error = null;
    state.feedURLs = [...state.feedURLs, state.input];

    const link = `${proxy}${state.input}`;
    axios.get(link).then((response) => {
      const data = parse(response.data);
      data.link = link;
      state.feedItems = [...state.feedItems, data];
      state.articles[link] = data.articles;
    })
      .then(() => {
        state.loading = false;
        state.input = '';
        state.inputIsValid = false;
      })
      .catch((err) => {
        state.loading = false;
        state.error = err;
      });
  });

  const update = (feedItems) => {
    const promises = feedItems.map(el => axios.get(el.link));
    Promise.all(promises)
      .then((responses) => {
        responses.forEach((el) => {
          const link = el.config.url;
          const updatedData = parse(el.data);
          const updatedArticles = updatedData.articles;

          const currentTitles = state.articles[link].map(art => art.title);
          const newArticles = updatedArticles.filter(art => !currentTitles.includes(art.title));

          if (newArticles.length > 0) {
            const oldArticles = state.articles[link];
            const newList = [...oldArticles, ...newArticles];
            state.articles[link] = newList;
            console.log(`we have updates for ya: ${newArticles.map(e => e.title)}`);
          }
        });
      })
      .then(() => setTimeout(update, 3000, state.feedItems))
      .catch(err => console.log(err));
  };
  update(state.feedItems);

  watch(state, 'error', () => alert(state));
  watch(state, ['input', 'loading'], () => renderForm(state));
  watch(state, 'feedItems', () => renderFeed(state));
  watch(state, 'updates', () => console.log(state.updates));
};
