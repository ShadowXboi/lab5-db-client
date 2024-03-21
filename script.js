document.addEventListener('DOMContentLoaded', function() {
    const insertBtn = document.getElementById('insertData');
    const submitBtn = document.getElementById('submitQuery');
    const responseDiv = document.getElementById('response');
    
   
    const server2Url = 'https://monkfish-app-69t24.ondigitalocean.app/api/v1/sql';
    

    // predefined patient data to be inserted
    const insertDataSql = `INSERT INTO patient (name, dateOfBirth) VALUES ('Sara Brown', '1901-01-01'),('John Smith', '1941-01-01'),('Jack Ma', '1961-01-01'), ('Elon Musk', '1999-01-01');`;

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

