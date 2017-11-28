
function parseDate(shippingData) {
    var month = shippingData.PickupDate.substring(4,6),
    day = shippingData.PickupDate.substring(6,8),
    year = shippingData.PickupDate.substring(0,4);
    return {
        "month": month,
        "day": day,
        "year": year
    }
}