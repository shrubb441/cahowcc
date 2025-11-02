// API endpoint for inquiries

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();

    // Validate required fields
    if (!data.inquiry_type || !data.reference_id || !data.sender_name ||
        !data.sender_email || !data.message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verify the reference exists
    let table = data.inquiry_type === 'job' ? 'jobs' : 'services';
    const { results } = await context.env.DB.prepare(
      `SELECT id FROM ${table} WHERE id = ?`
    ).bind(data.reference_id).all();

    if (results.length === 0) {
      return new Response(JSON.stringify({ error: 'Reference not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await context.env.DB.prepare(
      `INSERT INTO inquiries (inquiry_type, reference_id, sender_name, sender_email,
       sender_phone, message)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(
      data.inquiry_type,
      data.reference_id,
      data.sender_name,
      data.sender_email,
      data.sender_phone || null,
      data.message
    ).run();

    return new Response(JSON.stringify({
      success: true,
      id: result.meta.last_row_id,
      message: 'Inquiry sent successfully'
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
