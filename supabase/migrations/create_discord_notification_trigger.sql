-- Enable pg_net extension (Supabase's recommended HTTP client)
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create Discord notification function using pg_net
CREATE OR REPLACE FUNCTION notify_discord_comment()
RETURNS TRIGGER
security definer
AS $$
DECLARE
  webhook_url TEXT := '<DISCORD_WEBHOOK_URL>';
  payload JSONB;
  request_id BIGINT;
BEGIN
  -- Build the Discord webhook payload
  payload := jsonb_build_object(
    'content', '📝 **New Guest Book Comment!**',
    'embeds', jsonb_build_array(
      jsonb_build_object(
        'title', 'Comment from ' || NEW.name,
        'description', NEW.message,
        'color', 3447003, -- Blue color
        'fields', jsonb_build_array(
          jsonb_build_object('name', 'Email', 'value', COALESCE(NEW.email, 'Not provided'), 'inline', true),
          jsonb_build_object('name', 'Website', 'value', COALESCE(NEW.website, 'Not provided'), 'inline', true),
          jsonb_build_object('name', 'Time', 'value', NEW.created_at::text, 'inline', true),
          jsonb_build_object('name', 'Anonymous', 'value', CASE WHEN NEW.is_anonymous THEN 'Yes' ELSE 'No' END, 'inline', true)
        ),
        'footer', jsonb_build_object('text', 'trungtmnguyen.com'),
        'timestamp', NEW.created_at::text
      )
    )
  );

  -- Send HTTP POST request using pg_net
  SELECT INTO request_id
    net.http_post(
      webhook_url,
      payload,
      '{}'::jsonb,
      '{"Content-Type": "application/json"}'::jsonb
    );

  -- Log the request ID for debugging (optional)
  RAISE NOTICE 'Discord webhook request sent with ID: %', request_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS trigger_discord_notification ON public.guestbook;

-- Create trigger on guestbook table
CREATE TRIGGER trigger_discord_notification
  AFTER INSERT ON public.guestbook
  FOR EACH ROW
  EXECUTE FUNCTION notify_discord_comment();
