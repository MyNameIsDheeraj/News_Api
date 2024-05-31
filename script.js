const apiKey = "e558bb722e875ef5a630fd70600e5248";
const url = "https://gnews.io/api/v4/search?q=";

const searchBtn = document.getElementById("searchForm");
const searchBtnMobile = document.getElementById("searchFormMobile");
const searchInputMobile = document.getElementById("searchInputMobile");
const searchInput = document.getElementById("searchInput");
const errorMsg = document.querySelector(".error");

// Fetch data from API
async function fetchData(query) {
    try {
        const res = await fetch(`${url}${query}&apikey=${apiKey}`);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        console.log(data);
        errorMsg.style.display = "none"; // Hide error message on successful fetch
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        errorMsg.style.display = "block";
        return null; // Return null if an error occurs
    }
}

// Initial fetch to display today's news
fetchData("today").then(data => {
    if (data) {
        renderMain(data.articles);
    }
});

// Toggle mobile menu
let mobileMenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menuBtn");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

// Render news articles to the main section
function renderMain(articles) {
    let mainHtml = '';

    articles.forEach((item) => {
        if (item.image) {
            mainHtml += 
                `<div class="card">
                    <a href="${item.url}" target="_blank" rel="noopener noreferrer">
                        <img src="${item.image}" alt="">
                        <h4>${item.title}</h4>
                        <div class="publishbyDate">
                            <p>${item.source.name}</p>
                            <span>•</span>
                            <p>${new Date(item.publishedAt).toLocaleDateString()}</p>
                        </div>
                        <div class="desc">
                            ${item.description}
                        </div>
                    </a>
                </div>`;
        }
    });

    document.querySelector("main").innerHTML = mainHtml;
}

// Event listener for desktop search
searchBtn.addEventListener("submit", async (e) => { // Changed from "click" to "submit"
    e.preventDefault();
    const query = searchInput.value.trim() || "latest";
    const data = await fetchData(query);
    if (data) {
        renderMain(data.articles);
    }
});

// Event listener for mobile search
searchBtnMobile.addEventListener("submit", async (e) => { // Changed from "click" to "submit"
    e.preventDefault();
    const query = searchInputMobile.value.trim() || "latest";
    const data = await fetchData(query);
    if (data) {
        renderMain(data.articles);
    }
});

// Search function for external use
async function Search(query) {
    console.log(query);
    const data = await fetchData(query);
    if (data) {
        renderMain(data.articles);
    }
}
