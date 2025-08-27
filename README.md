# 💊 Online Pharmacy Portal (Online Drug Ordering System)

An online platform for users to order medicines/drugs securely. The system supports user authentication, admin management of drug inventory, member registration and approval, and order processing with automatic cart management.

---

## 🛠️ Modules Overview

### 🔐 1. Authentication Module
- **User Login/Logout** functionality
- **Member registration** with approval system
- **Password protection**

---

### 💊 2. Drug Management (Admin)
- Add new drugs
- List all drugs
- Edit drug details
- Delete drugs
- View drug by ID or name

### 🔍 Drug Access (Members)
- View drugs by ID or name (read-only)

---

### 👤 3. Member Management
- Member Registration
- Admin:
  - View all members
  - Disable a defaulting member
  - Delete a member
  - Update member details
- Member:
  - Edit profile (email, phone, etc.)
- Admin approval required before member login is enabled

---

### 🛒 4. Medicine Order Module (Members)
- order drugs
- Drug quantity updated before add drugs into the cart.
- Add multiple drugs to cart
- Automatically calculate total price
- Complete order (payment gateway included)
- Cart empties after order completion
- Block orders if:
  - Drug quantity is zero
  - Requested quantity > available stock

---



---

## 🚀 Getting Started

### Requirements
- Java (JDK 8+)
- MySQL/MariaDB
- Apache Tomcat (if using JSP/Servlets)
- Maven 
- VS Code / IntelliJ IDEA
- React(Vite)

### Setup Instructions
1. *Clone the Repository*
   ```bash
  
### Login Admin/Member
<img width="1920" height="1020" alt="Login" src="https://github.com/user-attachments/assets/dba47ce4-8e6b-4f11-84a0-2cad459e9a8b" />



### Forgot Password
<img width="1920" height="1020" alt="ForgetPassword" src="https://github.com/user-attachments/assets/fc7e4492-e52a-495d-8c3c-53ec4eede179" />


### Registration [Member]
<img width="1920" height="1020" alt="Register" src="https://github.com/user-attachments/assets/2775ef62-7040-433b-a3a5-1cca49f02a93" />


### Admin Dashboard 
<img width="1920" height="1020" alt="AdminDashboard" src="https://github.com/user-attachments/assets/a44f1e97-9334-4a7c-9758-15d3aaba8d0a" />

<img width="1920" height="1020" alt="ManageMember" src="https://github.com/user-attachments/assets/5f0e52cf-5b70-405a-864a-52acb2b1814d" />

<img width="1920" height="1020" alt="AddMember" src="https://github.com/user-attachments/assets/d54a2ef3-36ca-4a12-be0f-d4ea08b7ad78" />

<img width="1920" height="1020" alt="AddMedicine" src="https://github.com/user-attachments/assets/e55f752e-ec56-4ee9-8b7c-421b504119a9" />

<img width="1920" height="1020" alt="ManageDrugs" src="https://github.com/user-attachments/assets/8f74b2f4-1fb3-457e-bb7a-85615c0ed18d" />

<img width="1920" height="1020" alt="ManageOrder" src="https://github.com/user-attachments/assets/725af896-c3c3-4323-82f4-cdaf3d287b83" />


### Member Dashboard
<img width="1920" height="1020" alt="MemberDashboard" src="https://github.com/user-attachments/assets/21ff3a0a-9099-42f8-b12c-3599a07735eb" />

<img width="1920" height="1020" alt="MyProfile" src="https://github.com/user-attachments/assets/6f9648ff-4c54-459e-922d-99e01b9cb38a" />

<img width="1920" height="1020" alt="MyCart" src="https://github.com/user-attachments/assets/63d97667-82a7-4f4a-ba13-392ae00e550c" />


<img width="1920" height="1020" alt="MyOrder" src="https://github.com/user-attachments/assets/95b8f352-ecd8-410c-81cf-e75b7d082883" />


