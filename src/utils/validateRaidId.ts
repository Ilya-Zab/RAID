export function validateRaidId(id: string)
{
    const regex = /^[A-Z]{2}\d{9} ?\| ?\d{9}$/;
    return regex.test(id.trim());
}