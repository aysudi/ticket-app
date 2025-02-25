export function renderUserProfile(userData) {
  const profileBox = document.querySelector(".user__box");
  profileBox.innerHTML = "";
  profileBox.innerHTML += `
  <form>
            <div class="profile__inputs">
              <div class="form__input">
                <label for="full-name">Full Name</label>
                <input id="full-name" type="text" />
              </div>
              <div class="form__input">
                <label for="username">Username</label>
                <input id="username" type="text" />
              </div>
              <div class="form__input">
                <label for="email">Email</label>
                <input id="email" type="email" />
              </div>
              <div class="form__input">
                <label for="balance">Balance</label>
                <input id="balance" type="number" />
              </div>
              <div class="form__input">
                <label for="current-password">Current Password</label>
                <input
                  id="current-password"
                  type="password"
                  placeholder="Current Password"
                />
              </div>
              <div class="form__input">
                <label for="new-password">New Password</label>
                <input
                  id="new-password"
                  type="password"
                  placeholder="New Password"
                />
              </div>
            </div>
            <button type="submit">Update profile</button>
          </form>
  `;

  if (userData) {
    document.querySelector("#full-name").value = userData.fullName;
    document.querySelector("#username").value = userData.username;
    document.querySelector("#email").value = userData.email;
    document.querySelector("#balance").value = userData.balance;
  }
}
