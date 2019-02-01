export default (xml) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');
  const channelTitle = doc.querySelector('title').textContent;
  const channelLink = doc.querySelector('link').textContent;
  const channelDescription = doc.querySelector('description').textContent;

  const items = [...doc.querySelectorAll('item')];
  const articles = items.map((el) => {
    const title = el.querySelector('title').textContent;
    const link = el.querySelector('link').textContent;
    const description = el.querySelector('description').textContent;
    return {
      title, link, description,
    };
  });

  return {
    channelTitle, channelLink, channelDescription, articles,
  };
};
