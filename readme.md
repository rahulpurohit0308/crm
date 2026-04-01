# 🚀 CRM Application (Customer Relationship Management System)

A full-stack CRM application designed to manage users, workspaces, leads, contacts, and activities with role-based access control and multi-tenant architecture.

---

## 📌 Overview

This CRM system allows users to:

- Create and manage accounts
- Work within multiple workspaces
- Manage leads and convert them into contacts
- Track activities
- Collaborate with team members using role-based access

The application follows a **modular and scalable architecture**, making it suitable for real-world business use cases.

---

## 🧠 Key Features

### 🔐 Authentication & User Management
- User registration and login
- Secure authentication (JWT-based)
- Password update functionality
- User profile settings

---

### 🏢 Workspace Management
- Create and manage multiple workspaces
- Add/remove users to/from workspace
- Role-based access:
  - Admin
  - Member
- Workspace-level visibility controls

---

### 📊 Lead Management
- Create, update, delete leads
- Lead statuses:
  - Ongoing
  - Closed Won
  - Closed Lost
- Assign leads to users
- Filter and view leads by workspace

---

### 🤝 Contact Management
- Convert leads into contacts
- Manage contact details
- Maintain relationship between leads and contacts

---

### 📝 Activity Tracking
- Add activities:
  - Calls
  - Meetings
  - Notes
- Link activities to contacts or leads
- Maintain activity history

---

### 📈 Dashboard
- View all workspaces
- View personal leads
- Quick navigation to core modules

---

### ⚙️ Settings
- User settings (name, email, password)
- Workspace settings (visibility, roles, configurations)

---

## 🏗️ System Design Approach

This project follows a **feature-driven development approach**:

1. High-level functional flow design
2. Feature-wise breakdown:
   - Auth Flow
   - Workspace Flow
   - Lead Flow
   - Contact Flow
   - Activity Flow
3. Iterative implementation:
   - Database design
   - API development
   - Frontend integration

---

## 🗂️ Core Entities

- **User**
- **Workspace**
- **UserWorkspace (Mapping + Roles)**
- **Lead**
- **Contact**
- **Activity**

---

## 🔗 Relationships

- A user can belong to multiple workspaces
- A workspace can have multiple users
- A workspace contains multiple leads
- A lead can be converted into a contact
- A contact can have multiple activities

---

## ⚙️ Tech Stack

### Backend
- Java (Spring Boot)
- REST APIs
- JWT Authentication

### Frontend
- Angular
- Component-based architecture
- Reactive forms

### Database
- PostgreSQL

---

## 🔌 API Overview (Sample)

### Auth
- `POST /auth/register`
- `POST /auth/login`

### Workspace
- `POST /workspaces`
- `GET /workspaces`

### Leads
- `POST /leads`
- `GET /leads`
- `PATCH /leads/:id`
- `DELETE /leads/:id`

### Contacts
- `POST /contacts`
- `GET /contacts`

### Activities
- `POST /activities`
- `GET /activities`

---

## 🚀 Getting Started

### Prerequisites
- Java (JDK 21)
- Node.js
- PostgreSQL
- Docker (optional)

---

### Backend Setup

```bash
cd crm-backend
./mvnw spring-boot:run