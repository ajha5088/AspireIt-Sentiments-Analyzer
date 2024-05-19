AspireIt Sentiments Analyzer is a robust backend application designed to analyze sentiments from textual data and handle file uploads securely.
This project utilizes modern web technologies and machine learning techniques to provide accurate sentiment analysis. 
The backend is built using Node.js and Express, with MongoDB as the database. JWT-based authentication is used to secure the API endpoints

<!-- Base Url -->
http://13.233.215.19:3000/

<!-- Api Endpoints -->

1) Register
Request:
Url : auth/v1/register
Method : POST
Request type : raw
{
    "email" : "aditya@gmail.com",
    "password" : "Hello@123",
    "confirmPassword" : "Hello@123"
}
Response:
{
    "success": true,
    "data": {
        "userId": "3a3ae60f-850c-4ac9-be28-6a14b1a70f68",
        "email": "aditya@gmail.com",
        "createdAt": "2024-05-19T08:49:04.788Z",
        "_id": "664a4e199da3674af1bd9309"
    }
}

3) Login
Request:
Url : /auth/v1/login
Method : POST

Request type : raw
{
    "email" : "aditya@gmail.com",
    "password" : "Hello@123"
}

Response:
{
    "success": true,
    "data": {
        "email": "1929070@kiit.ac.in",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NmRkMzBmZS1jY2FjLTQyMDYtYTYxOS00MmU2MGY4NDRmZTgiLCJlbWFpbCI6IjE5MjkwNzBAa2lpdC5hYy5pbiIsImlhdCI6MTcxNjExNjk1MCwiZXhwIjoxNzE2MjAzMzUwfQ.2DyRz4SlQxkQcaHazxhNdoIemiLBYv1lnSz8P_soLG",
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NmRkMzBmZS1jY2FjLTQyMDYtYTYxOS00MmU2MGY4NDRmZTgiLCJ0b2tlblR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzE2MTE2OTUwLCJleHAiOjE3MTY5ODA5NTB9.QA1C7kG2VyTJtat84jBtaC3XffKyNdGaF-W4YvNV3N"
    }
}


3)Analyze Sentiment
Request:
Url : /sentiment/v1/analyze_sentiment
Method : POST
Headers: 
authorization: <access_token>
refresh_token: <refresh_token>
Request type : raw
{
    "text" : "I love you"
}

Response:
{
    "success": true,
    "data": {
        "userId": "46dd30fe-ccac-4206-a619-42e60f844fe8",
        "text": "I love you",
        "sentiment": "Positive",
        "analyzedAt": "2024-05-19T11:16:14.530Z",
        "_id": "6649df7e9da3674af1bd9307",
        "createdAt": "2024-05-19T11:16:14.531Z",
        "__v": 0
    }
}

4)Upload File
Request:
Url : /upload/v1/uploadFile
Method : POST
Headers:
authorization: <access_token>
refresh_token: <refresh_token>
Request type : form-data
key : file
value : any file of type pdf/mp3/mp4

Response:
{
    "success": true,
    "data": {
        "userId": "a103565f-23c3-4f49-8352-a2d9f905b4a4",
        "filename": "test.pdf",
        "contentType": "application/pdf",
        "_id": "66484ac8cce9b6984574ef9b",
        "createdAt": "2024-05-18T06:29:28.755Z",
        "__v": 0
    }
}

<!-- Installation -->

Clone the repository:
git clone https://github.com/ajha5088/AspireIt-Sentiments-Analyzer.git

Navigate to the repository
cd AspireIt-Sentiments-Analyzer

Install the dependecies
npm install


<!-- Usage -->

Start the server:
npm start

<!-- Environment Variables -->
PORT=3000
DB_URL=<your_mongodb_connection_string>
SECRET_KEY=<your_jwt_secret_key>
REFRESH_TOKEN_SECRET=<your_refresh_token_secret_key>
ALLOWED_ORIGIN=<allowed_origin>
ALLOWED_METHODS=GET,POST,PUT,DELETE
ALLOWED_HEADERS=Content-Type,Authorization
ALLOWED_CREDENTIALS=true
