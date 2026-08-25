def analyze_soil(
    ph: float,
    nitrogen: float,
    phosphorus: float,
    potassium: float,
    organic_carbon: float,
    moisture: float,
    crop: str = "Wheat"
):

    # ==========================================
    # pH ANALYSIS
    # ==========================================

    if ph < 5.5:
        ph_status = "ACIDIC"

    elif ph <= 7.5:
        ph_status = "OPTIMAL"

    elif ph <= 8.5:
        ph_status = "ALKALINE"

    else:
        ph_status = "HIGHLY ALKALINE"


    # ==========================================
    # NITROGEN
    # ==========================================

    if nitrogen < 200:
        nitrogen_status = "LOW"

    elif nitrogen <= 400:
        nitrogen_status = "OPTIMAL"

    else:
        nitrogen_status = "HIGH"


    # ==========================================
    # PHOSPHORUS
    # ==========================================

    if phosphorus < 15:
        phosphorus_status = "LOW"

    elif phosphorus <= 30:
        phosphorus_status = "OPTIMAL"

    else:
        phosphorus_status = "HIGH"


    # ==========================================
    # POTASSIUM
    # ==========================================

    if potassium < 120:
        potassium_status = "LOW"

    elif potassium <= 300:
        potassium_status = "OPTIMAL"

    else:
        potassium_status = "HIGH"


    # ==========================================
    # ORGANIC CARBON
    # ==========================================

    if organic_carbon < 0.5:
        carbon_status = "LOW"

    elif organic_carbon <= 1.0:
        carbon_status = "OPTIMAL"

    else:
        carbon_status = "HIGH"


    # ==========================================
    # MOISTURE
    # ==========================================

    if moisture < 30:
        moisture_status = "LOW"

    elif moisture <= 70:
        moisture_status = "OPTIMAL"

    else:
        moisture_status = "HIGH"


    # ==========================================
    # SCORE
    # ==========================================

    score = 0

    if ph_status == "OPTIMAL":
        score += 20

    elif ph_status in ["ACIDIC", "ALKALINE"]:
        score += 10


    if nitrogen_status == "OPTIMAL":
        score += 15

    elif nitrogen_status == "HIGH":
        score += 10


    if phosphorus_status == "OPTIMAL":
        score += 15

    elif phosphorus_status == "HIGH":
        score += 10


    if potassium_status == "OPTIMAL":
        score += 15

    elif potassium_status == "HIGH":
        score += 10


    if carbon_status == "OPTIMAL":
        score += 15

    elif carbon_status == "HIGH":
        score += 10


    if moisture_status == "OPTIMAL":
        score += 20

    elif moisture_status == "HIGH":
        score += 10


    # ==========================================
    # SOIL HEALTH
    # ==========================================

    if score >= 80:
        health = "EXCELLENT"

    elif score >= 60:
        health = "GOOD"

    elif score >= 40:
        health = "MODERATE"

    else:
        health = "POOR"


    # ==========================================
    # RECOMMENDATIONS
    # ==========================================

    recommendations = []


    if nitrogen_status == "LOW":

        recommendations.append(
            "Nitrogen is low. Consider a nitrogen fertilizer based on crop requirement and soil-test guidance."
        )


    if phosphorus_status == "LOW":

        recommendations.append(
            "Phosphorus is low. Consider phosphorus management according to crop requirement."
        )


    if potassium_status == "LOW":

        recommendations.append(
            "Potassium is low. Consider potassium fertilizer according to crop requirement."
        )


    if carbon_status == "LOW":

        recommendations.append(
            "Organic carbon is low. Consider compost, farmyard manure or other suitable organic matter."
        )


    if ph_status == "ACIDIC":

        recommendations.append(
            "Soil is acidic. Consider soil-test-based liming recommendations."
        )


    if ph_status in ["ALKALINE", "HIGHLY ALKALINE"]:

        recommendations.append(
            "Soil is alkaline. Improve organic matter and follow local soil-test recommendations."
        )


    if moisture_status == "LOW":

        recommendations.append(
            "Soil moisture is low. Consider irrigation based on crop stage and weather forecast."
        )


    if not recommendations:

        recommendations.append(
            "Soil parameters are generally within the selected target ranges. Maintain balanced nutrient management."
        )


    return {

        "crop": crop,

        "health_score": score,

        "health_status": health,

        "parameters": {

            "ph": {
                "value": ph,
                "status": ph_status
            },

            "nitrogen": {
                "value": nitrogen,
                "status": nitrogen_status
            },

            "phosphorus": {
                "value": phosphorus,
                "status": phosphorus_status
            },

            "potassium": {
                "value": potassium,
                "status": potassium_status
            },

            "organic_carbon": {
                "value": organic_carbon,
                "status": carbon_status
            },

            "moisture": {
                "value": moisture,
                "status": moisture_status
            }
        },

        "recommendations": recommendations
    }
