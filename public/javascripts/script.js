document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const suggestionsList = document.getElementById("suggestionsList");
  const suggestionsContainer = document.getElementById("suggestions");

  // Example data for suggestions (replace with actual API call)
  const products = ["imagegenerative", "textgenerative", "Devin", "Gemini", "Deepseek"];

  // Function to show suggestions
  function showSuggestions(filteredProducts) {
    suggestionsList.innerHTML = ""; // Clear previous suggestions
    if (filteredProducts.length > 0) {
      filteredProducts.forEach((product) => {
        const li = document.createElement("li"); 
        li.textContent = product;
        li.className = "px-4 py-2 hover:bg-gray-100 cursor-pointer";
        li.addEventListener("click", () => {
          searchInput.value = product; // Fill input with clicked suggestion
          suggestionsContainer.classList.add("hidden"); // Hide suggestions
        });
        suggestionsList.appendChild(li);
      });
      suggestionsContainer.classList.remove("hidden"); // Show suggestions
    } else {
      suggestionsContainer.classList.add("hidden"); // Hide suggestions if no results
    }
  }

  // Event listener for input changes
  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.toLowerCase().includes(query)
    );
    showSuggestions(filteredProducts);
  });

  // Hide suggestions when clicking outside
  document.addEventListener("click", function (event) {
    if (!event.target.closest("#searchForm")) {
      suggestionsContainer.classList.add("hidden");
    }
  });

  // Handle form submission
  document
    .getElementById("searchForm")
    .addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent default form submission
      const query = searchInput.value.trim();
      if (query) {
        // Perform search (e.g., redirect to search results page)
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
      }
    });
});

document.getElementById("likeBtn").addEventListener("click", function () {
  this.classList.add("like-active");
  setTimeout(() => this.classList.remove("like-active"), 300);
});

document.getElementById("dislikeBtn").addEventListener("click", function () {
  this.classList.add("dislike-active");
  setTimeout(() => this.classList.remove("dislike-active"), 300);
});



document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const suggestionsList = document.getElementById('suggestionsList');
  const suggestionsContainer = document.getElementById('suggestions');

  // Example data for suggestions (replace with actual API call)
  const products = ['ChatGpt', 'Copilot', 'Devin', 'Gemini', 'Deepseek'];

  // Function to show suggestions
  function showSuggestions(filteredProducts) {
      suggestionsList.innerHTML = ''; // Clear previous suggestions
      if (filteredProducts.length > 0) {
          filteredProducts.forEach(product => {
              const li = document.createElement('li');
              li.textContent = product;
              li.className = 'px-4 py-2 hover:bg-gray-100 cursor-pointer';
              li.addEventListener('click', () => {
                  searchInput.value = product; // Fill input with clicked suggestion
                  suggestionsContainer.classList.add('hidden'); // Hide suggestions
              });
              suggestionsList.appendChild(li);
          });
          suggestionsContainer.classList.remove('hidden'); // Show suggestions
      } else {
          suggestionsContainer.classList.add('hidden'); // Hide suggestions if no results
      }
  }

  // Event listener for input changes
  searchInput.addEventListener('input', function () {
      const query = searchInput.value.toLowerCase();
      const filteredProducts = products.filter(product =>
          product.toLowerCase().includes(query)
      );
      showSuggestions(filteredProducts);
  });

  // Hide suggestions when clicking outside
  document.addEventListener('click', function (event) {
      if (!event.target.closest('#searchForm')) {
          suggestionsContainer.classList.add('hidden');
      }
  });

  // Handle form submission
  document.getElementById('searchForm').addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent default form submission
      const query = searchInput.value.trim();
      if (query) {
          // Perform search (e.g., redirect to search results page)
          window.location.href = `/search?q=${encodeURIComponent(query)}`;
      }
  });
});