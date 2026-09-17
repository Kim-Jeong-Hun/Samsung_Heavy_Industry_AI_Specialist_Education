import streamlit as st
import pandas as pd
import joblib
import matplotlib.pyplot as plt
import seaborn as sns


st.title("")
fig, ax = plt.subplots()
sns.scatterplot(x = [1,2,3], y = [2,5,3], ax = ax)
# ax.scatterplot(x = [1,2,3], y = [2,5,3])

st.pyplot(fig)



# ---------------------------------
# 1. 모델 및 전처리 객체 불러오기
# ---------------------------------
encoder = joblib.load("models/encoder.pkl")
scaler = joblib.load("models/scaler.pkl")
model = joblib.load("models/random_forest.pkl")


# ---------------------------------
# 2. Streamlit 화면 설정
# ---------------------------------
st.set_page_config(
    page_title="서울 자전거 대여량 예측",
    page_icon="🚲"
)

st.title("🚲 서울 자전거 대여량 예측")
st.write("기상 및 시간 정보를 입력하면 예상 자전거 대여량을 예측합니다.")


# ---------------------------------
# 3. 사용자 입력
# ---------------------------------
hour = st.slider(
    "시간",
    min_value=0,
    max_value=23,
    value=12
)

seasons = st.selectbox(
    "계절",
    ["Spring", "Summer", "Autumn", "Winter"]
)

day_off = st.selectbox(
    "휴일 여부",
    ["Yes", "No"]
)

temperature = st.number_input(
    "기온 (°C)",
    min_value=-30.0,
    max_value=40.0,
    value=20.0
)

humidity = st.number_input(
    "습도 (%)",
    min_value=0.0,
    max_value=100.0,
    value=50.0
)

wind_speed = st.number_input(
    "풍속 (m/s)",
    min_value=0.0,
    max_value=30.0,
    value=2.0
)

visibility = st.number_input(
    "가시거리 (10m)",
    min_value=0.0,
    max_value=3000.0,
    value=1500.0
)

solar_radiation = st.number_input(
    "일사량 (MJ/m²)",
    min_value=0.0,
    max_value=10.0,
    value=1.0
)

rainfall = st.number_input(
    "강수량 (mm)",
    min_value=0.0,
    max_value=100.0,
    value=0.0
)

snowfall = st.number_input(
    "적설량 (cm)",
    min_value=0.0,
    max_value=100.0,
    value=0.0
)


# ---------------------------------
# 4. 예측
# ---------------------------------
if st.button("🚲 자전거 대여량 예측"):

    # 범주형 데이터
    categorical_data = pd.DataFrame({
        "Hour": [hour],
        "Seasons": [seasons],
        "Day off": [day_off]
    })

    # One-Hot Encoding
    encoded = encoder.transform(categorical_data)

    encoded_df = pd.DataFrame(
        encoded,
        columns=encoder.get_feature_names_out()
    )

    # 수치형 데이터
    numerical_data = pd.DataFrame({
        "Temperature(C)": [temperature],
        "Humidity(%)": [humidity],
        "Wind speed (m/s)": [wind_speed],
        "Visibility (10m)": [visibility],
        "Solar Radiation (MJ/m2)": [solar_radiation],
        "Rainfall(mm)": [rainfall],
        "Snowfall (cm)": [snowfall]
    })

    # Standard Scaling
    scaled = scaler.transform(numerical_data)

    scaled_df = pd.DataFrame(
        scaled,
        columns=numerical_data.columns
    )

    # 최종 입력 데이터
    X_input = pd.concat(
        [scaled_df, encoded_df],
        axis=1
    )

    # 예측
    prediction = model.predict(X_input)[0]

    # 결과 출력
    st.success(
        f"예상 자전거 대여량: **{prediction:,.0f}대**"
    )
