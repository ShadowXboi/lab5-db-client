document.addEventListener('DOMContentLoaded', function() {
    const insertBtn = document.getElementById('insertData');
    const submitBtn = document.getElementById('submitQuery');
    const responseDiv = document.getElementById('response');
    
    // Predefined patient data to be inserted
    const insertDataSql = `INSERT INTO patient (name, age, address) VALUES ('John Doe', 30, '123 Main St'), ('Jane Doe', 28, '456 Elm St');`;

    // Insert data event listener
    insertBtn.addEventListener('click', function() {
        postData('/api/v1/sql', insertDataSql);
    });

    // Submit query event listener
    submitBtn.addEventListener('click', function() {
        const query = document.getElementById('sqlQuery').value.trim();
        if (query.toUpperCase().startsWith('SELECT')) {
            fetchData('/api/v1/sql', query);
        } else if (query.toUpperCase().startsWith('INSERT')) {
            postData('/api/v1/sql', query);
        } else {
            alert('Only SELECT and INSERT statements are allowed.');
        }
    });

    async function postData(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({query: data}),
            });
            const json = await response.json();
            responseDiv.innerHTML = `Response: ${JSON.stringify(json)}`;
        } catch (error) {
            console.error('Error:', error);
            responseDiv.innerHTML = `Error: ${error.toString()}`;
        }
    }

    async function fetchData(url, query) {
        try {
            const response = await fetch(`${url}?query=${encodeURIComponent(query)}`, {
                method: 'GET',
            });
            const json = await response.json();
            responseDiv.innerHTML = `Response: ${JSON.stringify(json)}`;
        } catch (error) {
            console.error('Error:', error);
            responseDiv.innerHTML = `Error: ${error.toString()}`;
        }
    }
});
