# Course Allocation API - Quick Reference

## Base URL
```
https://lms-work.onrender.com
```

## Authentication
All requests require Bearer token in Authorization header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 📊 Course Pricing Management

### 1. Set Single Course Price
```http
POST /api/admin/courses/pricing
Content-Type: application/json

{
  "course_id": 1,
  "academic_year": "2024/2025",
  "semester": "1ST",
  "price": 50000,
  "currency": "NGN"
}
```

### 2. Bulk Set Course Prices
```http
POST /api/admin/courses/pricing/bulk
Content-Type: application/json

{
  "academic_year": "2024/2025",
  "semester": "1ST",
  "prices": [
    {
      "course_id": 1,
      "price": 50000,
      "currency": "NGN"
    },
    {
      "course_id": 2,
      "price": 45000,
      "currency": "NGN"
    }
  ]
}
```

### 3. Get Course Prices
```http
GET /api/admin/courses/pricing?academic_year=2024/2025&semester=1ST
```

Optional query params:
- `course_id` - Filter by specific course
- `program_id` - Filter by program

### 4. Copy Course Prices
```http
POST /api/admin/courses/pricing/copy
Content-Type: application/json

{
  "from_academic_year": "2023/2024",
  "from_semester": "1ST",
  "to_academic_year": "2024/2025",
  "to_semester": "1ST",
  "program_id": 1
}
```

---

## 👥 Course Allocation Management

### 1. Allocate Courses (By Program)
```http
POST /api/admin/courses/allocate
Content-Type: application/json

{
  "allocation_type": "program",
  "course_ids": [1, 2, 3],
  "academic_year": "2024/2025",
  "semester": "1ST",
  "program_id": 1,
  "level": "100"
}
```

### 2. Allocate Courses (By Faculty)
```http
POST /api/admin/courses/allocate
Content-Type: application/json

{
  "allocation_type": "faculty",
  "course_ids": [1, 2, 3],
  "academic_year": "2024/2025",
  "semester": "1ST",
  "faculty_id": 1,
  "level": "100"
}
```

### 3. Allocate Courses (By Level)
```http
POST /api/admin/courses/allocate
Content-Type: application/json

{
  "allocation_type": "level",
  "course_ids": [1, 2, 3],
  "academic_year": "2024/2025",
  "semester": "1ST",
  "level": "100"
}
```

### 4. Allocate Courses (Individual Students)
```http
POST /api/admin/courses/allocate
Content-Type: application/json

{
  "allocation_type": "individual",
  "course_ids": [1, 2, 3],
  "academic_year": "2024/2025",
  "semester": "1ST",
  "student_ids": [10, 11, 12]
}
```

### 5. Get All Allocations
```http
GET /api/admin/courses/allocations?academic_year=2024/2025&semester=1ST
```

Optional query params:
- `student_id` - Filter by student
- `program_id` - Filter by program
- `level` - Filter by level
- `registration_status` - Filter by status (allocated, registered, cancelled)
- `page` - Page number
- `limit` - Items per page

### 6. Remove Single Allocation
```http
DELETE /api/admin/courses/allocate/:id
```

### 7. Bulk Remove Allocations
```http
DELETE /api/admin/courses/allocate/bulk
Content-Type: application/json

{
  "academic_year": "2024/2025",
  "semester": "1ST",
  "student_ids": [10, 11, 12],
  "course_ids": [1, 2]
}
```

---

## 🎓 Student Course Allocation

### 1. Get My Allocated Courses
```http
GET /api/courses/allocated
```
**Auth**: Student token required

### 2. Register for All Allocated Courses
```http
POST /api/courses/register-allocated
Content-Type: application/json

{}
```
**Auth**: Student token required

---

## 👤 Student Status Management

### 1. Update Admission Status
```http
PATCH /api/admin/students/:id/admission-status
Content-Type: application/json

{
  "a_status": "yes"
}
```
Values: `"yes"` or `"no"`

### 2. Update Graduation Status
```http
PATCH /api/admin/students/:id/graduation-status
Content-Type: application/json

{
  "g_status": "Y"
}
```
Values: `"Y"` or `"N"`

### 3. Activate Student
```http
PATCH /api/admin/students/:id/activate
Content-Type: application/json

{
  "reason": "Account activated after review"
}
```

### 4. Deactivate Student
```http
PATCH /api/admin/students/:id/deactivate
Content-Type: application/json

{
  "reason": "Account suspended due to policy violation"
}
```

---

## 📅 Registration Deadline Management

### Extend Registration Deadline
```http
PATCH /api/admin/semesters/:id/extend-deadline
Content-Type: application/json

{
  "registration_deadline": "2024-03-15"
}
```
Format: `YYYY-MM-DD`

---

## 📋 Response Formats

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

### Common Error Codes
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## 🧪 Testing Workflow

### Complete Setup Flow

1. **Create Active Semester** (if not exists)
```http
POST /api/admin/semesters
{
  "academic_year": "2024/2025",
  "semester": "1ST",
  "start_date": "2024-01-01",
  "end_date": "2024-06-30",
  "status": "active"
}
```

2. **Set Course Prices**
```http
POST /api/admin/courses/pricing/bulk
{
  "academic_year": "2024/2025",
  "semester": "1ST",
  "prices": [...]
}
```

3. **Set Registration Deadline**
```http
PATCH /api/admin/semesters/:id/extend-deadline
{
  "registration_deadline": "2024-02-15"
}
```

4. **Allocate Courses**
```http
POST /api/admin/courses/allocate
{
  "allocation_type": "program",
  ...
}
```

5. **Student Views Allocations**
```http
GET /api/courses/allocated
```

6. **Student Registers**
```http
POST /api/courses/register-allocated
```

7. **Admin Verifies**
```http
GET /api/admin/courses/allocations?registration_status=registered
```

---

## 💡 Tips

1. **Use Postman Environment Variables**
   - `{{BASE_URL}}` = https://lms-work.onrender.com
   - `{{ADMIN_TOKEN}}` = Your admin token
   - `{{STUDENT_TOKEN}}` = Your student token

2. **Check Response Status Codes**
   - 200/201 = Success
   - 400 = Check request body
   - 401 = Check token
   - 404 = Resource not found

3. **Common Issues**
   - Missing/invalid token
   - Wrong semester format (use "1ST" not "1st")
   - Course not found (ensure course exists and is WPU type)
   - Student not active (check a_status, g_status, admin_status)

---

## 🔗 Related Files

- **API Implementation**: `src/api/courses.ts`, `src/api/students.ts`, `src/api/semesters.ts`
- **UI Components**: `src/Components/super-admin/courses/`, `src/Components/student/`
- **Full Documentation**: `COURSE_ALLOCATION_IMPLEMENTATION.md`

