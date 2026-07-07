from src.data.data_loader import price, production


# --------------------------------------------------
# STATES
# --------------------------------------------------

def get_states():

    states = sorted(
        set(price["State"].dropna().unique())
        |
        set(production["State"].dropna().unique())
    )

    return states


# --------------------------------------------------
# DISTRICTS
# --------------------------------------------------

def get_districts(state):

    return sorted(

        production[
            production["State"] == state
        ]["District_Name"]

        .dropna()

        .unique()

    )


# --------------------------------------------------
# SEASONS
# --------------------------------------------------

def get_seasons(
    state,
    district
):

    return sorted(

        production[
            (production["State"] == state)
            &
            (production["District_Name"] == district)
        ]["Season"]

        .dropna()

        .unique()

    )


# --------------------------------------------------
# RECOMMENDATION CROPS
# --------------------------------------------------

def get_recommendation_crops(
    state,
    district,
    season
):

    return sorted(

        production[
            (production["State"] == state)
            &
            (production["District_Name"] == district)
            &
            (production["Season"] == season)
        ]["Crop"]

        .dropna()

        .unique()

    )


# --------------------------------------------------
# PRICE CROPS
# --------------------------------------------------

def get_price_crops(state):

    return sorted(

        price[
            price["State"] == state
        ]["Standard_Crop"]

        .dropna()

        .unique()

    )


# --------------------------------------------------
# COMPLETE METADATA
# --------------------------------------------------

def get_all_metadata():

    recommendation = {}

    for state in sorted(production["State"].dropna().unique()):

        recommendation[state] = {}

        districts = production[
            production["State"] == state
        ]["District_Name"].dropna().unique()

        for district in sorted(districts):

            recommendation[state][district] = {}

            seasons = production[
                (production["State"] == state)
                &
                (production["District_Name"] == district)
            ]["Season"].dropna().unique()

            for season in sorted(seasons):

                crops = sorted(

                    production[
                        (production["State"] == state)
                        &
                        (production["District_Name"] == district)
                        &
                        (production["Season"] == season)
                    ]["Crop"]

                    .dropna()

                    .unique()

                )

                recommendation[state][district][season] = crops


    price_metadata = {}

    for state in sorted(price["State"].dropna().unique()):

        price_metadata[state] = sorted(

            price[
                price["State"] == state
            ]["Standard_Crop"]

            .dropna()

            .unique()

        )


    return {

        "states": get_states(),

        "recommendation": recommendation,

        "price": price_metadata,

        "summary": {

            "states": production["State"].nunique(),

            "districts": production["District_Name"].nunique(),

            "recommendation_crops": production["Crop"].nunique(),

            "price_crops": price["Standard_Crop"].nunique(),

            "production_records": len(production),

            "price_records": len(price)

        }

    }