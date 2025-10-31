# Approval App Backend

Backend untuk aplikasi manajemen cuti dengan role **Employee**, **Head**, dan **GM**.  
Dibangun menggunakan **Node.js**, **Express**, **Sequelize** (MySQL), dan **JWT** untuk autentikasi.

---

## 🔧 Setup Project

1. **Clone repository**
```bash
git clone https://github.com/rahmatadidi/be-approval-apps.git
cd approval-app
```

2. **Install dependencies**
```bash
npm install
```
3. **Buat file environment**
```bash
cp .env.example .env
```

**Edit .env sesuai konfigurasi lokal:**
```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=approval_app
PORT=3000
JWT_SECRET=secretkey
```

4. **Migrasi database**
```bash
npx sequelize-cli db:migrate
```

5. ***Jalankan Server***
```bash
npm run dev
```

🔑 Autentikasi

1. **Login**
*URL: api/auth/login*
*Method: POST*
```bash
//employee
   {
  "username": "employee",
  "password": "123"
  }

//head
{
  "username": "head",
  "password": "123"
  }

//GM
{
  "username": "gm",
  "password": "123"
  }

```
📝 Leaves

1. **Create Leaves**
URL: api/leaves
Method: POST
```bash
{
  "startDate": "2025-12-01",
  "employeeName" : "Jhon Doe"
  "endDate": "2025-12-03",
  "reason": "Liburan keluarga"
}
```

✅ Approval
**List Pending Head**

URL: /approval/head?page=1&pageSize=10

Method: GET

Headers: Authorization: Bearer <token>

**List Pending GM**

URL: /approval/gm?page=1&pageSize=10

Method: GET

Headers: Authorization: Bearer <token>

**Head Approve / Reject / Revise**

URL: /approval/head/:id

Method: POST
```bash
{
  "action": "approve|revision|rejected",
  "comment": "Optional comment"
}
```

🛠 **Tech Stack**
<p align="left">
  <img src="https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-404D59?logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?logo=sequelize&logoColor=white" />
  <img src="https://img.shields.io/badge/JSON%20Web%20Tokens-000000?logo=jsonwebtokens&logoColor=white" />
</p>
Node.js + Express
Sequelize ORM + MySQL
JWT Authentication
Middleware untuk role-based access
