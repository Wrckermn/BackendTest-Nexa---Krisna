CREATE VIEW karyawan_krisna AS
SELECT
	(SELECT COUNT(*) FROM gmedia_democase.karyawan k2 WHERE k2.Nip <= k.Nip) AS No,
    k.nip AS 'Nip',
    k.nama AS 'Nama',
    k.alamat AS 'Alamat',
    CASE
        WHEN k.Gend = 'L' THEN 'Laki - Laki'
        WHEN k.Gend = 'P' THEN 'Perempuan'
        ELSE 'Undefined'
    END AS Gend,
    DATE_FORMAT(k.tgl_lahir, '%d %M %Y') AS 'Tanggal lahir'
FROM
    gmedia_democase.karyawan k
ORDER BY k.Nip;
