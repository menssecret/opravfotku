export async function POST(request: Request) {
  try {
    const incomingFormData = await request.formData();
    const file = incomingFormData.get("file");

    if (!(file instanceof File)) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const newFormData = new FormData();
    newFormData.append("file", file, file.name);

    const backendResponse = await fetch("http://127.0.0.1:8000/upload", {
      method: "POST",
      body: newFormData,
    });

    const text = await backendResponse.text();
    console.log("BACKEND STATUS:", backendResponse.status);
    console.log("BACKEND BODY:", text);

    return new Response(text, {
      status: backendResponse.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("UPLOAD PROXY ERROR:", error);

    return Response.json(
      {
        error: "Upload proxy failed",
        details: String(error),
      },
      { status: 500 }
    );
  }
}