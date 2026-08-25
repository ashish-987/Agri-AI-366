# backend/services/fertilizer_service.py


CROP_TARGETS = {
    "Wheat": {
        "nitrogen": 280,
        "phosphorus": 20,
        "potassium": 180
    },

    "Rice": {
        "nitrogen": 300,
        "phosphorus": 22,
        "potassium": 200
    },

    "Maize": {
        "nitrogen": 300,
        "phosphorus": 25,
        "potassium": 200
    },

    "Tomato": {
        "nitrogen": 250,
        "phosphorus": 30,
        "potassium": 250
    },

    "Potato": {
        "nitrogen": 250,
        "phosphorus": 25,
        "potassium": 220
    },

    "Soybean": {
        "nitrogen": 220,
        "phosphorus": 25,
        "potassium": 200
    }
}


def calculate_status(value, target):

    if value < target * 0.75:
        return "DEFICIENT"

    elif value < target:
        return "LOW"

    elif value <= target * 1.25:
        return "OPTIMAL"

    else:
        return "HIGH"


def generate_fertilizer_recommendation(
    crop,
    nitrogen,
    phosphorus,
    potassium
):

    crop_data = CROP_TARGETS.get(
        crop,
        CROP_TARGETS["Wheat"]
    )

    n_target = crop_data["nitrogen"]
    p_target = crop_data["phosphorus"]
    k_target = crop_data["potassium"]

    n_status = calculate_status(
        nitrogen,
        n_target
    )

    p_status = calculate_status(
        phosphorus,
        p_target
    )

    k_status = calculate_status(
        potassium,
        k_target
    )

    recommendations = []

    # Nitrogen
    if n_status == "DEFICIENT":

        recommendations.append({
            "nutrient": "Nitrogen",
            "status": "DEFICIENT",
            "action":
                "Nitrogen management is required. Use a soil-test-based nitrogen fertilizer plan."
        })

    elif n_status == "LOW":

        recommendations.append({
            "nutrient": "Nitrogen",
            "status": "LOW",
            "action":
                "Nitrogen is below the selected crop target. Consider nitrogen management."
        })

    elif n_status == "HIGH":

        recommendations.append({
            "nutrient": "Nitrogen",
            "status": "HIGH",
            "action":
                "Avoid unnecessary nitrogen application. Excess nitrogen can increase losses and crop problems."
        })

    else:

        recommendations.append({
            "nutrient": "Nitrogen",
            "status": "OPTIMAL",
            "action":
                "Nitrogen is within the selected target range."
        })

    # Phosphorus
    if p_status == "DEFICIENT":

        recommendations.append({
            "nutrient": "Phosphorus",
            "status": "DEFICIENT",
            "action":
                "Phosphorus is low. Follow soil-test-based phosphorus management."
        })

    elif p_status == "LOW":

        recommendations.append({
            "nutrient": "Phosphorus",
            "status": "LOW",
            "action":
                "Phosphorus is below the selected crop target."
        })

    elif p_status == "HIGH":

        recommendations.append({
            "nutrient": "Phosphorus",
            "status": "HIGH",
            "action":
                "Avoid unnecessary phosphorus application."
        })

    else:

        recommendations.append({
            "nutrient": "Phosphorus",
            "status": "OPTIMAL",
            "action":
                "Phosphorus is within the selected target range."
        })

    # Potassium
    if k_status == "DEFICIENT":

        recommendations.append({
            "nutrient": "Potassium",
            "status": "DEFICIENT",
            "action":
                "Potassium is low. Follow soil-test-based potassium management."
        })

    elif k_status == "LOW":

        recommendations.append({
            "nutrient": "Potassium",
            "status": "LOW",
            "action":
                "Potassium is below the selected crop target."
        })

    elif k_status == "HIGH":

        recommendations.append({
            "nutrient": "Potassium",
            "status": "HIGH",
            "action":
                "Avoid unnecessary potassium application."
        })

    else:

        recommendations.append({
            "nutrient": "Potassium",
            "status": "OPTIMAL",
            "action":
                "Potassium is within the selected target range."
        })

    deficient_count = sum([
        n_status == "DEFICIENT",
        p_status == "DEFICIENT",
        k_status == "DEFICIENT"
    ])

    if deficient_count >= 2:
        priority = "HIGH"

    elif deficient_count == 1:
        priority = "MODERATE"

    else:
        priority = "LOW"

    return {
        "crop": crop,

        "priority": priority,

        "target_values": {
            "nitrogen": n_target,
            "phosphorus": p_target,
            "potassium": k_target
        },

        "current_values": {
            "nitrogen": nitrogen,
            "phosphorus": phosphorus,
            "potassium": potassium
        },

        "status": {
            "nitrogen": n_status,
            "phosphorus": p_status,
            "potassium": k_status
        },

        "recommendations": recommendations,

        "disclaimer":
            "Recommendations are decision-support estimates. Confirm fertilizer rates with a laboratory soil test, crop stage, local agronomic guidance and applicable agricultural recommendations."
    }
