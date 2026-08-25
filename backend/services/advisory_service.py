def generate_weather_advisory(current: dict):

    temperature = current.get(
        "temperature_2m", 0
    )

    humidity = current.get(
        "relative_humidity_2m", 0
    )

    rain = current.get(
        "rain", 0
    )

    precipitation = current.get(
        "precipitation", 0
    )

    wind = current.get(
        "wind_speed_10m", 0
    )


    advisories = []


    # ==========================================
    # IRRIGATION
    # ==========================================

    if rain > 0 or precipitation > 1:

        irrigation = {
            "status": "LOW",
            "message":
                "Rainfall is occurring. Delay irrigation to reduce water wastage."
        }

    elif temperature >= 35 and humidity < 50:

        irrigation = {
            "status": "HIGH",
            "message":
                "Hot and dry conditions detected. Crops may require more irrigation."
        }

    elif temperature >= 30 and humidity < 70:

        irrigation = {
            "status": "MODERATE-HIGH",
            "message":
                "Warm conditions may increase crop water demand. Check soil moisture."
        }

    else:

        irrigation = {
            "status": "MODERATE",
            "message":
                "Normal conditions. Check crop and soil condition before irrigation."
        }


    # ==========================================
    # SPRAYING
    # ==========================================

    if rain > 0 or precipitation > 1:

        spraying = {
            "status": "NOT RECOMMENDED",
            "message":
                "Rainfall is occurring. Avoid spraying because rain can wash away the application."
        }

    elif wind > 15:

        spraying = {
            "status": "NOT RECOMMENDED",
            "message":
                "High wind speed may cause spray drift. Wait for calmer conditions."
        }

    elif humidity > 90:

        spraying = {
            "status": "CAUTION",
            "message":
                "Very high humidity detected. Check crop disease conditions before spraying."
        }

    elif temperature > 35:

        spraying = {
            "status": "CAUTION",
            "message":
                "High temperature may reduce spraying effectiveness. Prefer cooler conditions."
        }

    else:

        spraying = {
            "status": "SUITABLE",
            "message":
                "Current weather conditions are generally suitable for spraying."
        }


    # ==========================================
    # DISEASE RISK
    # ==========================================

    if (
        humidity >= 90
        and 20 <= temperature <= 32
        and rain >= 0
    ):

        disease = {
            "risk": "HIGH",
            "message":
                "Very high humidity and suitable temperature may increase fungal disease risk. Monitor crops closely."
        }

    elif humidity >= 80 and 18 <= temperature <= 35:

        disease = {
            "risk": "MODERATE",
            "message":
                "Moderately favourable conditions for fungal disease. Inspect crops regularly."
        }

    else:

        disease = {
            "risk": "LOW",
            "message":
                "Current weather conditions indicate relatively low fungal disease risk."
        }


    # ==========================================
    # FIELD WORK
    # ==========================================

    if rain > 0:

        field_work = {
            "status": "AVOID",
            "message":
                "Rain is occurring. Avoid unnecessary field operations."
        }

    elif wind > 20:

        field_work = {
            "status": "CAUTION",
            "message":
                "Strong winds detected. Take care during field operations."
        }

    else:

        field_work = {
            "status": "GOOD",
            "message":
                "Current weather is generally suitable for field activities."
        }


    return {
        "irrigation": irrigation,
        "spraying": spraying,
        "disease": disease,
        "field_work": field_work
    }
