import express from 'express';
import {createShortUrl, getUrls, getUrlsStats, updateUrl, deleteUrl} from '../controllers/urlController.js';

const router = express.Router();
router.post('/shorten', createShortUrl);
router.get('/shorten/:shortCode', getUrls);
router.get('/shorten/:shortCode/stats', getUrlsStats);
router.put('/shorten/:shortCode', updateUrl);
router.delete('/shorten/:shortCode', deleteUrl);




export default router;