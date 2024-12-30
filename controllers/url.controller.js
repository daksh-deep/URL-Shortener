const shortid = require('shortid');
const urls = require("../models/url.model"); 
const logger = require('../support_functions/logger');

const handleCreateShortURL = async (req, res) => {
    try {
        logger(`Received ${req.method} request to create a short URL`, "INFO");

        const url = req.body.url;
        if (!url) {
            logger("Validation Error: URL is missing in the request body", "ERROR");
            return res.status(400).json({ message: "URL cannot be empty" });
        }

        const shortId = shortid.generate();
        await urls.create({
            shortid: shortId, 
            originalUrl: url, 
        });

        logger(`Successfully created short URL: ${shortId} for original URL: ${url}`, "INFO");

        res.status(201).json({
            message: "Short URL created successfully",
            shortid: shortId,
            originalUrl: url,
            shortUrl: `http://localhost:${process.env.PORT}/url/${shortId}`,
        });

    } catch (error) {
        logger(`Error occurred while creating short URL: ${error.message}`, "ERROR");
        res.status(500).json({ message: "Internal server error" });
    }
};

const handleShortURL = async (req, res) => {
    try {
        logger(`Received ${req.method} request to resolve short URL`, "INFO");

        const shortIdParam = req.params.shortid;
        if (!shortIdParam) {
            logger("Validation Error: ShortID is missing from the request parameters", "ERROR");
            return res.status(400).json({ message: "ShortID cannot be empty" });
        }

        logger(`Looking up original URL for ShortID: ${shortIdParam}`, "INFO");

        const url = await urls.findOne({ shortid: shortIdParam }); 
        if (!url) {
            logger(`ShortID not found: ${shortIdParam}`, "ERROR");
            return res.status(404).json({ message: "ShortID not found" });
        }

        await urls.updateOne({ shortid: shortIdParam }, {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        });

        logger(`Redirecting to original URL: ${url.originalUrl} for ShortID: ${shortIdParam}`, "INFO"); 

        return res.redirect(301, url.originalUrl);
    } catch (error) {
        logger(`Error occurred while resolving short URL: ${error.message}`, "ERROR");
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { handleCreateShortURL, handleShortURL };
