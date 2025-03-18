document.getElementById('ageForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the user's input (Date of Birth)
    const dobInput = document.getElementById('dob').value;

    if (dobInput) {
        // Convert the date to a Date object
        const dob = new Date(dobInput);
        const today = new Date();

        // Calculate age
        let age = today.getFullYear() - dob.getFullYear();
        const monthDifference = today.getMonth() - dob.getMonth();
        
        // Check if the birthday has already occurred this year
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        // Display the result
        document.getElementById('result').innerText = `You are ${age} years old.`;
    } else {
        // If no date is selected, alert the user
        document.getElementById('result').innerText = document.getElementById('ageForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting
        
            // Get the user's input (Date of Birth)
            const dobInput = document.getElementById('dob').value;
        
            if (dobInput) {
                // Convert the date to a Date object
                const dob = new Date(dobInput);
                const today = new Date();
        
                // Calculate age
                let age = today.getFullYear() - dob.getFullYear();
                const monthDifference = today.getMonth() - dob.getMonth();
                
                // Check if the birthday has already occurred this year
                if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
                    age--;
                }
        
                // Display the result
                document.getElementById('result').innerText = `You are ${age} years old.`;
            } else {
                // If no date is selected, alert the user
                document.getElementById('result').innerText = "Please select your date of birth.";
            }
        });
        
    }
});
