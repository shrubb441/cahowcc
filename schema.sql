-- Jobs table for clients posting job opportunities
CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    budget_min INTEGER,
    budget_max INTEGER,
    budget_type TEXT DEFAULT 'fixed', -- 'fixed' or 'hourly'
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT,
    location TEXT DEFAULT 'Bermuda',
    duration TEXT,
    skills_required TEXT,
    status TEXT DEFAULT 'open', -- 'open', 'closed', 'filled'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Services table for freelancers/companies posting their services
CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    price_min INTEGER,
    price_max INTEGER,
    price_type TEXT DEFAULT 'project', -- 'project', 'hourly', 'daily'
    provider_name TEXT NOT NULL,
    provider_email TEXT NOT NULL,
    provider_phone TEXT,
    company_name TEXT,
    website TEXT,
    skills TEXT,
    portfolio_links TEXT,
    years_experience INTEGER,
    availability TEXT DEFAULT 'available', -- 'available', 'limited', 'unavailable'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Inquiries table for connecting clients and service providers
CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    inquiry_type TEXT NOT NULL, -- 'job' or 'service'
    reference_id INTEGER NOT NULL, -- job_id or service_id
    sender_name TEXT NOT NULL,
    sender_email TEXT NOT NULL,
    sender_phone TEXT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_created ON jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_availability ON services(availability);
CREATE INDEX IF NOT EXISTS idx_services_created ON services(created_at DESC);
