// backend/controllers/uploadController.js
const xlsx = require("xlsx");
const fs = require("fs");

exports.handleUpload = (req, res) => {
  try {
    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    fs.unlinkSync(filePath); // Optional: delete file after parsing

    res.json({
      message: "✅ File parsed successfully",
      data: jsonData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Error parsing file" });
  }
};
