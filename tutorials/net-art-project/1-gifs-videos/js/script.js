const dropdown1 = document.getElementById("dropdown1");

dropdown1.addEventListener("change", function() {
  const value = this.value;

  if (value) {
    // Redirect to the corresponding page (morning.html, day.html, or night.html)
    window.location.href = `${value}.html`;
  }
});


gif.addEventListener('click', function() {
    text.classList.toggle('show');
});

