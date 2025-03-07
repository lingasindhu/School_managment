// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Hide the results table initially
    const schoolsList = document.getElementById('schools-list');
    schoolsList.style.display = 'none';
});

// Get current geolocation
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                document.getElementById('user-latitude').value = position.coords.latitude;
                document.getElementById('user-longitude').value = position.coords.longitude;
            },
            (error) => {
                alert('Error getting location: ' + error.message);
            }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Fetch schools based on user location
async function fetchSchools() {
    const latitude = document.getElementById('user-latitude').value;
    const longitude = document.getElementById('user-longitude').value;
    
    if (!latitude || !longitude) {
        alert('Please enter your latitude and longitude');
        return;
    }
    
    try {
        const response = await fetch(`/api/listSchools?latitude=${latitude}&longitude=${longitude}`);
        const data = await response.json();
        
        const tableBody = document.getElementById('schools-data');
        tableBody.innerHTML = '';
        
        // Show the results table
        const schoolsList = document.getElementById('schools-list');
        schoolsList.style.display = 'block';
        
        if (data.error) {
            alert(data.error);
            return;
        }
        
        const schools = data.schools || [];
        
        if (schools.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="3">No schools found</td></tr>';
            return;
        }
        
        schools.forEach(school => {
            const row = document.createElement('tr');
            
            const nameCell = document.createElement('td');
            nameCell.textContent = school.name;
            
            const addressCell = document.createElement('td');
            addressCell.textContent = school.address;
            
            const distanceCell = document.createElement('td');
            distanceCell.textContent = school.distance.toFixed(2) + ' km';
            
            row.appendChild(nameCell);
            row.appendChild(addressCell);
            row.appendChild(distanceCell);
            
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch schools');
    }
}