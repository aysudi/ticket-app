document.addEventListener("DOMContentLoaded", async () => {
  const header = document.querySelector(".header__right");
  const userID = JSON.parse(localStorage.getItem("userID"));
  if (userID) {
    if (userID[0].role == "admin") {
      header.innerHTML = "";
      header.innerHTML += `
        <div class="header__profile">
          <div class="header__icon--profile icon">
            <i class="fa-regular fa-user"></i>
          </div>
          <ul class="header__dropdown">
            <li><a href="./admin-events.html">Events</a></li>
            <li><a href="./admin-users.html">Users</a></li>
            <li><a href="./admin-tickets.html">Tickets</a></li>
            <li><a href="./admin.html">Profile</a></li>
            <li class="log-out"><a href="./signIn.html">Log Out</a></li>
          </ul>
        </div>
    `;
    } else {
      header.innerHTML = "";
      header.innerHTML += `
    <div class="header__icons icon">
          <a href="./basket.html"><i class="fa-solid fa-cart-shopping"></i></a>
          <a href="./favorites.html"><i class="fa-regular fa-heart"></i></a>
        </div>
        <div class="header__profile">
          <div class="header__icon--profile icon">
            <i class="fa-regular fa-user"></i>
          </div>
          <ul class="header__dropdown">
            <li><a href="./index.html">Home</a></li>
            <li class="log-out"><a href="./signIn.html">Log Out</a></li>
            <li><a href="./user.html">Profile</a></li>
            <li><a href="./events.html">Events</a></li>
          </ul>
        </div>
    `;
    }

    const logOut = document.querySelector(".log-out");
    logOut.addEventListener("click", () => {
      header.innerHTML = "";
      header.innerHTML += `
      <div class="header__icons icon">
          <a href="./basket.html"><i class="fa-solid fa-cart-shopping"></i></a>
          <a href="./favorites.html"><i class="fa-regular fa-heart"></i></a>
        </div>
        <div class="header__profile">
          <div class="header__icon--profile icon">
            <i class="fa-regular fa-user"></i>
          </div>
          <ul class="header__dropdown">
            <li><a href="./index.html">Home</a></li>
            <li><a href="./signIn.html">Log In</a></li>
            <li><a href="./signUp.html">Sign Up</a></li>
            <li><a href="./events.html">Events</a></li>
          </ul>
        </div>
    `;
      localStorage.clear("userID");
    });
  }
});
