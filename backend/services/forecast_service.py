def calculate_forecast_advisory(daily: dict):

    dates = daily.get("time", [])

    max_temp = daily.get("temperature_2m_max", [])
    min_temp = daily.get("temperature_2m_min", [])

    rain_probability = daily.get(
        "precipitation_probability_max", []
    )

    rainfall = daily.get(
        "precipitation_sum", []
    )

    max_wind = daily.get(
        "wind_speed_10m_max", []
    )

    forecast = []

    for i, date in enumerate(dates):

        temperature = max_temp[i] if i < len(max_temp) else 0
        minimum_temperature = (
            min_temp[i]
            if i < len(min_temp)
            else 0
        )

        rain_chance = (
            rain_probability[i]
            if i < len(rain_probability)
            else 0
        )

        rain_amount = (
            rainfall[i]
            if i < len(rainfall)
            else 0
        )

        wind = (
            max_wind[i]
            if i < len(max_wind)
            else 0
        )

        # --------------------------------------
        # SPRAYING
        # --------------------------------------

        if rain_chance >= 60 or rain_amount > 2:

            spraying = "NOT RECOMMENDED"

        elif wind > 15:

            spraying = "NOT RECOMMENDED"

        elif temperature > 35:

            spraying = "CAUTION"

        else:

            spraying = "SUITABLE"

        # --------------------------------------
        # IRRIGATION
        # --------------------------------------

        if rain_chance >= 60 or rain_amount > 5:

            irrigation = "LOW"

        elif temperature >= 35 and rain_chance < 30:

            irrigation = "HIGH"

        elif temperature >= 30:

            irrigation = "MODERATE-HIGH"

        else:

            irrigation = "MODERATE"

        # --------------------------------------
        # FIELD WORK
        # --------------------------------------

        if rain_chance >= 70:

            field_work = "AVOID"

        elif wind > 20:

            field_work = "CAUTION"

        else:

            field_work = "GOOD"

        forecast.append({
            "date": date,
            "temperature_max": temperature,
            "temperature_min": minimum_temperature,
            "rain_probability": rain_chance,
            "rainfall_mm": rain_amount,
            "max_wind_kmh": wind,
            "spraying": spraying,
            "irrigation": irrigation,
            "field_work": field_work
        })

    return forecast
