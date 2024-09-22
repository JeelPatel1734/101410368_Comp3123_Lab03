const http = require("http");
const employeeModule = require('./Employee');  // Import Employee Module
console.log("Lab 03 - NodeJs");

// Define Server Port
const port = process.env.PORT || 8081;

// Create Web Server using CORE API
const server = http.createServer((req, res) => {
    // Set response content type as JSON for all responses
    res.setHeader('Content-Type', 'application/json');
    
    if (req.method !== 'GET') {
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`);
    } else {
        if (req.url === '/') {
            // Display message "<h1>Welcome to Lab Exercise 03</h1>"
            res.setHeader('Content-Type', 'text/html');
            res.end("<h1>Welcome to Lab Exercise 03</h1>");
        } else if (req.url === '/employee') {
            // Display all details for employees in JSON format
            res.end(JSON.stringify(employeeModule.getAllEmployees()));
        } else if (req.url === '/employee/names') {
            // Display only all employees {first name + lastname} in Ascending order in JSON Array
            res.end(JSON.stringify(employeeModule.getEmployeeNames()));
        } else if (req.url === '/employee/totalsalary') {
            // Display Sum of all employees' salary in JSON format
            res.end(JSON.stringify({ "total_salary": employeeModule.getTotalSalary() }));
        } else {
            // For any other URL, return 404
            res.end(`{"error": "${http.STATUS_CODES[404]}"}`);
        }
    }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
