document.addEventListener('DOMContentLoaded', function() {
    const insertBtn = document.getElementById('insertData');
    const submitBtn = document.getElementById('submitQuery');
    const responseDiv = document.getElementById('response');
    
    // The local network IP address and port where your Server2 is running
    const server2Url = 'http://192.168.1.100:3000/api/v1/sql';

    // Predefined patient data to be inserted
    const insertDataSql = `INSERT INTO patient (name, age, address) VALUES ('John Doe', 30, '123 Main St'), ('Jane Doe', 28, '456 Elm St');`;

    // Insert data event listener
    insertBtn.addEventListener('click', function() {
        postData(server2Url, insertDataSql);
    });

    // Submit query event listener
    submitBtn.addEventListener('click', function() {
        const query = document.getElementById('sqlQuery').value.trim();
        if (query.toUpperCase().startsWith('SELECT')) {
            fetchData(server2Url, query);
        } else if (query.toUpperCase().startsWith('INSERT')) {
            postData(server2Url, query);
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
            if (response.ok && response.headers.get('Content-Type').includes('application/json')) {
                const json = await response.json();
                responseDiv.innerHTML = `Response: ${JSON.stringify(json)}`;
            } else {
                responseDiv.innerHTML = `Server responded with status: ${response.status}`;
            }
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
            if (response.ok && response.headers.get('Content-Type').includes('application/json')) {
                const json = await response.json();
                responseDiv.innerHTML = `Response: ${JSON.stringify(json)}`;
            } else {
                responseDiv.innerHTML = `Server responded with status: ${response.status}`;
            }
        } catch (error) {
            console.error('Error:', error);
            responseDiv.innerHTML = `Error: ${error.toString()}`;
        }
    }
});

