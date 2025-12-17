const http = require('http');
const url = require('url')

const port = 3001;


const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true)



  if (pathname === '/' && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('This is a the home page server\n');
  } else
    if (pathname === '/blog' && req.method === "GET") {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('This is the blog page server\n');
    } else
      if (pathname === '/products' && req.method === "GET") {
        if (!query.id) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('This is the products page server\n');
        } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`This is the product with product ID ` + query.id)
      }
      }
      
});

server.listen(port, () => {
  console.log(`Server running on ${port}...`);
});



// const http = require("http");

// const server = http.createServer((req, res) => {
//     if (req.url === "/" && req.method === "GET") {
//         res.writeHead(200, { "Content-Type": "text/plain" });
//         res.end("This is Samuel Asante, a web developer and this is my first Node.js server");
//     } else if (req.url === "/about" && req.method === "GET") {
//         res.writeHead(200, { "Content-Type": "text/plain" });
//         res.end("About Page");
//     } else if (req.url === "/blog" && req.method === "GET") {
//         res.writeHead(200, { "Content-Type": "text/plain" });
//         res.end("Blog Page");
//     }
//     else if (req.url === "/contact" && req.method === "GET") {
//         res.writeHead(200, { "Content-Type": "text/plain" });
//         res.end("Contact Page");
//     } else if (req.url === "/donate" && req.method === "GET") {
//         res.writeHead(200, { "Content-Type": "text/plain" });
//         res.end("Donation Page");
//     }
//     else {
//         res.writeHead(404, { "Content-Type": "text/plain" });
//         res.end("Page Not Found");
//     }

// });

// //query and URL parameters
// //Express JS framework

// server.listen(3000, () => console.log("Server running on port 3000"));





// const http = require('http');

// const PORT = 3000;

// function matchRoute(pathname, pattern) {
//   const pathParts = pathname.split('/').filter(Boolean);   // ['users', '123']
//   const patternParts = pattern.split('/').filter(Boolean); // ['users', ':id']

//   if (pathParts.length !== patternParts.length) return null;

//   const params = {};
//   for (let i = 0; i < patternParts.length; i++) {
//     const p = patternParts[i];
//     const part = pathParts[i];
//     if (p.startsWith(':')) {
//       const name = p.slice(1);
//       params[name] = decodeURIComponent(part);
//     } else if (p !== part) {
//       return null; // not a match
//     }
//   }
//   return params;
// }

// const server = http.createServer((req, res) => {
//   // Use the WHATWG URL API to parse the request URL (works well in Node).
//   // We need a base; use the Host header from the request (fallback to localhost).
//   const host = req.headers.host || `localhost:${PORT}`;
//   const fullUrl = new URL(req.url, `http://${host}`);

//   const pathname = fullUrl.pathname;        // e.g. "/users/123"
//   const searchParams = fullUrl.searchParams; // URLSearchParams for query params

//   // --- Example: simple static routes like your original code ---
//   if (pathname === '/' && req.method === 'GET') {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     return res.end('This is Samuel Asante, a web developer and this is my first Node.js server');
//   }

//   if (pathname === '/about' && req.method === 'GET') {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     return res.end('About Page');
//   }

//   if (pathname === '/blog' && req.method === 'GET') {
//     // Example query params: /blog?page=2&tag=node
//     const page = searchParams.get('page') || '1';
//     const tag = searchParams.get('tag') || 'all';
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     return res.end(JSON.stringify({
//       page,
//       tag,
//       message: 'Blog Page - showing posts filtered by query params'
//     }));
//   }

//   if (pathname === '/contact' && req.method === 'GET') {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     return res.end('Contact Page');
//   }

//   if (pathname === '/donate' && req.method === 'GET') {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     return res.end('Donation Page');
//   }

//   // --- Example: dynamic URL param route: /users/:id ---
//   // Try to match the pattern and extract params
//   const userParams = matchRoute(pathname, '/users/:id');
//   if (userParams && req.method === 'GET') {
//     const userId = userParams.id; // extracted from URL
//     // You might normally fetch this user's data from a DB; here we return a mock
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     return res.end(JSON.stringify({
//       userId,
//       name: `User ${userId}`,
//       message: 'User profile (example)'
//     }));
//   }

//   // --- Example: nested dynamic route: /users/:id/orders?limit=5 ---
//   const userOrdersParams = matchRoute(pathname, '/users/:id/orders');
//   if (userOrdersParams && req.method === 'GET') {
//     const userId = userOrdersParams.id;
//     const limit = searchParams.get('limit') || '10';
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     return res.end(JSON.stringify({
//       userId,
//       limit,
//       orders: [], // imagine real order data here
//       message: 'List of user orders (mock)'
//     }));
//   }

//   // If no route matched:
//   res.writeHead(404, { 'Content-Type': 'text/plain' });
//   res.end('Page Not Found');
// });

// server.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
