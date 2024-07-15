export function validateRaidId(id: string)
{
    const regex = /^[A-Z]{2}\d{4,9} ?\| ?\d{4,9}$/;
    return regex.test(id.trim());
}