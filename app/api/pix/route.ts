export async function GET() {
  return Response.json({ key: process.env.PIX_KEY ?? "" });
}