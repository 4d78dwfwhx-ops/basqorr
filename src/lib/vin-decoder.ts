interface VinResult {
  brand: string
  region: string
  year: string | number | null
  valid: boolean
  message?: string
}

// Sample (expandable) WMI->Brand mapping
const WMI_MAP: Record<string, { brand: string; region: string }> = {
  'JT': { brand: 'تويوتا', region: 'Japan' },
  'KMH': { brand: 'هيونداي', region: 'Korea' },
  'WDB': { brand: 'مرسيدس', region: 'Germany' },
  'JTD': { brand: 'تويوتا', region: 'Japan' },
  '5YJ': { brand: 'تسلا', region: 'USA' },
  'SAL': { brand: 'لاندروفر', region: 'UK' },
  '1HG': { brand: 'هوندا', region: 'USA' },
  'WAU': { brand: 'اودي', region: 'Germany' },
  'WBA': { brand: 'بي إم دبليو', region: 'Germany' },
  '3FA': { brand: 'فورد', region: 'Mexico' },
  'KNA': { brand: 'كيا', region: 'Korea' },
  // ... add more for 60+ brands
}

const VIN_YEAR_MAP: Record<string, number> = {
  'A': 2010, 'B': 2011, 'C': 2012, 'D': 2013, 'E': 2014, 'F': 2015, 'G': 2016, 'H': 2017, 'J': 2018, 'K': 2019,
  'L': 2020, 'M': 2021, 'N': 2022, 'P': 2023, 'R': 2024, 'S': 2025, 'T': 2026, 'V': 2027, 'W': 1998,
  'X': 1999, 'Y': 2000, '1': 2001, '2': 2002, '3': 2003, '4': 2004, '5': 2005, '6': 2006, '7': 2007, '8': 2008, '9': 2009,
}

export function decodeVin(vin: string): VinResult {
  vin = vin.trim().toUpperCase();
  if (vin.length !== 17)
    return { brand: '', region: '', year: null, valid: false, message: 'رقم الهيكل يجب أن يكون 17 رمزًا' }
  const wmi = vin.slice(0, 3)
  const yearCode = vin[9]
  let brand = '', region = ''

  for (let prefix in WMI_MAP) {
    if (wmi.startsWith(prefix)) {
      brand = WMI_MAP[prefix].brand
      region = WMI_MAP[prefix].region
      break
    }
  }
  const year = VIN_YEAR_MAP[yearCode] || null
  const valid = !!brand && !!year
  return {
    brand,
    region,
    year,
    valid,
    message: valid ? '' : 'لم يتم التعرف على رقم الهيكل!',
  }
}
