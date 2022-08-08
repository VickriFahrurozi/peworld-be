/** @format */
const db = require('../helper/mysql');
const FileValidation = require('../helper/FileValidation/filevalidation');
const {
	deletecover,
	updatecover,
} = require('../helper/Update Files/updatefiles');
module.exports = {
	addNewPortofolio: (req, res) => {
		return new Promise((resolve, reject) => {
			const { portofolio_name, portofolio_picture, portofolio_repo } = req.body;
			const { profile_id } = req.query;
			if (req.file) {
				if (FileValidation(req.file.filename) != 1) {
					reject({
						success: false,
						message:
							'Format File Tidak Didukung ! , Format Yang Di Izinkan : Jpg,Png,Jpeg,Webp',
					});
				} else {
					db.query(
						`INSERT into portofolio (portofolio_name,portofolio_picture,portofolio_repo) 
					   Values ("${portofolio_name}","${req.file.filename}","${portofolio_repo}")`,
						(err, result) => {
							if (err) {
								reject({
									success: false,
									message: 'Data Portofolio Tidak Berhasil Di Inputt',
								});
							} else {
								resolve({
									message: 'Data Portofolio Berhasil Di Tambahkan',
									status: 200,
									result,
								});
							}
						}
					);
				}
			} else {
				res.status(400).send({
					success: false,
					message: 'Foto Portofolio Tidak Boleh Kosong',
				});
			}
		});
	},
};