// Fetch data using .then
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); 
    renderTable(data);
    window.cryptoData = data;
  })
  .catch(error => console.error('Error fetching data:', error));

function renderTable(data) {
  const tbody = document.querySelector('#cryptoTable tbody');
  tbody.innerHTML = '';
  data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td> <img src="${item.image}" width="30px" height="20px" /> ${item.name}</td>
      <td>${item.id}</td>
      <td>${item.current_price}</td>
      <td>${item.total_volume}</td>
      <td>${item.price_change_percentage_24h}%</td>
      <td>${item.market_cap}</td>
    `;
    tbody.appendChild(row);
  });
}

function searchData() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const filteredData = window.cryptoData.filter(item =>
    item.name.toLowerCase().includes(searchTerm) || item.symbol.toLowerCase().includes(searchTerm)
  );
  renderTable(filteredData);
}

function sortByMarketCap() {
  if (!window.cryptoData) return;
  const sortedData = window.cryptoData.sort((a, b) => b.market_cap - a.market_cap);
  renderTable(sortedData);
}

function sortByPercentageChange() {
  if (!window.cryptoData) return;
  const sortedData = window.cryptoData.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  renderTable(sortedData);
}