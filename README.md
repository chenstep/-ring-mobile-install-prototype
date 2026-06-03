# Ring Mobile Security Tower - Professional Installation Request

A prototype of the Amazon professional installation request form for Ring Mobile Security Tower products.

## Overview

This is a static HTML/CSS/JS prototype that simulates the installation request flow for Ring Mobile Security Tower devices. It follows Amazon's design language and includes a multi-step form with validation.

## Features

- 4-step form wizard (Customer Info → Installation Details → Device & Contacts → Review & Submit)
- Pre-filled customer information from Amazon Business account
- Installation location type selection with "Other" text entry
- 8 device configuration options (base, solar, trailer, iLOQ combinations)
- Optional onsite point-of-contact fields
- Form validation with error states
- Review step before submission
- Success confirmation state
- Responsive design (desktop + mobile)
- Amazon-style navigation and footer

## Running Locally

Simply open `index.html` in a browser — no build tools or server required.

Or use any static file server:

```bash
npx serve .
# or
python -m http.server 8000
```

## Form Fields

### Pre-filled from Amazon Business Account
- Customer Name
- Customer Email
- Customer Phone
- Purchase Date
- Order Number

### Installation Details
- Installation Address
- Location Type (Parking Lot / Construction Site / Event Venue / Other)

### Device Type (choose 1)
- Ring Mobile Security Tower
- Ring Mobile Security Tower + Solar Kit
- Ring Mobile Security Tower + Trailer Kit
- Ring Mobile Security Tower + Trailer Kit + Solar Kit
- Ring Mobile Security Tower w/ iLOQ
- Ring Mobile Security Tower w/ iLOQ + Solar Kit
- Ring Mobile Security Tower w/ iLOQ + Trailer Kit
- Ring Mobile Security Tower w/ iLOQ + Trailer Kit + Solar Kit

### Optional Fields
- Ring Account Email
- Onsite Point-of-Contact (Name, Email, Phone)

## Tech Stack

- HTML5
- CSS3 (no frameworks)
- Vanilla JavaScript
- No dependencies
