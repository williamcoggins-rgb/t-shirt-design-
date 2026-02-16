-- Run this in your Supabase SQL Editor to set up cloud storage for designs
-- Go to: https://supabase.com/dashboard → Your Project → SQL Editor

-- 1. Create the designs table
CREATE TABLE IF NOT EXISTS designs (
  id TEXT PRIMARY KEY,
  prompt TEXT NOT NULL,
  category TEXT NOT NULL,
  style TEXT,
  model TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  seed BIGINT,
  has_transparent_bg BOOLEAN NOT NULL DEFAULT FALSE,
  is_upscaled BOOLEAN NOT NULL DEFAULT FALSE
);

-- 2. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_designs_created_at ON designs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_designs_category ON designs (category);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE designs ENABLE ROW LEVEL SECURITY;

-- 4. Create a policy that allows all operations (public access)
-- For a production app with user auth, replace this with user-specific policies
CREATE POLICY "Allow all operations on designs"
  ON designs FOR ALL
  USING (true)
  WITH CHECK (true);

-- 5. Create the storage bucket for design images
INSERT INTO storage.buckets (id, name, public)
VALUES ('design-images', 'design-images', true)
ON CONFLICT (id) DO NOTHING;

-- 6. Allow public access to the storage bucket
CREATE POLICY "Allow public uploads to design-images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'design-images');

CREATE POLICY "Allow public reads from design-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'design-images');

CREATE POLICY "Allow public updates to design-images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'design-images');

CREATE POLICY "Allow public deletes from design-images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'design-images');
