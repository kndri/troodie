// Supabase Edge Function for handling share redirects
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const pathParts = url.pathname.split('/')
    
    // Extract content type and ID from path
    // Expected format: /share-redirect/board/uuid or /share-redirect/post/uuid
    const contentType = pathParts[2]
    const contentId = pathParts[3]

    if (!contentType || !contentId) {
      return new Response(
        JSON.stringify({ error: 'Invalid share URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check user agent to determine if it's a bot (for previews) or regular user
    const userAgent = req.headers.get('user-agent') || ''
    const isBot = /bot|crawler|spider|facebook|twitter|whatsapp|telegram/i.test(userAgent)

    if (isBot) {
      // Return Open Graph meta tags for rich previews
      const html = await generateOpenGraphHTML(contentType, contentId)
      return new Response(html, {
        headers: { ...corsHeaders, 'Content-Type': 'text/html' },
      })
    }

    // For regular users, redirect based on platform
    const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent)
    
    if (isMobile) {
      // Try to open in app first
      const deepLink = `troodie://${contentType}s/${contentId}`
      const appStoreUrl = userAgent.includes('iPhone') 
        ? 'https://apps.apple.com/app/troodie/id1234567890'
        : 'https://play.google.com/store/apps/details?id=com.troodie.app'
      
      // Use a meta refresh to try app first, then redirect to store
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta http-equiv="refresh" content="0; url=${deepLink}">
          <script>
            setTimeout(function() {
              window.location = "${appStoreUrl}";
            }, 2500);
          </script>
        </head>
        <body>
          <p>Opening in Troodie app...</p>
        </body>
        </html>
      `
      return new Response(html, {
        headers: { ...corsHeaders, 'Content-Type': 'text/html' },
      })
    }

    // For desktop, redirect to marketing page or web app
    return Response.redirect('https://troodie.app/download', 302)
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function generateOpenGraphHTML(contentType: string, contentId: string): Promise<string> {
  // In production, fetch actual content from database
  // For now, return generic template
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Troodie - Discover Amazing Restaurants</title>
      <meta property="og:title" content="Check out this on Troodie">
      <meta property="og:description" content="Discover amazing restaurants with your friends">
      <meta property="og:image" content="https://troodie.app/og-image.png">
      <meta property="og:url" content="https://troodie.app/${contentType}s/${contentId}">
      <meta property="og:type" content="website">
      <meta name="twitter:card" content="summary_large_image">
    </head>
    <body>
      <script>
        window.location.href = 'troodie://${contentType}s/${contentId}';
      </script>
    </body>
    </html>
  `
}