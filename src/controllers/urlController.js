import Url from '../models/urlModels.js';

const generateShorteCode = () => Math.random().toString(36).substring(2,8);

export const createShortUrl = async (req, res) => {
    try {
        const {url}= req.body;
        if(!url){
            return res.status(400).json({message: 'Url is required'});
        }
        const shortCode = generateShorteCode();
        const newUrl = await Url.create({url, shortCode});
        res.status(201).json(newUrl);
    }catch (error) {
        res.status(500).json({message: 'Internal al acortar la url', error});
    }
};

export const getUrls = async (req, res) => {
    try {
        console.log(req.params);
        const {shortCode} = req.params;
        console.log(shortCode);
        const url = await Url.findOne({where: {shortCode}});
        if(!url){
            return res.status(404).json({message: 'Url not found'});
        }
        url.accessCount += 1;
        await url.save();
        res.status(200).json(url);
    } catch (error) {
        res.status(500).json({message: 'Internal error getting url', error});
    }
};

export const getUrlsStats = async (req, res) => {
    try {
        console.log('estoy dentro de getUrlsStats');
        console.log(req.params);
        const {shortCode} = req.params;
        console.log(shortCode);
        const url = await Url.findOne({where: {shortCode}});
        if(!url){
            return res.status(404).json({message: 'Url not found'});
        }
        res.status(200).json(url);
    } catch (error) {
        res.status(500).json({message: 'Internal error getting url', error});
    }
};

export const updateUrl = async (req, res) => {
    try {
        const {shortCode} = req.params;
        const {url:newUrl} = req.body;
        if(!newUrl){
            return res.status(400).json({message: 'Url is required'});
        }
        const url = await Url.findOne({where: {shortCode}});
        if(!url){
            return res.status(404).json({message: 'Url not found'});
        }
        url.url = newUrl;
        await url.save();
        res.status(200).json(url);
    }catch (error) {    
        res.status(500).json({message: 'Internal error updating url', error});
    }
};

export const deleteUrl = async (req, res) => {
    try{
        const {shortCode} = req.params;
        const url = await Url.findOne({where: {shortCode}});
        if(!url){
            return res.status(404).json({message: 'Url not found'});
        }
        await url.destroy();
        res.status(204).end();
    }catch (error) {    
        res.status(500).json({message: 'Internal error deleting url', error});
    }
};