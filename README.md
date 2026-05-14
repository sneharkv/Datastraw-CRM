# Datastraw CRM — Customer Support Ticketing System

A fully functional web-based Customer Support Management System built with Google Apps Script, Google Sheets, and vanilla HTML/CSS/JavaScript.

## Live Demo
Web url : <a href="https://script.google.com/macros/s/AKfycbxiwHvEuI7zWGE8jcmd7ktcWaEp-2gHQVgIrih3CRvQe3NsgWNolj4ItTVde97TD9g5/exec"> Datastraw CRM </a>

## Project Overview

Datastraw CRM is a customer support ticketing system that allows support teams to manage customer issues efficiently. It integrates Google Sheets as a database, Google Apps Script as the backend, and a professional HTML/CSS/JavaScript frontend — all deployed as a Google Apps Script web application.

## Dashboard 
 <img width="1366" height="605" alt="image" src="https://github.com/user-attachments/assets/62da55ca-0343-4b9a-b855-4587dcebf5ee" />

 ### 1. Viewing a Ticket:
 <img width="689" height="390" alt="image" src="https://github.com/user-attachments/assets/27818dd6-4ca0-40cd-b77e-a37091c03b25" />

 ### 2. Creating a Ticket: 
 <img width="576" height="493" alt="image" src="https://github.com/user-attachments/assets/2cecf6bb-c81d-4fe5-b27a-e8a9e3d6d966" />

 ### 3. Editing a Ticket:
 <img width="680" height="422" alt="image" src="https://github.com/user-attachments/assets/2fa27345-9c45-4870-80e1-94889a8a5ef6" />

##  Features

- **Ticket Management** — Create, view, edit, and delete support tickets
- **Smart Search** — Search tickets by name, ticket ID, phone, email, or order ID
- **Filter System** — Filter tickets by status and communication channel
- **Status Tracking** — Pending, In Progress, Waiting on Customer, Waiting on Third Party, Resolved
- **Channel Management** — WhatsApp, Instagram, Facebook, Emails, Calls
- **Order Integration** — Link tickets to orders and view order details
- **Team Assignment** — Assign tickets to team members
- **Dashboard Stats** — Live count of tickets by status
- **Insights Panel** — Quick view of ticket details in the right panel
- **Color Coded Badges** — Visual status indicators for quick scanning
- **Responsive UI** — Professional three panel interface

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| Backend | Google Apps Script (JavaScript) |
| Database | Google Sheets |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Deployment | Google Apps Script Web App |

---

## 📊 Google Sheets Structure

The database consists of three sheets:

### Tickets Sheet
| Column | Field | Description |
|--------|-------|-------------|
| A | TicketID | Auto-generated unique ID (TKT0001) |
| B | CustomerName | Full name of the customer |
| C | Email | Customer email address |
| D | Phone | Customer phone number |
| E | Channel | Communication channel |
| F | Status | Current ticket status |
| G | Priority | Low / Medium / High / Critical |
| H | IssueDescription | Detailed description of the issue |
| I | QueryTheme | Category of the issue |
| J | ActionTaken | Steps taken to resolve |
| K | AssignedTo | Team member assigned |
| L | EscalationLevel | None / Low / Medium / High / Critical |
| M | OrderID | Linked order ID |
| N | CreatedAt | Timestamp of creation |
| O | UpdatedAt | Timestamp of last update |
| P | ResolutionNotes | Final resolution details |
| Q | ChatTranscript | Conversation transcript |
| R | Attachments | File attachments |

### Orders Sheet
| Column | Field |
|--------|-------|
| A | OrderID |
| B | CustomerName |
| C | Email |
| D | Phone |
| E | ProductName |
| F | OrderStatus |
| G | OrderDate |
| H | OrderAmount |

### Team Sheet
| Column | Field |
|--------|-------|
| A | MemberID |
| B | MemberName |
| C | Department |
| D | Email |

---

## ⚙️ Backend API Functions

| Function | Description |
|----------|-------------|
| `doGet(e)` | Serves the HTML frontend |
| `getAllData()` | Fetches tickets, team members and stats in one call |
| `createTicket(data)` | Creates a new ticket with auto-generated ID |
| `updateTicket(ticketID, data)` | Updates an existing ticket by ID |
| `deleteTicket(ticketID)` | Deletes a ticket by ID |
| `getOrderByID(orderID)` | Fetches order details linked to a ticket |

---

## 🚀 Deployment Instructions

### Step 1 — Set up Google Sheets
1. Create a new Google Spreadsheet
2. Create three tabs: `Tickets`, `Orders`, `Team`
3. Add column headers as shown in the schema above
4. Note your Spreadsheet ID from the URL

### Step 2 — Set up Google Apps Script
1. Open your Google Sheet
2. Go to **Extensions → Apps Script**
3. Delete the default code
4. Paste the contents of `Code.gs`
5. Replace the Sheet ID in `getSpreadsheet()` with your own
6. Create a new HTML file named `index`
7. Paste the contents of `index.html`

### Step 3 — Deploy
1. Click **Deploy → New Deployment**
2. Select type: **Web App**
3. Set **Execute as: Me**
4. Set **Who has access: Anyone**
5. Click **Deploy** and copy the URL

---

## 📈 Performance Optimization

- **Single API call** — All data (tickets, team, stats) fetched in one `getAllData()` request
- **Client-side filtering** — Search and filter run in the browser, no extra server calls
- **Batch reads** — `getDataRange().getValues()` fetches all data in one operation
- **Scalable architecture** — Supports 1000-5000 tickets as Google Sheets holds up to 10 million cells

---

## ⚠️ Known Limitations

- Google Apps Script has a cold start delay of 5-10 seconds on initial load
- No real-time updates — page must be refreshed to see changes made by other users
- File attachments require Google Drive API integration (not implemented in v1)
- No role-based access control in current version

  ## 👤 Submitted By

**Name:** Sneha Vishwakrma  
**Email:** sneharkv2710@gmail.com
**Position:** AI + Tech Intern — Datastraw Technologies


 
