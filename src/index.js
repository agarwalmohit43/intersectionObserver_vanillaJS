//Intersection Observer -> https://www.youtube.com/watch?v=2IbRtjez6ag
//https://www.youtube.com/watch?v=2IbRtjez6ag

const cards = document.querySelectorAll(".card");
const cardContainer = document.querySelector(".card-container");
const observer = new IntersectionObserver(
  (entries) => {
    console.log(entries);
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      if (entry.isIntersecting) observer.unobserve(entry.target); // once visible stop unmounting
    });
  },
  {
    // root:'card-container', //specifies which div to lazy load, default body
    threshold: 1 // 0 to 100%, 0 means about to enter the screen.
    // rootMargin: "-100px" //defines virtual container viewport
  }
);

cards.forEach((card) => {
  observer.observe(card);
});

//lazy-loading
const lastCardObserver = new IntersectionObserver(
  (entries) => {
    const lastCard = entries[0];
    if (!lastCard.isIntersecting) return;
    loadNewCard();
    lastCardObserver.unobserve(lastCard.target);
    lastCardObserver.observe(document.querySelector(".card:last-child"));
  },
  {
    rootMargin: "100px" // reason, want to make network request before the next card is visible
  }
);

lastCardObserver.observe(document.querySelector(".card:last-child"));

function newCardGenerator() {
  let limit = 100,
    count = 0;

  return function () {
    while (count < limit) {
      for (let i = 0; i < 10; i++) {
        const card = createCard(count);
        observer.observe(card);
        cardContainer.append(card);
        count++;
      }
    }
  };
}

var loadNewCard = newCardGenerator();

function createCard(i) {
  const card = document.createElement("div");
  card.textContent = i === 99 ? "End of cards" : "New card " + i;
  card.classList.add("card");
  return card;
}
