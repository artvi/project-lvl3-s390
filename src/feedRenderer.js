export default (state) => {
  const { feedItems } = state;
  const id = feedItems.length - 1;
  const data = feedItems[id];

  const {
    channelTitle, channelDescription, articles,
  } = data;

  const channelPlate = `
      <div class="ml-3">
        <h2 class="ml-3">${channelTitle}</h2>
        <p class="ml-3">${channelDescription}</p>
      </div>
      <div class="ml-5">
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
    newListItem.innerHTML =
      `<a href="${art.link}" class="text-secondary">${art.title}</a></br>
       <button type="button" class="btn btn-outline-secondary btn-sm mt-2" data-toggle="modal" data-target="#exampleModalCenter">Description</button>
       `;
    const [button] = newListItem.getElementsByTagName('button');
    button.addEventListener('click', () => {
      const newContent = art.description;
      const modalBody = document.getElementById('description');
      modalBody.innerHTML = newContent;
    });
    articleList.appendChild(newListItem);
  });

  container.appendChild(articleList);
};
