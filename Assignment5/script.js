document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("pizzaForm");
    const usCheckbox = document.getElementById("usCheckbox");
    const zipcodeField = document.getElementById("zipcodeField");
    const successMessage = document.getElementById("successMessage");

    usCheckbox.addEventListener("change", () => {
        zipcodeField.style.display = usCheckbox.checked ? "block" : "none";
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent default form submission
        let valid = true;

        // Name validation
        const name = form.name;
        const nameError = document.getElementById("nameError");
        const namePattern = /^[A-Za-z\s]+$/; // Pattern allowing only letters and spaces
        if (name.value.trim().length < 3) {
            nameError.textContent = "Name must be at least 3 characters.";
            valid = false;
        } else if (!namePattern.test(name.value)) {
            nameError.textContent = "Name must contain only letters and spaces.";
            valid = false;
        } else {
            nameError.textContent = "";
}


        // Year of birth validation
        const birthYear = form.birthYear;
        const birthYearError = document.getElementById("birthYearError");
        const currentYear = new Date().getFullYear();
        if (birthYear.value < 1901 || birthYear.value > 2023) {
            birthYearError.textContent = `Year of birth must be between 1901 and 2023.`;
            valid = false;
        } else {
            birthYearError.textContent = "";
        }
// Zipcode validation
        const zipcode = form.zipcode;
        const zipcodeError = document.getElementById("zipcodeError");
        if (usCheckbox.checked) {
            if (!/^\d{5}$/.test(zipcode.value)) {
                zipcodeError.textContent = "Please enter a valid 5-digit ZIP code.";
                valid = false;
        } else if (zipcode.value === "00000") {
            zipcodeError.textContent = "ZIP code cannot be all zeros.";
            valid = false;
        } else {
            zipcodeError.textContent = ""; // Clear error if ZIP code is valid
        }
        } else {
            zipcodeError.textContent = ""; // Clear error if the ZIP field is not required
}


        // Password validation
        const password = form.password;
        const passwordError = document.getElementById("passwordError");
        if (password.value.length < 8) {
            passwordError.textContent = "Password must be at least 8 characters.";
            valid = false;
        } else {
            passwordError.textContent = "";
        }

        // Pizza type validation
        const pizzaTypeError = document.getElementById("pizzaTypeError");
        const pizzaTypeChecked = Array.from(form.pizzaType).some(input => input.checked);
        if (!pizzaTypeChecked) {
            pizzaTypeError.textContent = "Please select a preferred type of pizza.";
            valid = false;
        } else {
            pizzaTypeError.textContent = "";
        }

        if (valid) {
            successMessage.style.display = "block";
            successMessage.textContent = "Accepted";
        } else {
            successMessage.style.display = "none";
        }
    });
});
