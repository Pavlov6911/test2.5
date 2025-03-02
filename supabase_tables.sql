-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    profile_picture TEXT,
    bio TEXT,
    theme TEXT DEFAULT 'light',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Mods Table
CREATE TABLE mods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    author_id UUID NOT NULL REFERENCES users(id),
    version TEXT NOT NULL,
    downloads INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Ratings Table
CREATE TABLE ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mod_id UUID NOT NULL REFERENCES mods(id),
    user_id UUID NOT NULL REFERENCES users(id),
    rating INTEGER NOT NULL,
    review TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX idx_mods_author_id ON mods (author_id);
CREATE INDEX idx_ratings_mod_id ON ratings (mod_id);
CREATE INDEX idx_ratings_user_id ON ratings (user_id);

-- Optional: Enable Row Level Security (RLS) for enhanced security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE mods ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Example RLS policies (adjust according to your needs)
-- Allow users to read their own data
CREATE POLICY "Users can read their own data" ON users FOR SELECT TO authenticated USING (auth.uid() = id);

-- Allow users to update their own data
CREATE POLICY "Users can update their own data" ON users FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Allow authenticated users to insert mods
CREATE POLICY "Authenticated users can insert mods" ON mods FOR INSERT TO authenticated WITH CHECK (true);

-- Allow users to read all mod data
CREATE POLICY "Users can read all mod data" ON mods FOR SELECT TO public USING (true);

-- Allow users to rate mods
CREATE POLICY "Users can rate mods" ON ratings FOR INSERT TO authenticated WITH CHECK (true);

-- Allow users to see all ratings
CREATE POLICY "Users can see all ratings" ON ratings FOR SELECT TO public USING (true);

-- extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
