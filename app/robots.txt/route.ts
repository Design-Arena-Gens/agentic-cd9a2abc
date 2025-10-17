export async function GET() {
  return new Response(
    [
      'User-agent: *',
      'Allow: /',
      'Sitemap: https://agentic-cd9a2abc.vercel.app/sitemap.xml',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain' } }
  );
}
