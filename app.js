var express = require('express');
var app = express();
const fs = require("fs");
var bodyParser = require('body-parser');
var cors = require('cors');
var formidable = require('formidable');
var path = require('path');     //used for file path
//var fsextra = require('fs-extra');       //File System - for file manipulation

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

const corsOptions = {
  origin: '*',
  methods: [
    'GET',
    'POST',
  ],
  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOptions));

app.get('/', function (req, res) {
  //res.send('Hello World!');
  res.sendFile(__dirname + "/index.html");  
});

app.get('/renderFile', function (req, res){
	fs.readFile('./public/serveFiles/Get_Started_With_Smallpdf.pdf', (err, data) => {
		res.contentType("application/pdf");
		res.send(data);
		
		//res.writeHead(200, {'Content-Type': 'application/pdf'});		
		//res.write(data);
		//res.sendFile(__dirname + "/public/serveFiles/Get_Started_With_Smallpdf.pdf");
		//return res.end();
	});
	
	/*
	var data = fs.readFileSync('./public/serveFiles/Get_Started_With_Smallpdf.pdf');
	res.contentType("application/pdf");
	res.write(data);
	*/
});

app.route('/upload').post(function (req, res, next) {
  var form = new formidable.IncomingForm();
    //Formidable uploads to operating systems tmp dir by default
    form.uploadDir = "./uploads";       //set upload directory
    form.keepExtensions = true;     //keep file extension

    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'application/pdf'});
        res.write('received upload:\n\n');
		
		console.log("received upload: ", files);
        console.log("received upload details: ", files.fileUploaded);
        //TESTING
        //console.log("file size: "+JSON.stringify(files.fileUploaded.size));
        //console.log("file path: "+JSON.stringify(files.fileUploaded.path));
        //console.log("file name: "+JSON.stringify(files.fileUploaded.name));
        //console.log("file type: "+JSON.stringify(files.fileUploaded.type));
        //console.log("astModifiedDate: "+JSON.stringify(files.fileUploaded.lastModifiedDate));

        //Formidable changes the name of the uploaded file
        //Rename the file to its original name
        //fs.rename(files.fileUploaded.path, './img/'+files.fileUploaded.name, function(err) {
        //if (err)
          //  throw err;
          //console.log('renamed complete');  
        //});
          res.end();
    });
});

app.listen(3300, function () {
  console.log('Server app listening on port 3300!');
});


//Useful links
//https://medium.com/@adnanrahic/hello-world-app-with-node-js-and-express-c1eb7cfa8a30
//https://stackoverflow.com/questions/23691194/node-express-file-upload
//https://betterprogramming.pub/creating-a-simple-app-with-react-js-f6aa88998952
//https://www.pluralsight.com/guides/uploading-files-with-reactjs

//To create PDFs using React, use @react-pdf/renderer.