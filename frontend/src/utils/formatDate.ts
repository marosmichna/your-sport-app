export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString("en-US",
    {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
}

export function formatBirthDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Měsíce jsou indexované od 0, takže přidáváme 1
    const year = date.getFullYear();
  
    return `${day}.${month}.${year}`;
  }