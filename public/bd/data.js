
const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content;
const apiUrl = '/mesas';
var fragment = document.createDocumentFragment()
const fetchData = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = response.json();
    return data
  } catch (error) {
    console.log(error);
  }
};

fetchData().then(data => {

  // Pintar las tarjetas de convidados
  cards.innerHTML = '';
  data.forEach(item => {
    templateCard.querySelector('h5').textContent = item.garcom;
    templateCard.querySelector('h4').textContent = item.nMesa;
    const clone = document.importNode(templateCard, true);
    cards.appendChild(clone);
  });
  cards.appendChild(fragment)

});




