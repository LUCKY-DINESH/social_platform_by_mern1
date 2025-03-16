import DataUriParser from "datauri/parser.js";  // Fixed typo in DataUriParser
import path from "path";

const getDataUrl = (file) => {
    const parser = new DataUriParser();

    // Corrected the method to `extname` (lowercase 'n')
    const extName = path.extname(file.originalname).toString();  
    return parser.format(extName, file.buffer);
};

export default getDataUrl;
