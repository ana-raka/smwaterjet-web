const NoticeDto = require("@dtos/notice-dto/notice-dto");
const NoticeFileDto = require("@dtos/notice-dto/notice-file-dto");
const noticeService = require('@sservices/notice-service');

class NoticeController {
    static async getAllNotices(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;

            const noticeResDtos = await noticeService.getAllNotices(page, limit);
            res.status(200).json(noticeResDtos);
        } catch (error) {
            next(error);
        }
    }
    static async getNoticeById(req, res, next) {
        try {
            const { noticeId } = req.params;
            const noticeResDto = await noticeService.getNoticeById(noticeId);
            res.status(200).json(noticeResDto);
        } catch (error) {
            next(error);
        }
    }
    static async createNotice(req, res, next) {
        try {
            const filePaths = req.files ? req.files.map(file => file.path) : [];
            const noticeDto = new NoticeDto(req.body);
            const noticeFileDto = new NoticeFileDto(filePaths);
            const noticeResDto = await noticeService.createNotice(noticeDto, noticeFileDto);

            res.status(201).json(noticeResDto);
        } catch (error) {
            next(error);
        }
    }
    static async editNotice(req, res, next) {
        try {
            const { noticeId } = req.params;
            const filePaths = req.files ? req.files.map(file => file.path) : [];
            const noticeDto = new NoticeDto(req.body);
            const noticeFileDto = new NoticeFileDto(filePaths);

            const noticeResDto = await noticeService.editNotice(noticeId, noticeDto, noticeFileDto);

            res.status(200).json(noticeResDto);
        } catch {
            next(error);
        }
    }
    static async deleteNotice(req, res, next) {
        try {
            const { noticeId } = req.params;
            await noticeService.deleteNotice(noticeId);

            res.status(200).json({ message: 'Notice deleted successfully' });
        } catch (error) {
            next(error);
        }
    }

    static async deleteFile(req, res, next) {
        try {
            const { noticeFileId } = req.params;
            await noticeService.deleteFile(noticeFileId);

            res.status(200).json({ message: 'NoticeFile deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = NoticeController;