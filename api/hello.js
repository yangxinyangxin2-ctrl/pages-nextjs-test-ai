export async function GET(request) {
  return Response.json({
    message: "Hello from IGA Pages!！！",
    timestamp: new Date().toISOString(),
  });
}
