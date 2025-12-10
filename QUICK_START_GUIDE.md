# Content Management - Quick Start Guide

## Getting Started

### 1. Access Content Management
Navigate to the super admin dashboard and expand the **"Content Management"** category in the sidebar.

### 2. Available Sections

#### 📚 Course Content
**Path:** `/super-admin/content/course-content`

**What you can do:**
- View all courses for a selected session
- Navigate to individual course details
- Manage modules and units for each course

**Quick Actions:**
1. Click "Change Session" to select academic year
2. Use search bar to find specific courses
3. Click on any course card to manage its content

---

#### ✅ Quizzes
**Path:** `/super-admin/content/quizzes`

**What you can do:**
- View all quizzes across all courses
- Create, edit, and delete quizzes
- View quiz statistics and student performance

**Quick Actions:**
1. Select session to load quizzes
2. Search by quiz title or course code
3. Click "Details" to view questions
4. Click "Stats" to see student performance
5. Use "Edit" or "Delete" for management

---

#### 📊 Results
**Path:** `/super-admin/content/results`

**What you can do:**
- View quiz results by course
- Check student scores and performance
- Monitor average scores and attempt counts

**Quick Actions:**
1. Select session
2. Click "View Quiz Results" on any course
3. View detailed statistics for each quiz

---

## Managing Course Content

### Creating a Module
1. Navigate to Course Content → Select a course
2. Click **"Add Module"**
3. Enter module title and description
4. Click "Create Module"

### Adding Units to a Module
1. Expand a module in the course detail page
2. Click **"Add Unit"** button
3. Fill in:
   - Unit title
   - Content type (Text, Video, or Document)
   - Content (supports HTML)
   - Optional: Upload video file
4. Click "Create Unit"

### Editing Units
1. Click the **Edit icon** (pencil) on any unit
2. Update title, content, or video URL
3. Click "Update Unit"

### Previewing Units
1. Click the **Eye icon** on any unit
2. View formatted content and video
3. Close preview when done

---

## Managing Quizzes

### Creating a Quiz (2-Step Process)

#### Step 1: Quiz Details
1. Go to Course Content → Select course → Quizzes tab
2. Click **"Create Quiz"**
3. Fill in:
   - Quiz title
   - Select module
   - Duration in minutes
   - Status (Draft/Published)
   - Optional description
4. Click "Next: Add Questions"

#### Step 2: Add Questions
1. For each question:
   - Enter question text
   - Select type (Single Choice / Multiple Choice)
   - Enter points value
   - Add options (minimum 2)
   - Check correct answer(s)
2. Click **"Add Question"** for more questions
3. Click **"Create Quiz"** when done

### Editing a Quiz
1. Click **"Edit"** on any quiz card
2. Update title, duration, status, or description
3. Click "Update Quiz"

> **Note:** To edit questions, you need to use the QuizDetailsDialog view mode

### Viewing Quiz Statistics
1. Click **"Stats"** or **"View Statistics"** on a quiz
2. View:
   - Total attempts
   - Average score
   - Individual student scores
   - Submission dates

---

## Managing Exams

### Question Bank
**Path:** `/super-admin/exams/question-bank`

1. Select session
2. Choose a course
3. View objective and theory questions
4. Click "Add Objective Question" or "Add Theory Question"
5. Fill in question details
6. Questions are reusable across exams

### Exam Management
**Path:** `/super-admin/exams`

1. Select session
2. Click on a course to manage its exams
3. Create, edit, or view exam details
4. Questions are pulled from the question bank

---

## Common Workflows

### Workflow 1: Set Up New Course Content
1. Navigate to Course Content
2. Select your course
3. Click "Add Module" → Create first module
4. Click "Add Unit" on the module → Create units
5. Switch to Quizzes tab → Create assessment
6. Add questions to quiz
7. Publish quiz when ready

### Workflow 2: Review Student Performance
1. Navigate to Results
2. Select session
3. Click "View Quiz Results" on course
4. Click "View Statistics" on specific quiz
5. Review student scores table
6. Check average performance

### Workflow 3: Update Course Materials
1. Navigate to Course Content → Your course
2. Expand relevant module
3. Click Edit icon on unit
4. Update content
5. Click "Update Unit"

### Workflow 4: Create Quiz Bank
1. Create multiple quizzes for different modules
2. Navigate to Quizzes page
3. Search and filter to manage all quizzes
4. View statistics across all assessments

---

## Tips & Best Practices

### ✅ Content Creation
- **Use descriptive titles** for modules and units
- **Add descriptions** to help students understand content
- **Order units logically** using the order field
- **Save drafts** before publishing

### ✅ Quiz Design
- **Start with draft status** while building
- **Test quizzes** before publishing
- **Use meaningful point values**
- **Provide clear question text**
- **Check correct answers** before saving
- **Mix question types** for better assessment

### ✅ Performance Monitoring
- **Check quiz stats regularly**
- **Look for patterns** in student performance
- **Identify difficult questions** from low scores
- **Update content** based on results

### ✅ Organization
- **Use consistent naming** for modules
- **Group related units** in same module
- **Create quizzes per module** for better tracking
- **Archive old content** rather than deleting

---

## Keyboard Shortcuts

- `Esc` - Close any open dialog
- `Ctrl/Cmd + F` - Focus search bar (when available)
- `Enter` - Submit forms
- `Tab` - Navigate form fields

---

## Troubleshooting

### Quiz Won't Save
- ✓ Check all questions have text
- ✓ Verify all options are filled in
- ✓ Ensure at least one correct answer per question
- ✓ Check network connection

### Unit Video Not Uploading
- ✓ Check file size (max depends on server)
- ✓ Verify video format is supported
- ✓ Check network connection
- ✓ Wait for progress to complete

### Can't See Quiz Statistics
- ✓ Verify quiz has been attempted by students
- ✓ Check quiz is published
- ✓ Ensure students have submitted attempts

### Content Not Loading
- ✓ Verify session is selected
- ✓ Check course has content
- ✓ Refresh the page
- ✓ Check browser console for errors

---

## Support Features

### Search Functionality
- Available on: Course Content, Quizzes, Results, Exams
- Searches: Titles, course codes
- Real-time filtering as you type

### Session Management
- "Change Session" button on all pages
- Filters all content by academic year
- Persists during navigation

### Confirmation Dialogs
- All delete operations require confirmation
- Prevents accidental data loss
- Shows what will be deleted

### Loading States
- Skeleton loaders during data fetch
- Progress bars for uploads
- Prevents duplicate submissions

---

## Feature Availability Matrix

| Feature | Course Content | Quizzes | Results | Exams |
|---------|---------------|---------|---------|-------|
| Create | ✅ | ✅ | ❌ | ✅ |
| Edit | ✅ | ✅ | ❌ | ✅ |
| Delete | ✅ | ✅ | ❌ | ✅ |
| View | ✅ | ✅ | ✅ | ✅ |
| Search | ✅ | ✅ | ✅ | ✅ |
| Statistics | ❌ | ✅ | ✅ | ✅ |
| Export | ❌ | ❌ | ❌ | ❌ |

---

## Need Help?

1. **Check the Implementation Guide** for technical details
2. **Review API documentation** in the codebase
3. **Check browser console** for error messages
4. **Verify permissions** for your role
5. **Contact system administrator** for access issues

---

**Last Updated:** December 8, 2025
**Version:** 1.0

