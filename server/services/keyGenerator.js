import axios from 'axios';

const API_BASE_URL = 'https://api.undetect.xyz';
const API_KEY = process.env.UNDETECT_API_KEY;

export async function createKeys({
  period,
  quantity,
  productName,
  purpose,
  region,
  comment
}) {
  try {
    const params = new URLSearchParams({
      p: period,
      n: quantity.toString(),
      pn: productName,
      pp: purpose
    });

    if (region) params.append('r', region);
    if (comment) params.append('c', comment);

    const response = await axios.post(`${API_BASE_URL}/keys/create?${params.toString()}`, null, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'text/plain'
      }
    });

    if (response.status === 200 && response.data) {
      return response.data.split('\n').filter(Boolean);
    }

    throw new Error(`Invalid response: ${response.status}`);
  } catch (error) {
    console.error('Key generation error:', error);
    throw error;
  }
}