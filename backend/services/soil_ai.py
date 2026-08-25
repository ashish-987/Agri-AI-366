def calculate_soil_health(
    ph,
    nitrogen,
    phosphorus,
    potassium,
    organic_carbon,
    moisture
):
    score = 0
    recommendations = []

    # pH
    if 6.0 <= ph <= 7.5:
        score += 20
    elif 5.5 <= ph < 6.0 or 7.5 < ph <= 8.0:
        score += 14
        recommendations.append(
            "Monitor soil pH and consider suitable soil amendments."
        )
    else:
        score += 7
        recommendations.append(
            "Soil pH is outside the preferred range."
        )

    # Nitrogen
    if nitrogen >= 280:
        score += 20
    elif nitrogen >= 180:
        score += 14
        recommendations.append(
            "Nitrogen is moderate. Consider nitrogen-rich organic manure."
        )
    else:
        score += 8
        recommendations.append(
            "Nitrogen appears low. Consider a suitable nitrogen source."
        )

    # Phosphorus
    if phosphorus >= 30:
        score += 20
    elif phosphorus >= 15:
        score += 14
        recommendations.append(
            "Phosphorus is moderate."
        )
    else:
        score += 8
        recommendations.append(
            "Phosphorus appears low. Consider a suitable phosphorus source."
        )

    # Potassium
    if potassium >= 180:
        score += 20
    elif potassium >= 100:
        score += 14
        recommendations.append(
            "Potassium is moderate."
        )
    else:
        score += 8
        recommendations.append(
            "Potassium appears low. Consider a suitable potassium source."
        )

    # Organic carbon
    if organic_carbon >= 0.75:
        score += 10
    elif organic_carbon >= 0.50:
        score += 7
        recommendations.append(
            "Increase organic matter through compost or farmyard manure."
        )
    else:
        score += 4
        recommendations.append(
            "Organic carbon is low. Add compost or organic manure."
        )

    # Moisture
    if 30 <= moisture <= 70:
        score += 10
    elif 20 <= moisture < 30 or 70 < moisture <= 80:
        score += 7
        recommendations.append(
            "Monitor irrigation and soil moisture."
        )
    else:
        score += 4
        recommendations.append(
            "Soil moisture needs closer monitoring."
        )

    # Status
    if score >= 85:
        status = "Excellent"
    elif score >= 70:
        status = "Good"
    elif score >= 50:
        status = "Moderate"
    else:
        status = "Poor"

    return {
        "health_score": score,
        "health_status": status,
        "recommendations": recommendations
    }
