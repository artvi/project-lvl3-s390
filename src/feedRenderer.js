export default (state) => {
  const { feedFlow } = state;
  const id = feedFlow.length - 1;
  const data = feedFlow[id];

  const {
    channelTitle, channelDescription, articles,
  } = data;

  const channelPlate = `
      <div class="ml-3">
        <h2 class="ml-3">${channelTitle}</h2>
        <p class="ml-3">${channelDescription}</p>
      </div>
      <div class="ml-3">
        <ul id="${id}" class="list-group col-4"></ul>
      </div>
    `;
  const container = document.createElement('div');
  container.classList.add('p-4');
  document.body.appendChild(container);
  container.innerHTML = channelPlate;


  const articleList = document.getElementById(`${id}`);

  articles.forEach((art) => {
    const newListItem = document.createElement('li');
    newListItem.classList.add('list-group-item');
    newListItem.innerHTML = `<a href="${art.link}" class="text-secondary">${art.title}</a>`;
    articleList.appendChild(newListItem);
  });

  container.appendChild(articleList);
};
