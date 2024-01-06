DELIMITER //
CREATE PROCEDURE sp_add_kary_krisna(IN p_nama VARCHAR(255), IN p_alamat TEXT, IN p_gend ENUM('Laki-Laki', 'Perempuan'), IN p_tgl_lahir DATE, OUT p_result VARCHAR(255))
BEGIN
    DECLARE nip_exists INT DEFAULT 0;
    SELECT COUNT(*) INTO nip_exists FROM gmedia_democase.karyawan WHERE nip = CONCAT(YEAR(p_tgl_lahir), LPAD(FLOOR(RAND() * 10000), 4, '0'));

    IF nip_exists > 0 THEN
        SET p_result = 'Gagal menyimpan data karena NIP sudah ada.';
    ELSE
        START TRANSACTION;
        INSERT INTO gmedia_democase.karyawam (nip, nama, alamat, gend, tgl_lahir, status, id) VALUES (CONCAT(YEAR(p_tgl_lahir), LPAD(FLOOR(RAND() * 10000), 4, '0')), p_nama, p_alamat, p_gend, p_tgl_lahir, 1, 0);

        IF ROW_COUNT() > 0 THEN
            INSERT INTO gmedia_democase.log_trx_api (action, result) VALUES ('Tambah data karyawan', 'Berhasil');
            SET p_result = 'Berhasil menyimpan data.';
            COMMIT;
        ELSE
            ROLLBACK;
            SET p_result = 'Gagal menyimpan data.';
        END IF;
    END IF;
END //
DELIMITER ;
