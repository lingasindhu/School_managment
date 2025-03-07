// Add school form submission
document.getElementById('school-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    
    try {
        const response = await fetch('/api/addSchool', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                address,
                latitude,
                longitude
            })
        });
        
        const data = await response.json();
        
        const messageDiv = document.getElementById('add-message');
        
        if (response.ok) {
            messageDiv.className = 'message success';
            messageDiv.textContent = data.message;
            // Reset form
            document.getElementById('school-form').reset();
        } else {
            messageDiv.className = 'message error';
            messageDiv.textContent = data.error || 'An error occurred';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('add-message').className = 'message error';
        document.getElementById('add-message').textContent = 'Failed to connect to server';
    }
});