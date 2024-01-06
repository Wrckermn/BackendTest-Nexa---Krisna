const pool = require('../../../configs/db');
const { format } = require('date-fns');
const { v4: uuidv4 } = require('uuid');

function handleSpc(input) {
  const cleanInput = input.replace(/[^a-zA-Z0-9\s''.,]/g, '');
  return cleanInput;
}

module.exports = {
    createKaryawan: (data, callBack) => {
        const cleanNama = handleSpc(data.nama);
        const cleanAlamat = handleSpc(data.alamat);

        const currentYear = format(new Date(), 'yyyy');
        const counterUUID = uuidv4();
        const nipCounter = counterUUID.toString().substring(0, 4);
        let nip = `${currentYear}${nipCounter}`;
      
        pool.query(
          `insert into karyawan(nip, nama, alamat, gend, photo, tgl_lahir, status, id) 
                              values (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            nip,
            cleanNama,
            cleanAlamat,
            data.gend,
            data.photo,
            data.tgl_lahir,
            1,
            0
          ],
          (error, results) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
    },
    getKaryawan: (keyword, start, count, callBack) => {
      const limit = count || 10;
      const offset = start || 0;
  
      let query = 'SELECT * FROM karyawan';
      let queryParams = [];
  
      if (keyword) {
          query += ' WHERE nama LIKE ?';
          queryParams.push(`%${keyword}%`);
      }
  
      query += ' LIMIT ? OFFSET ?'; 
      queryParams.push(limit, offset);
  
      pool.query(query, queryParams, (error, results) => {
          if (error) {
              return callBack(error);
          }
          return callBack(null, results);
      });
    },
    updateKaryawan: (data, callBack) => {
      const cleanNama = handleSpc(data.nama);
      const cleanAlamat = handleSpc(data.alamat);

      pool.query(
        'update karyawan set nama=?, alamat=?, gend=?, photo=?, tgl_lahir=? where nip=?',
        [
          cleanNama,
          cleanAlamat,
          data.gend,
          data.photo,
          data.tgl_lahir,
          data.nip
        ],
        (error, results) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
    },
    disableKaryawan: (nip, callBack) => {
      pool.query(
        'update karyawan set status=9 where nip=?',
        [nip],
        (error, results) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
    }
};