const { createKaryawan, getKaryawan, updateKaryawan, disableKaryawan } = require("../middleware/karyawanMiddleware");
const multer = require('multer');
const upload = multer({
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('File harus berupa gambar.'));
        }
    }
});

module.exports = {
    createKry: [
        (req, res, next) => {
            upload.single('photo')(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(400).json({
                        status: 400,
                        message: err.message
                    });
                } else if (err) {
                    return res.status(400).json({
                        status: 400,
                        message: err.message || 'Terjadi kesalahan dalam mengunggah file.'
                    });
                }
                next();
            });
        },
        (req, res) => {
            const body = req.body;
            const file = req.file;

            if (!body.nama || !body.alamat || !body.gend || !file || !body.tgl_lahir) {
                return res.status(400).json({
                    status: 400,
                    message: "Field kosong, gagal menyimpan"
                });
            }

            body.photo = file ? file.buffer.toString('base64') : null;

            createKaryawan(body, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        status: 500,
                        message: "Internal Server Error"
                    });
                }
                if (!result || result.length === 0) {
                    return res.status(500).json({
                        status: 500,
                        message: "Failed to create data"
                    });
                }
                return res.status(200).json({
                    status: 200,
                    message: "Data successfully created",
                    data: result
                });
            });
        }
    ],
    getKry: (req, res) => {
        const { keyword, start, count } = req.query;
    
        getKaryawan(keyword, start, count, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    status: 500,
                    message: "Internal Server Error"
                });
            }
            return res.status(200).json({
                status: 200,
                message: "Data successfully retrieved",
                data: result
            });
        });
    },
    updateKry: [
        (req, res, next) => {
            upload.single('photo')(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(400).json({
                        status: 400,
                        message: err.message
                    });
                } else if (err) {
                    return res.status(400).json({
                        status: 400,
                        message: err.message || 'Terjadi kesalahan dalam mengunggah file.'
                    });
                }
                next();
            });
        },
        (req, res) => {
            const body = req.body;
            const file = req.file;

            if (!body.nama || !body.alamat || !body.gend || !file || !body.tgl_lahir || !body.nip) {
                return res.status(400).json({
                    status: 400,
                    message: "Field kosong, gagal menyimpan"
                });
            }

            body.photo = file ? file.buffer.toString('base64') : null;

            updateKaryawan(body, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        status: 500,
                        message: "Internal Server Error"
                    });
                }
                if (!result || result.length === 0) {
                    return res.status(500).json({
                        status: 500,
                        message: "Failed to update data"
                    });
                }
                return res.status(200).json({
                    status: 200,
                    message: "Data successfully updated",
                    data: result
                });
            });
        }
    ],
    disableKry: (req, res) => {
        const nip = req.params.nip;
        disableKaryawan(nip, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    status: 500,
                    message: "Field kosong, gagal menyimpan"
                });
            }
            if(!result){
                return res.status(404).json({
                    status: 404,
                    message: "Nip not found"
                });
            }
            return res.status(200).json({
                status: 200,
                message: "Data successfully disabled",
                data: result
            });
        });
    }
}
