// API endpoint for jobs

export async function onRequestGet(context) {
  try {
    const { searchParams } = new URL(context.request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status') || 'open';

    let query = 'SELECT * FROM jobs WHERE status = ?';
    let params = [status];

    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY created_at DESC LIMIT 50';

    const { results } = await context.env.DB.prepare(query).bind(...params).all();

    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();

    // Validate required fields
    if (!data.title || !data.description || !data.category || !data.client_name || !data.client_email) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await context.env.DB.prepare(
      `INSERT INTO jobs (title, description, category, budget_min, budget_max, budget_type,
       client_name, client_email, client_phone, location, duration, skills_required)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      data.title,
      data.description,
      data.category,
      data.budget_min || null,
      data.budget_max || null,
      data.budget_type || 'fixed',
      data.client_name,
      data.client_email,
      data.client_phone || null,
      data.location || 'Bermuda',
      data.duration || null,
      data.skills_required || null
    ).run();

    return new Response(JSON.stringify({
      success: true,
      id: result.meta.last_row_id
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
