

const apiUrl = "http://localhost:8080/api/auth";

const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(registerForm);
    const userData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const res = await fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const msgEl = document.getElementById("registerMsg");
    if (res.ok) {
      msgEl.textContent = "Registration successful! Please login.";
      registerForm.reset();
    } else {
      const error = await res.text();
      msgEl.textContent = `Error: ${error}`;
    }
  });
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const res = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const msgEl = document.getElementById("loginMsg");
    if (res.ok) {
      const userEmail = loginData.email;
      localStorage.setItem("userEmail", userEmail);
      window.location.href = "dashboard.html";
    } else {
      const error = await res.text();
      msgEl.textContent = `Login failed: ${error}`;
    }
  });
}
