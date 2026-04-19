export async function GET(
  request: Request,
  context: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await context.params;

    const backendResponse = await fetch(`http://127.0.0.1:8000/status/${jobId}`);
    const data = await backendResponse.json();

    return Response.json(data, { status: backendResponse.status });
  } catch (error) {
    return Response.json(
      { error: "Status proxy failed", details: String(error) },
      { status: 500 }
    );
  }
}