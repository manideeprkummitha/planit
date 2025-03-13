// app/api/notifications/route.js
export async function POST(request) {
    try {
      const body = await request.json();
      
      // Forward the request to your message queue service
      const response = await fetch('http://localhost:3001/api/test-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });
      
      // Get the response from the message queue service
      const data = await response.json();
      
      // Return the response to the client
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error forwarding to message queue:', error);
      return new Response(JSON.stringify({ error: 'Failed to send notification' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }