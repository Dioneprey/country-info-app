function convertYearToDate(year: number) {
  return `${year}-01-01`;
}

export function convertDataToChart(originalData: {
  year: number
  value: number
}[]) {
  
  return originalData.map(item => ({
    date: convertYearToDate(item.year),
    desktop: item.value
  }))
}