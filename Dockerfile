# Gunakan base image Alpine
FROM node:alpine

# Menentukan direktori kerja di dalam container
WORKDIR /usr/src/app

# Menyalin package.json dan package-lock.json (jika ada) untuk instalasi dependensi
COPY package*.json ./

# Install dependensi dari package.json
RUN npm install

# Menyalin seluruh kode proyek
COPY . .

# Menjalankan perintah start yang ada di package.json
CMD ["npm", "start"]
