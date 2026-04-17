## Data Models

### User

- id (uuid)

- business_name (string)

- category (string)

- suburb (string)

- email (string)

- phone (string)

- status (enum: lead, booked, closed)

- created_at (datetime)

### OutreachEvent

- id (uuid)

- user_id (uuid)

- variant_id (uuid)

- sent_at (datetime)

- opened (boolean)

- replied (boolean)

- booked (boolean)

- metadata (json)

### Variant

- id (uuid)

- name (string)

- content (text)

- frequency_multiplier (int)

- performance_score (float)

### CycleLog

- id (uuid)

- cycle_number (int)

- started_at (datetime)

- completed_at (datetime)

- kpi_snapshot (json)

- strategy_changes (json)

### RevenueRecord

- id (uuid)

- user_id (uuid)

- tier (enum: 497, 1497, 97mo)

- amount (float)

- created_at (datetime)

### SEOPhaseProgress

- id (uuid)

- user_id (uuid)

- phase (enum: gbp, citations, reviews, velocity, aeo)

- status (enum: pending, in_progress, complete)

- updated_at (datetime)
