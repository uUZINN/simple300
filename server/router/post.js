const multer = require("multer");
const express = require("express");
const router = express.Router();


// 스키마 만들기
const { Post } = require("../Model/Post.js");
const { Counter } = require("../Model/Counter.js");

// 이미지 업로드
const setUpload = require("../util/upload.js");

// 글쓰기
router.post("/write", (req, res) => {
    let temp = req.body;

    Counter.findOne({ name: "counter" })
        .exec()
        .then((counter) => {
            temp.postNum = counter.postNum;

            const BlogWrite = new Post(temp);
            BlogWrite
                .save()
                .then(() => {
                    Counter.updateOne({ name: "counter" }, { $inc: { postNum: 1 } }).then(() => {
                        res.status(200).json({ success: true });
                    })
                })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ success: false })
        })
})

// 글 목록
router.post("/list", (req, res) => {
    Post
        .find()
        .exec()
        .then((result) => {
            res.status(200).json({ success: true, postList: result })
        })
        .catch((err) => {
            res.status(400).json({ success: false })
        })
})

// 글 상세페이지
router.post("/detail", (req, res) => {
    Post
        .findOne({ postNum: req.body.postNum })
        .exec()
        .then((result) => {
            res.status(200).json({ success: true, post: result });
        })
        .catch((err) => {
            res.status(400).json({ success: false });
        })
})

// 글 수정하기
router.post("/modify", (req, res) => {
    let temp = {
        title: req.body.title,
        content: req.body.content
    }
    Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
        .exec()
        .then(() => {
            res.status(200).json({ success: true })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ success: false })
        })
})

// 글 삭제하기
router.post("/delete", (req, res) => {
    Post.deleteOne({ postNum: Number(req.body.postNum) })
        .exec()
        .then(() => {
            res.status(200).json({ success: true })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ success: false })
        })
})

// // 이미지 업로드
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "image/");
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}_${file.originalname}`);
//     },
// });

// const upload = multer({ storage: storage }).single("file");

// router.post("/image/upload", (req, res) => {
//     upload(req, res, (err) => {
//         if (err) {
//             res.status(400).json({ success: false });
//         } else {
//             res.status(200).json({ success: true, filePath: res.req.file.path });
//         }
//     })
// });

// 이미지 업로드
router.post("/image/upload", setUpload("react-blog2024/post"), (req, res, next) => {
    console.log(res.req)
    res.status(200).json({ success: true, filePath: res.req.file.location })
})

module.exports = router;
