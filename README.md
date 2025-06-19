# 📝 Notes App (SvelteKit)

A simple yet elegant note-taking application built with **SvelteKit**, supporting features like:

- ✍️ Add, edit, and delete notes
- 🌗 Light & dark theme toggle
- 🔍 Search notes by title
- 📥 Download all notes as a `.txt` file
- ⏳ Loading spinner while fetching
- 📱 Responsive design
- ✅ Delete confirmation message

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)

### Installation

```bash
git clone https://github.com/himani1001/Notes-app.git
cd Notes-app
npm install
npm run dev

⚖️ Trade-offs & Assumptions
ID handling: The id of each note is not shown in the UI — it is only used internally in the API and data handling logic.

Message placement: The "note deleted" message is not bound to a specific note card, and may appear anywhere in the list temporarily.

Simplicity over complexity: A minimal, clean UI/UX was prioritized over complex animations or heavy feature sets to keep the app performant and understandable.

⏳ What I'd Do with More Time
📅 Calendar View: Display notes by day, showing titles on their respective dates.

📊 Monthly Stats: Track how many notes were created per month.

⏰ Note Timestamps: Include exact time when a note was added.

🔔 Deadline Notifications: Add reminders or due-date tracking for notes.

📝 Rich Text Editor: Support formatting (bold, italic, lists, code blocks, etc.) within notes for a better writing experience.