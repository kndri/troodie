-- Migration: Add Share Functionality
-- Date: 2025-01-30
-- Description: Add share analytics tracking and share counts to content tables

-- Create share analytics table
CREATE TABLE IF NOT EXISTS public.share_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  content_type VARCHAR NOT NULL CHECK (content_type IN ('board', 'post', 'profile', 'restaurant')),
  content_id UUID NOT NULL,
  action VARCHAR NOT NULL CHECK (action IN ('initiated', 'completed')),
  platform VARCHAR CHECK (platform IN ('ios', 'android', 'web')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add share count columns to content tables
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS shares_count INTEGER DEFAULT 0;

ALTER TABLE public.boards 
ADD COLUMN IF NOT EXISTS share_count INTEGER DEFAULT 0;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_share_analytics_content 
ON public.share_analytics(content_type, content_id);

CREATE INDEX IF NOT EXISTS idx_share_analytics_user 
ON public.share_analytics(user_id);

CREATE INDEX IF NOT EXISTS idx_share_analytics_created 
ON public.share_analytics(created_at DESC);

-- Create function to increment share count
CREATE OR REPLACE FUNCTION increment_share_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Only increment on 'completed' shares
  IF NEW.action = 'completed' THEN
    -- Update the appropriate table based on content_type
    CASE NEW.content_type
      WHEN 'post' THEN
        UPDATE public.posts 
        SET shares_count = shares_count + 1 
        WHERE id = NEW.content_id;
      WHEN 'board' THEN
        UPDATE public.boards 
        SET share_count = share_count + 1 
        WHERE id = NEW.content_id;
      ELSE
        -- Profile and restaurant shares are tracked but don't have counts
        NULL;
    END CASE;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically increment share counts
CREATE TRIGGER trigger_increment_share_count
AFTER INSERT ON public.share_analytics
FOR EACH ROW
EXECUTE FUNCTION increment_share_count();

-- RLS Policies for share_analytics
ALTER TABLE public.share_analytics ENABLE ROW LEVEL SECURITY;

-- Users can insert their own share events
CREATE POLICY "Users can create share analytics"
ON public.share_analytics
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can view their own share analytics
CREATE POLICY "Users can view own share analytics"
ON public.share_analytics
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Anyone can view aggregated share counts (through the posts/boards tables)
-- No additional policy needed as those are handled by existing RLS

-- Grant permissions
GRANT INSERT, SELECT ON public.share_analytics TO authenticated;
GRANT USAGE ON SEQUENCE share_analytics_id_seq TO authenticated;

-- Add comment
COMMENT ON TABLE public.share_analytics IS 'Tracks share events for analytics and engagement metrics';
COMMENT ON COLUMN public.share_analytics.action IS 'initiated = share dialog opened, completed = share action completed';
COMMENT ON COLUMN public.posts.shares_count IS 'Total number of completed shares for this post';
COMMENT ON COLUMN public.boards.share_count IS 'Total number of completed shares for this board';