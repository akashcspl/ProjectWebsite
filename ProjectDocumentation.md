Project Documentation — React Project (Aggregate Banking System)

Version 1.0
Author: Akash Agarwal and Nagarajan Ramesh and Yaeshwanth V

Type: Full Functional & Technical Overview

1. Project Overview
  1.1 Name

React Project – Aggregate Banking Software

  1.2 Summary

The application is an aggregate banking platform designed to allow users to perform all essential banking tasks in one centralized location. Instead of visiting multiple banks—each with their own interfaces, portals, or physical paper-based processes—users can access and manage every banking service through a unified interface.

  1.3 Users

The system supports two primary user roles:

Customer/User

Administrator

  1.4 Problem Statement

Modern banking requires interacting with multiple banks, physical branches, and complex processes, which leads to wasted time, repetitive document submissions, and inconsistencies.

This system solves these challenges by offering:

A single unified portal for all banking operations

Drastically reduced time and effort

Streamlined processes (no repeated paperwork)

Faster onboarding, account management, and transaction handling


2. Technology Stack
  2.1 Frontend

React.js

Bootstrap 5

Custom CSS
Used to create a responsive, modern, and intuitive user interface.

  2.2 Backend

JSON-Server
Used as a mock backend to store and serve JSON-based data for users, accounts, banks, branches, and transactions.

  2.3 Database

SQL Server
Used for structured banking data persistence, especially for accounts, transactions, and financial information.

  2.4 External APIs

None

3. Core Features & Modules
  3.1 Authentication Module
Login / Signup

Users can:

Register using an email, password, PAN number, Aadhaar number, and date of birth

Log in securely using JWT tokens

Access restricted features only after authentication

Logout session securely

  3.2 User Features
a. Home Page

A welcoming landing page presenting project features, navigation, and key CTA elements.

b. About Us

Explains the purpose, mission, and value proposition of the application.

c. Contact Us

Allows users to reach out to administrators for assistance, support, and queries.

d. FAQs

A list of commonly asked questions to help users understand functionality and policies.

e. View Transactions

Users can see:

Deposits

Withdrawals

Transfers

Account-specific transaction histories

f. Perform Transactions

Users can:

Deposit money

Withdraw money

Transfer money between any two accounts

g. Account Management

Users can:

View all their accounts

Send a request for opening a new account

Send a request for closing an existing account

h. Logout

Terminates the current JWT-authenticated session.

  3.3 Admin Features
a. Bank Management

Admins can:

View all registered banks

Create a new bank

Close/delete existing banks

b. Branch Management

Admins can:

View bank branches

Open new branches

Close existing branches

c. Account Approval

Admins can:

Approve or reject new account opening requests

Approve or reject account closure requests

  3.4 General Features
404 Page

A user-friendly page shown when the user navigates to an invalid or undefined route.


4. Architecture Overview

Although full architecture diagrams were not provided, the system follows a typical three-tier architecture, described below.

4.1 High-Level Architecture

1. Frontend Layer (Client)

React application

Communicates with backend through REST APIs

Maintains JWT tokens for session authentication

2. Backend Layer (API / JSON-Server)

Acts as a REST data provider

Stores data in JSON files

Handles CRUD operations for users, accounts, banks, branches, and transactions

3. Database Layer (SQL Server)

Stores structured financial data

May be accessed through backend services (planned future integration)

4.2 Authentication Flow

Users log in via POST request

Backend returns a JWT token

Token is stored via React Context or localStorage

Protected routes are accessible only when authenticated

Token is cleared during logout

5. UI Components / Pages

The application includes the following pages:

1. Login Page

User authentication form with email and password.

2. Signup Page

Includes fields for:

Email

Password + Confirm Password

PAN

Aadhaar

Date of Birth

3. Home Page

High-level overview

Carousels, CTAs, info sections

“Join Us” and “Talk to Us” cards

4. About Us Page

Describes the mission and purpose of the platform.

5. Contact Us Page

Includes message text + navigates to contact form.

6. FAQs Page

Accordion-style question/answer UI.

7. User Pages

View transactions

Withdraw / deposit / transfer forms

Accounts list

Requests for opening/closing accounts

8. Admin Pages

View all banks

Manage banks

Manage branches

Approve/deny account requests

9. 404 Page

Custom page for broken links.
