-- Create guestbook_reactions table
CREATE TABLE IF NOT EXISTS guestbook_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guestbook_id UUID NOT NULL REFERENCES guestbook(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- Made optional for anonymous users
  session_id TEXT, -- For tracking anonymous users
  emoji TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Ensure one reaction per user/session per emoji per guestbook entry
  CONSTRAINT unique_user_reaction UNIQUE(guestbook_id, user_id, emoji),
  CONSTRAINT unique_session_reaction UNIQUE(guestbook_id, session_id, emoji),
  -- Ensure either user_id or session_id is provided
  CONSTRAINT check_user_or_session CHECK (
    (user_id IS NOT NULL AND session_id IS NULL) OR
    (user_id IS NULL AND session_id IS NOT NULL)
  )
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_guestbook_reactions_guestbook_id ON guestbook_reactions(guestbook_id);
CREATE INDEX IF NOT EXISTS idx_guestbook_reactions_user_id ON guestbook_reactions(user_id);
CREATE INDEX IF NOT EXISTS idx_guestbook_reactions_session_id ON guestbook_reactions(session_id);
CREATE INDEX IF NOT EXISTS idx_guestbook_reactions_emoji ON guestbook_reactions(emoji);

-- Enable Row Level Security (RLS)
ALTER TABLE guestbook_reactions ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Allow anyone to read all reactions
CREATE POLICY "Anyone can view reactions" ON guestbook_reactions
  FOR SELECT USING (true);

-- Allow anyone to insert reactions (authenticated users use user_id, anonymous use session_id)
CREATE POLICY "Anyone can insert reactions" ON guestbook_reactions
  FOR INSERT WITH CHECK (
    (auth.uid() IS NOT NULL AND user_id = auth.uid() AND session_id IS NULL) OR
    (auth.uid() IS NULL AND user_id IS NULL AND session_id IS NOT NULL)
  );

-- Allow users to delete their own reactions (both authenticated and anonymous)
CREATE POLICY "Users can delete own reactions" ON guestbook_reactions
  FOR DELETE USING (
    (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
    (auth.uid() IS NULL AND user_id IS NULL)
  );

-- Create a function to automatically clean up reactions when guestbook entries are deleted
CREATE OR REPLACE FUNCTION clean_up_reactions()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM guestbook_reactions WHERE guestbook_id = OLD.id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically clean up reactions
CREATE TRIGGER trigger_clean_up_reactions
  BEFORE DELETE ON guestbook
  FOR EACH ROW
  EXECUTE FUNCTION clean_up_reactions();
