const createContactForm = async (form) => {
  try {
    let response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const result = await response.json();
    return result.status; 
  } catch (err) {
    console.log(err);
    return false;
  }
};

export { createContactForm };
