import pandas as pd
import os
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib

folder_path = 'SeoulBike'

filelist = os.listdir(folder_path)
dfs = []
for file in filelist:
    if file.endswith(".csv"):
        filepath = os.path.join(folder_path, file)
        dfs.append(pd.read_csv(filepath))

bike = pd.concat(dfs, ignore_index=True)

bike['Date'] = pd.to_datetime(bike['Date'])

bike['Week'] = bike['Date'].dt.day_name()

def check_day(row):
    if row['Week'] in ['Saturday', 'Sunday'] or row['Holiday'] == 'Holiday':
        return 'Yes'
    else:
        return 'No'

bike['Day off'] = bike.apply(check_day, axis = 1)

bike = bike[bike['Rented Bike Count'] > 0]

X = bike.drop(['Date', 'Dew point temperature(C)', 'Functioning Day', 
              'Holiday', 'Week', 'Rented Bike Count'], axis = 1)
y = bike['Rented Bike Count']

oh_enc = OneHotEncoder(sparse_output = False)
oh_res = oh_enc.fit_transform(X[['Hour', 'Seasons', 'Day off']])
oh_X = pd.DataFrame(oh_res, columns= oh_enc.get_feature_names_out() )

st_scaler = StandardScaler()
num_col = ['Temperature(C)', 'Humidity(%)', 'Wind speed (m/s)',
            'Visibility (10m)', 'Solar Radiation (MJ/m2)', 'Rainfall(mm)',
            'Snowfall (cm)']
sc_res = st_scaler.fit_transform(X[num_col])
sc_X = pd.DataFrame(sc_res, columns = num_col)

X_scaled = pd.concat([sc_X, oh_X], axis = 1)


rf_reg = RandomForestRegressor(n_estimators=200)
# train_split_test()가 없음
# -> 데이터 전체 학습
rf_reg.fit(X_scaled, y)

path = './models'
if not os.path.exists(path):
    os.makedirs(path)

joblib.dump( oh_enc, "models/encoder.pkl")
joblib.dump( st_scaler, "models/scaler.pkl")
joblib.dump( rf_reg, "models/random_forest.pkl")