import { WebsiteConfig } from '../../types/project';

export function exportProjectConfigToJson(config: WebsiteConfig): string {
  return JSON.stringify(config, null, 2);
}

export function downloadJsonFile(filename: string, jsonString: string): void {
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.json') ? filename : `${filename}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function validateAndParseConfigJson(rawJson: string): {
  valid: boolean;
  config?: WebsiteConfig;
  error?: string;
} {
  if (!rawJson || typeof rawJson !== 'string' || rawJson.trim() === '' || rawJson === 'undefined' || rawJson === 'null') {
    return { valid: false, error: 'Teks atau file JSON kosong atau tidak valid.' };
  }
  try {
    const parsed = JSON.parse(rawJson);
    if (!parsed || typeof parsed !== 'object') {
      return { valid: false, error: 'Format file JSON tidak valid (bukan objek).' };
    }
    if (!parsed.business || !parsed.business.name) {
      return { valid: false, error: 'Konfigurasi tidak memiliki informasi nama bisnis (business.name).' };
    }
    if (!Array.isArray(parsed.pages) || parsed.pages.length === 0) {
      return { valid: false, error: 'Konfigurasi harus memiliki minimal satu halaman (pages).' };
    }
    return { valid: true, config: parsed as WebsiteConfig };
  } catch (err: any) {
    return { valid: false, error: `Gagal membaca file JSON: ${err.message || String(err)}` };
  }
}
