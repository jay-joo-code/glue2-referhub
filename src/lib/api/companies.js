export async function getCompanies() {
    const response = await fetch('/api/companies');
    const companies = await response.json();
    return companies;
  }