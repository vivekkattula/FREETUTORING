// Toggle dropdown on profile click
document.addEventListener("DOMContentLoaded", () => {
  const profileDropdown = document.querySelector(".profile-dropdown");
  const profilePic = document.getElementById("profile-pic");

  profilePic.addEventListener("click", () => {
    profileDropdown.classList.toggle("show");
  });

  // Close dropdown when clicking outside
  window.addEventListener("click", (e) => {
    if (!profileDropdown.contains(e.target)) {
      profileDropdown.classList.remove("show");
    }
  });

  // Logout functionality
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      alert("Logged out!");
      window.location.href = "login.html";
    });
  }
});
