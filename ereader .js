// Parse URL param
const params = new URLSearchParams(window.location.search);
const bookUrl = params.get("bookUrl");

if (!bookUrl) {
  alert("Missing bookUrl in URL parameters");
} else {
  // Load and render book
  const book = ePub(bookUrl);
  const rendition = book.renderTo("viewer", {
    width: "100%",
    height: "100%",
  });

  rendition.display();

  // Optional: Log navigation events
  rendition.on("relocated", (location) => {
    console.log("Relocated to", location);
  });

  // Swipe gesture support
  let startX = 0;
  document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  document.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;
    if (deltaX > 50) {
      rendition.prev();
    } else if (deltaX < -50) {
      rendition.next();
    }
  });
}
