## Simple Notes Webapp NodeJS dan MongoDB

## Sebelum Instalasi:
- Akun buat Database (MongoDB)
- Akun Google Console buat API Auth Key

## Buat file .env di root folder
Buat file .env untuk menyimoan kredensial projek. Contoh dibawah:

```
MONGODB_URI = mongodb+srv://<username>:<password>@mongodburlhere
GOOGLE_CLIENT_ID= YOUR_GOOGLE_ID_HERE
GOOGLE_CLIENT_SECRET= YOUR_GOOGLE_CLIENT_SECRET_HERE
GOOGLE_CALLBACK_URL=http://localhost:5000/google/callback
```

## Instalasi
Untuk instal dan jalankan projek ini - instal npm dependencies dan start server:

```
$ npm install
$ npm start
```

