import 'server-only';
import { API_BASE } from '@/lib/constants'

export async function login({ email, password }: any): Promise<any> {
    try {
        console.log(`${API_BASE}/system/request-token`, JSON.stringify({ email, password }))

      return await fetch(`${API_BASE}/request-token`, {
        method: "POST",
        body: JSON.stringify({ username: email, password }),
      }).then((res) => {
        if (!res.ok) throw new Error("Could not validate login.");
        return res.json();
      })
      .then((res) => {
        return res
      })
      .catch((e) => {
        return { valid: false, message: e.message };
      });
    } catch (error) {
      console.error('Failed to get user from database');
      throw error;
    }
  }
  