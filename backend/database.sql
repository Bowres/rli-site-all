CREATE DATABASE livepace_db;

\c livepace_db;

CREATE TABLE consultations (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    city VARCHAR(50) NOT NULL,
    project_type VARCHAR(50) NOT NULL,
    preferred_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create table for estimate requests
CREATE TABLE estimate_requests (
  id SERIAL PRIMARY KEY,
  floorplan VARCHAR(50) NOT NULL,
  purpose VARCHAR(50) NOT NULL,
  requirements JSONB NOT NULL,
  name VARCHAR(100) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  updates_on_whatsapp BOOLEAN DEFAULT false,
  possession VARCHAR(50),
  location VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);