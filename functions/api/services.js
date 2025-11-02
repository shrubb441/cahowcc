// API endpoint for services

export async function onRequestGet(context) {
  try {
    const { searchParams } = new URL(context.request.url);
    const category = searchParams.get('category');
    const availability = searchParams.get('availability') || 'available';

    let query = 'SELECT * FROM services WHERE 1=1';
    let params = [];

    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (availability !== 'all') {
      query += ' AND availability = ?';
      params.push(availability);
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
    if (!data.title || !data.description || !data.category || !data.provider_name || !data.provider_email) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await context.env.DB.prepare(
      `INSERT INTO services (title, description, category, price_min, price_max, price_type,
       provider_name, provider_email, provider_phone, company_name, website, skills,
       portfolio_links, years_experience, availability)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      data.title,
      data.description,
      data.category,
      data.price_min || null,
      data.price_max || null,
      data.price_type || 'project',
      data.provider_name,
      data.provider_email,
      data.provider_phone || null,
      data.company_name || null,
      data.website || null,
      data.skills || null,
      data.portfolio_links || null,
      data.years_experience || null,
      data.availability || 'available'
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
