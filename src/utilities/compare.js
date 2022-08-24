export const CompareByCountryName=(first, second)=>{
    return first.localeCompare(second);
}

export const CompareByCutomerNameAsc=(first, second)=>{
    const fullNameFirst = `{${first.first_name} ${first.last_name}}`
    const fullNameSec = `{${second.first_name} ${second.last_name}}`
    return fullNameFirst.localeCompare(fullNameSec);
}

export const CompareByCutomerNameDesc=(first, second)=>{
    const fullNameFirst = `{${first.first_name} ${first.last_name}}`
    const fullNameSec = `{${second.first_name} ${second.last_name}}`
    return fullNameSec.localeCompare(fullNameFirst);
}

export const CompareByCutomerPurchasesAsc=(first, second)=>{
    const retval = parseFloat(first.total_purchases) - parseFloat(second.total_purchases);
    return retval;
}

export const CompareByCutomerPurchasesDesc=(first, second)=>{
    const retval = parseFloat(second.total_purchases) - parseFloat(first.total_purchases); 
    return retval;
}

export const CompareByAirlineName=(first, second)=>{
    const retval =first.name.localeCompare(second.name);
    return retval;
}

export const CompareByFligthId=(first, second)=>{
   const retval = second.id -first.id;
   return retval;
}