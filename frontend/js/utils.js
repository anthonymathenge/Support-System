

document.addEventListener("DOMContentLoaded", () => {
  const userInfo = document.getElementById("userInfo");
  if (userInfo) {
    const email = localStorage.getItem("userEmail");
    userInfo.textContent = `Logged in as: ${email}`;
  }
});
