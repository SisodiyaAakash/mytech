# Project Name: Mytech

## Overview

Mytech is dashboard created for the practical purpose for the **AMRYTT MEDIA LLC**.

---

## Features

### Completed Features

1. **Dashboard Page**

   - Displays an overview of key metrics (e.g., revenue, sales, etc.).
   - Includes interactive charts (line and doughnut charts) using **Chart.js**.
   - Configured shadows, fonts, and styling using **Tailwind CSS**.

2. **Product Listing Page**

   - Lists products with support for pagination.
   - Filters products based on category, price, status, Sorting of the columns with Edit Column with show/hide.
   - Export functionality to download selected products as a CSV file.
   - Edit and Add functionality integrated with **localStorage** to manage the existing or new product.

3. **Routing**

   - Configured routing for the product listing and edit pages & added 404 page as well.

4. **Responsive Design**
   - Fully responsive UI using **Tailwind CSS**.

---

### Pending Features

1. **Dashboard Enhancements**

   - Render **Top Products** and **Top Categories** of the month.
   - Display **Recent Orders** and **Customer Growth**.
   - Data for these features is already structured in `products.json` but not yet rendered because of lack of time to manage the json for them.

2. **Global Search**

   - Develop the search functionality to query across multiple data fields.

3. **Edit Page**
   - As the project uses **localStorage** for edit product page and add product page, data changes are device-specific and not synced across devices. Clearing cookies or site data will reset the application state, also due to lack of time I've missed few data like media upload, added date and tags

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Chart.js](https://www.chartjs.org/)
- **Deployment**: [Vercel](https://vercel.com/)
- **@dnd-kit/core**
- **@dnd-kit/sortable**

---

## Project Setup

To run the project locally, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/SisodiyaAakash/mytech.git
   cd mytech
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## Directory Structure

```
├── public/
│   ├── categories/     # Categories icon from figma
│   ├── custom-icons/   # Custom icons from figma
│   ├── fonts/          # Theme font as figma
│   ├── icons/          # Basic icons from figma
│   ├── json/           # JSON files (products.json, dashboard.json, menu.json)
├── app/
│   ├── comp/           # Common components
│   │   ├── header.js   # Header component
│   │   └── sidebar.js  # Sidebar component
│   ├── products/       # Product related pages
│   │   ├── page.js     # Product listing page
│   │   └── edit/
│   │       └── page.js # Edit page (For add or edit product)
│   ├── favicon.ico     # Favicon from figma
│   ├── globals.css     # Global styling configuration with Tailwind
│   ├── layout.js/      # Global layout file
│   ├── not-found.js/   # 404 page (With my signature and Git repository link)
│   └── page.js/        # Dashboard page
├── tailwind.config.js  # Tailwind configuration
└── README.md           # Project documentation
└── ...                 # And few more configuration and other files
```

---

## Data Structure

### `dashboard.json`

- **overview**: Contains the data for the Overview row in the first row of the dashboard
- **target**: Contains the data for the Target chart
- **Statistics**: Contains the data for the Statisics chart for revenue and sales
- **salesSource**: Contains the source of sales chart

### `menu.json`

- Contains the data for the menu

### `products.json`

- **Products**: Contains an array of product details including ID, name, category, and more details.
- **Categories**: Maps category IDs to names.
- **Product Status**: Maps status IDs to human-readable names.
- **Orders**: Contains orders with customer details.

---

## Deployment

The project is hosted on **Vercel** for live preview and continuous deployment. Changes pushed to the repository are automatically deployed to the live environment.
Binita Ma'am I've impletemented few functionalities in last three commits to manage the data with localstorage for the edit product it was working fine but giving error at build time so due to lack of time I've not resolved those error in last three build in the Vercel however it was working correctly in the dev environment as it was on client side so I've still pushed the last three commits
I'll fix those build time error in last 3 commits soon

### Live URL

[mytech](https://github.com/SisodiyaAakash/mytech)

---

## Acknowledgement

This project was built as part of an exciting challenge provided by **Binita** and **HR Ma’am**. Thank you for this amazing learning opportunity!

---

## Author

**Aakash Sisodiya**

Looking forward to your feedback and updates!
