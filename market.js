const apiKey = 'ff2a57e234784039b70702b3584c2f97';
const baseUrl = 'https://newsapi.org/v2/top-headlines';

const categories = {
  financial: 'category=business',
  business: 'category=business',
  stock: 'q=stock market',
  gold: 'q=gold'
};

async function fetchNews(category, elementId) {
  try {
    const response = await fetch(`${baseUrl}?${categories[category]}&apiKey=${apiKey}`);
    const data = await response.json();
    displayNews(data.articles, elementId);
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}

function displayNews(articles, elementId) {
  const newsContainer = document.getElementById(elementId);
  newsContainer.innerHTML = '';
  articles.forEach(article => {
    const newsCard = document.createElement('div');
    newsCard.className = 'news-card';
    newsCard.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.description || ''}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    newsContainer.appendChild(newsCard);
  });
}

fetchNews('financial', 'financial-news-items');
fetchNews('business', 'business-news-items');
fetchNews('stock', 'stock-news-items');
fetchNews('gold', 'gold-market-news-items');
