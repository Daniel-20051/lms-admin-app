# Course Allocation System - Testing Guide

## 🚀 Quick Start

### Prerequisites
1. ✅ LMS Backend is running
2. ✅ Admin account with super admin privileges
3. ✅ Student account for testing
4. ✅ Active semester exists
5. ✅ Courses created (with `owner_type = "wpu"`)
6. ✅ Students enrolled in programs

---

## 🎯 Testing Scenarios

### Scenario 1: Set Course Prices for New Semester

**Goal**: Set prices for all WPU courses for the current semester

**Steps**:
1. Login as Super Admin
2. Navigate to **Courses** page
3. Click on **Pricing** tab
4. Click **Manage Course Prices** button
5. Select the current semester from dropdown
6. Wait for courses to load
7. Enter prices for each course (e.g., 50000, 45000, etc.)
8. Click **Save All Prices**
9. Verify success message shows number of prices created/updated

**Expected Result**:
- Toast notification: "Successfully saved X course prices (Y created, Z updated)"
- Prices are saved to database
- Can verify by reopening the dialog and seeing saved prices

**API Call**:
```javascript
POST /api/admin/courses/pricing/bulk
```

---

### Scenario 2: Copy Prices from Previous Semester

**Goal**: Quickly copy all prices from last semester to new semester

**Steps**:
1. In Pricing Management Dialog
2. Click on **Copy Prices** tab
3. Select **Source Semester** (e.g., 2023/2024 - 1ST)
4. Select **Destination Semester** (e.g., 2024/2025 - 1ST)
5. Click **Copy Prices**
6. Verify success message

**Expected Result**:
- Toast notification: "Successfully copied X course prices"
- Prices are copied to destination semester
- Can verify in Set Prices tab by selecting destination semester

**API Call**:
```javascript
POST /api/admin/courses/pricing/copy
```

---

### Scenario 3: Allocate Courses to All 100 Level Students in a Program

**Goal**: Allocate 3 courses to all 100 level students in Computer Science program

**Steps**:
1. Navigate to **Courses** page
2. Click on **Allocation** tab
3. Click **Allocate Courses to Students** button
4. Select current semester
5. Select **Allocation Type**: "By Program"
6. Select **Program**: "Computer Science"
7. Select **Level**: "100 Level"
8. Check 3 courses from the list (or click "Select All")
9. Click **Allocate Courses**
10. Verify success message

**Expected Result**:
- Toast notification: "Successfully allocated X courses to Y students (Z skipped)"
- Allocations are created in database
- Can verify in View Allocations tab

**API Call**:
```javascript
POST /api/admin/courses/allocate
```

---

### Scenario 4: View All Allocations for Current Semester

**Goal**: View all course allocations and filter them

**Steps**:
1. Navigate to **Courses** page
2. Click on **View Allocations** tab
3. Click **View All Allocations** button
4. Select current semester
5. Select **Status**: "Allocated" (to see only unregistered allocations)
6. Use search box to find specific student or course
7. View allocation details in table

**Expected Result**:
- Table shows all allocations with student, course, price, status
- Can filter by semester, status
- Can search by student name, matric number, course code
- Pagination works for large datasets

**API Call**:
```javascript
GET /api/admin/courses/allocations
```

---

### Scenario 5: Remove an Allocation

**Goal**: Remove a course allocation before student registers

**Steps**:
1. In Allocation Management dialog
2. Find an allocation with status "Allocated"
3. Click the trash icon button
4. Confirm deletion in dialog
5. Verify success message

**Expected Result**:
- Toast notification: "Allocation removed successfully"
- Allocation is removed from table
- Student no longer sees this course in their allocated courses

**Notes**:
- Can only remove allocations with status "Allocated"
- Cannot remove if student already registered

**API Call**:
```javascript
DELETE /api/admin/courses/allocate/:id
```

---

### Scenario 6: Student Views Allocated Courses

**Goal**: Student views courses allocated to them

**Steps**:
1. Login as Student
2. Navigate to allocated courses page (integrate `AllocatedCoursesView` component)
3. View allocated courses table
4. See total amount and course count
5. Check registration deadline

**Expected Result**:
- Shows all allocated courses with details
- Displays total amount to pay
- Shows registration deadline
- "Register for All Courses" button is enabled if deadline not passed

**API Call**:
```javascript
GET /api/courses/allocated
```

---

### Scenario 7: Student Registers for All Allocated Courses

**Goal**: Student registers for all allocated courses and pays from wallet

**Prerequisites**:
- Student has sufficient wallet balance
- Registration deadline has not passed
- Student has allocated courses

**Steps**:
1. In Allocated Courses View
2. Review all courses and total amount
3. Click **Register for All Courses** button
4. Review summary in confirmation dialog
5. Click **Confirm Registration**
6. Wait for processing
7. Verify success message

**Expected Result**:
- Toast notification: "Successfully registered for X courses! Amount paid: ₦Y"
- Wallet balance is debited
- Courses appear in student's registered courses
- Allocations status changes to "Registered"
- Receipt is created in database

**API Call**:
```javascript
POST /api/courses/register-allocated
```

---

### Scenario 8: Handle Insufficient Wallet Balance

**Goal**: Test error handling when student doesn't have enough money

**Prerequisites**:
- Student wallet balance < Total course amount

**Steps**:
1. Student tries to register for allocated courses
2. Click **Register for All Courses**
3. Confirm in dialog

**Expected Result**:
- Error toast: "Insufficient wallet balance. Required: X, Available: Y"
- Registration does not proceed
- Courses remain in allocated status
- Student should top up wallet and try again

---

### Scenario 9: Handle Deadline Passed

**Goal**: Test that students cannot register after deadline

**Prerequisites**:
- Registration deadline has passed

**Steps**:
1. Student views allocated courses
2. Should see warning alert
3. "Register for All Courses" button should be disabled

**Expected Result**:
- Warning alert shown: "Registration deadline has passed..."
- Button is disabled or shows "Registration Not Available"
- If student somehow tries to register, gets error: "Registration deadline has passed. Please contact admin to extend the deadline."

---

### Scenario 10: Extend Registration Deadline

**Goal**: Super admin extends deadline for late registrations

**Steps**:
1. Login as Super Admin
2. Navigate to **Semesters** page
3. Find active semester
4. Use extend deadline functionality
5. Set new deadline (e.g., 2 weeks later)
6. Confirm

**Expected Result**:
- Deadline is updated
- Students can now register again
- Deadline warning disappears for students

**API Call**:
```javascript
PATCH /api/admin/semesters/:id/extend-deadline
```

---

### Scenario 11: Manage Student Status

**Goal**: Test student activation/deactivation system

**Steps**:
1. Login as Super Admin
2. Navigate to Students page (needs UI integration)
3. Select a student
4. Test each status endpoint:
   - Update admission status to "yes"
   - Activate student account
   - Verify student can log in
   - Deactivate student account
   - Verify student cannot log in

**Expected Result**:
- Status changes are reflected immediately
- Active students can log in and register
- Inactive students are blocked from system

**API Calls**:
```javascript
PATCH /api/admin/students/:id/admission-status
PATCH /api/admin/students/:id/graduation-status
PATCH /api/admin/students/:id/activate
PATCH /api/admin/students/:id/deactivate
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "No courses found"
**Solution**: Ensure WPU courses exist (`owner_type = "wpu"`)

### Issue 2: "No allocations found"
**Solution**: First allocate courses before viewing allocations

### Issue 3: "Cannot remove allocation that is already registered"
**Solution**: This is expected - registered allocations cannot be removed

### Issue 4: "Insufficient wallet balance"
**Solution**: Student needs to top up wallet first

### Issue 5: "Registration deadline has passed"
**Solution**: Admin needs to extend deadline

### Issue 6: "No allocated courses found for current semester"
**Solution**: Admin needs to allocate courses to this student first

### Issue 7: Prices not showing in Pricing Dialog
**Solution**: Ensure you've selected a semester and have WPU courses

### Issue 8: Cannot allocate to students
**Solution**: 
- Ensure students exist in program
- Ensure students are ACTIVE (a_status="yes", g_status!="Y", admin_status="active")

---

## ✅ Verification Checklist

### Super Admin Features
- [ ] Can open Pricing Management Dialog
- [ ] Can set prices for individual courses
- [ ] Can bulk set prices
- [ ] Can copy prices from another semester
- [ ] Can view all course prices for a semester
- [ ] Can open Course Allocation Dialog
- [ ] Can allocate by program
- [ ] Can allocate by faculty
- [ ] Can allocate by level
- [ ] Can select multiple courses
- [ ] Can view all allocations
- [ ] Can filter allocations by semester
- [ ] Can filter allocations by status
- [ ] Can search allocations
- [ ] Can remove unregistered allocations
- [ ] Cannot remove registered allocations
- [ ] Can extend registration deadline

### Student Features
- [ ] Can view allocated courses
- [ ] Can see course details (code, title, units, price)
- [ ] Can see total amount
- [ ] Can see registration deadline
- [ ] Can see deadline warning if passed
- [ ] Can register for all courses at once
- [ ] Sees confirmation dialog before registration
- [ ] Gets success message after registration
- [ ] Cannot register after deadline
- [ ] Gets error if insufficient balance
- [ ] Allocated courses disappear after registration

---

## 📊 Test Data Suggestions

### Courses (WPU Type)
```
1. CSC101 - Introduction to Computer Science - 3 units - ₦50,000
2. MTH101 - Calculus I - 4 units - ₦45,000
3. PHY101 - Physics I - 3 units - ₦40,000
4. CHM101 - Chemistry I - 3 units - ₦40,000
5. ENG101 - English I - 2 units - ₦30,000
```

### Students
```
- 10 students in Computer Science (100 level)
- 5 students in Computer Science (200 level)
- 8 students in Electrical Engineering (100 level)
```

### Semesters
```
- 2024/2025 - 1ST (Active)
- 2023/2024 - 2ND (Closed)
```

---

## 🎥 Demo Flow

### Complete End-to-End Demo

1. **Admin Setup**
   - Set prices for 5 courses
   - Allocate 5 courses to 100 level CS students
   - View allocations in table

2. **Student Experience**
   - Login as student
   - View 5 allocated courses
   - See total amount (e.g., ₦205,000)
   - Register for all courses
   - Payment processed from wallet

3. **Admin Verification**
   - View allocations table
   - See status changed to "Registered"
   - Verify transaction in payments

---

## 📸 Screenshots Locations

Key areas to test and capture:

1. **Courses Page - Pricing Tab**
2. **Pricing Management Dialog - Set Prices**
3. **Pricing Management Dialog - Copy Prices**
4. **Courses Page - Allocation Tab**
5. **Course Allocation Dialog**
6. **Courses Page - View Allocations Tab**
7. **Allocation Management Table**
8. **Student - Allocated Courses View**
9. **Student - Registration Confirmation Dialog**
10. **Student - Success Message**

---

## 🔧 Developer Testing

### Console Checks

Monitor browser console for:
- API requests/responses
- Error messages
- Loading states
- Data transformations

### Network Tab

Check API calls:
- Request payloads
- Response data
- Status codes
- Response times

### React DevTools

Verify:
- Component state
- Props flow
- Re-renders
- Context values

---

## 🚦 Status Indicators

### Success ✅
- Green toast notifications
- Success badges
- Confirmation messages

### Error ❌
- Red toast notifications
- Error messages
- Destructive badges

### Warning ⚠️
- Yellow alert boxes
- Deadline warnings
- Insufficient balance warnings

### Loading 🔄
- Spinner icons
- Disabled buttons
- Loading states

---

## 📝 Notes

- All operations require authentication
- Super admin token for admin endpoints
- Student token for student endpoints
- Ensure backend is running before testing
- Clear browser cache if seeing stale data
- Check network tab for API errors

---

**Happy Testing! 🎉**

