const model = require('./../models/courseModel')
const multer = require('multer');
const {google} = require('googleapis');
const fs = require('fs');
const path = require('path');

// today's date
const todayDate = new Date().toLocaleDateString();

// mongoose model 
const File = model.File;

// google drive service account setup
const auth = new google.auth.GoogleAuth({
    keyFile: './controllers/credentials.json', 
    scopes: ['https://www.googleapis.com/auth/drive'],
})

const drive = google.drive({version: 'v3', auth});

// Function to upload to Google Drive
async function uploadFile(filePath, courseId) {
    const fileMetadata = {
      name: path.basename(filePath),
      parents: [process.env.FOLDER_ID],
    };
  
    const media = {
      mimeType: 'application/octet-stream',
      body: fs.createReadStream(filePath),
    };
  
    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    });
  
    // Share the file with view-only permission
    await drive.permissions.create({
      fileId: file.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });
  
    return file.data;
}
  
// Route for admin to upload files
exports.upload =  async (req, res) => {
    // const { courseId } = req.body; // Assuming courseId is sent in the request body
    const courseNumber = req.body.courseNumber;
    console.log(req.body);
    try {
      const fileLinks = [];
  
      for (const file of req.files) {
        const fileData = await uploadFile(file.path, courseNumber);
        console.log(file);
        console.log(fileData.webViewLink);
        fileLinks.push({fileName: file.originalname, link: fileData.webViewLink, date: todayDate});
      }
      
      const file = await File.findOne({"courseNumber": courseNumber});
      if(file){
        for(const item of fileLinks){
          file.files.push(item);
        }
        await file.save();
      }else{
        const newFile = new File({ courseNumber, files: fileLinks });
        await newFile.save();
      }



      res.status(200).json({ message: 'Files uploaded successfully', links: fileLinks });
      console.log("uploaded files");
    } catch (error) {
      console.error('Error uploading files: ', error);
      res.status(500).json({ message: 'Error uploading files', error: error.message });
    } finally {
      req.files.forEach((file) => fs.unlinkSync(file.path));
    }
  };

