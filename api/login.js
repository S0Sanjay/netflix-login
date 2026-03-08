const handleSubmit = async (e) => {
  e.preventDefault();
  setApiError("");
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  setLoading(true);

  try {
    const users = JSON.parse(localStorage.getItem("netflix_users") || "[]");
    const exists = users.find(
      (u) => u.email.toLowerCase() === formData.email.toLowerCase(),
    );
    if (exists) {
      setApiError("An account with this email already exists.");
    } else {
      users.push({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("netflix_users", JSON.stringify(users));
      navigate("/login");
    }
  } finally {
    setLoading(false);
  }
};
